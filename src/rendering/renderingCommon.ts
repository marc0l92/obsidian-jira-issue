import { App, TFile } from "obsidian"
import { IJiraIssue } from "src/client/jiraInterfaces"
import { SearchView } from "src/searchView"
import { IJiraIssueSettings } from "src/settings"

export const JIRA_STATUS_COLOR_MAP: Record<string, string> = {
    'blue-gray': 'is-info',
    'yellow': 'is-warning',
    'green': 'is-success',
    'red': 'is-danger',
    'medium-gray': 'is-dark',
}

export class RenderingCommon {
    private _settings: IJiraIssueSettings
    private _app: App

    constructor(settings: IJiraIssueSettings, app: App) {
        this._settings = settings
        this._app = app
    }

    public issueUrl(issueKey: string): string {
        return (new URL(`${this._settings.host}/browse/${issueKey}`)).toString()
    }

    public searchUrl(searchQuery: string): string {
        return (new URL(`${this._settings.host}/issues??filter=-4&jql${searchQuery}`)).toString()
    }

    public getTheme(): string {
        return this._settings.darkMode ? 'is-dark' : 'is-light'
    }

    public getNotes(): TFile[] {
        return this._app.vault.getMarkdownFiles()
    }

    public getFrontMatter(file: TFile): any {
        return this._app.metadataCache.getFileCache(file).frontmatter
    }

    public renderContainer(children: HTMLElement[]): HTMLElement {
        const container = createDiv({ cls: 'jira-issue-container' })
        for (const child of children) {
            container.appendChild(child)
        }
        return container
    }

    public renderLoadingItem(item: string, itemUrl: string, inline: boolean = false): HTMLElement {
        let tagsRow
        if (inline) {
            tagsRow = createSpan('ji-tags has-addons')
        } else {
            tagsRow = createDiv('ji-tags has-addons')
        }
        createSpan({ cls: 'spinner', parent: createSpan({ cls: `ji-tag ${this.getTheme()}`, parent: tagsRow }) })
        createEl('a', { cls: `ji-tag is-link ${this.getTheme()}`, href: itemUrl, text: item, parent: tagsRow })
        createSpan({ cls: `ji-tag ${this.getTheme()}`, text: 'Loading ...', parent: tagsRow })
        return tagsRow
    }

    public renderSearchError(el: HTMLElement, message: string, searchView: SearchView): void {
        const tagsRow = createDiv('ji-tags has-addons')
        createSpan({ cls: 'ji-tag is-delete is-danger', parent: tagsRow })
        if (searchView) {
            createEl('a', { cls: `ji-tag is-danger ${this.getTheme()}`, href: this.searchUrl(searchView.query), text: "Search error", parent: tagsRow })
        } else {
            createSpan({ cls: `ji-tag is-danger ${this.getTheme()}`, text: "Search error", parent: tagsRow })
        }
        createSpan({ cls: 'ji-tag is-danger', text: message, parent: tagsRow })
        el.replaceChildren(this.renderContainer([tagsRow]))
    }

    public renderIssue(issue: IJiraIssue, compact: boolean = false): HTMLElement {
        const tagsRow = createDiv('ji-tags has-addons')
        createEl('img', {
            cls: 'fit-content',
            attr: { src: issue.fields.issuetype.iconUrl, alt: issue.fields.issuetype.name },
            title: issue.fields.issuetype.name,
            parent: createSpan({ cls: `ji-tag ${this.getTheme()}`, parent: tagsRow })
        })
        createEl('a', { cls: `ji-tag is-link ${this.getTheme()} no-wrap`, href: this.issueUrl(issue.key), text: issue.key, parent: tagsRow })
        if (!compact) {
            createSpan({ cls: `ji-tag ${this.getTheme()} issue-summary`, text: issue.fields.summary, parent: tagsRow })
        }
        const statusColor = JIRA_STATUS_COLOR_MAP[issue.fields.status.statusCategory.colorName] || 'is-light'
        createSpan({ cls: `ji-tag no-wrap ${statusColor}`, text: issue.fields.status.name, title: issue.fields.status.description, parent: tagsRow })
        return tagsRow
    }

    public renderIssueError(issueKey: string, message: string): HTMLElement {
        const tagsRow = createDiv('ji-tags has-addons')
        createSpan({ cls: 'ji-tag is-delete is-danger', parent: tagsRow })
        createEl('a', { cls: 'ji-tag is-danger is-light', href: this.issueUrl(issueKey), text: issueKey, parent: tagsRow })
        createSpan({ cls: 'ji-tag is-danger', text: message, parent: tagsRow })
        return tagsRow
    }
}