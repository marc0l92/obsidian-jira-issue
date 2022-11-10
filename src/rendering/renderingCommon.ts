import { App, FrontMatterCache, TFile } from "obsidian"
import { IJiraIssue, IJiraIssueAccountSettings } from "src/client/jiraInterfaces"
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

    public issueUrl(account: IJiraIssueAccountSettings, issueKey: string): string {
        try {
            return (new URL(`${account.host}/browse/${issueKey}`)).toString()
        } catch (e) { return '' }
    }

    public searchUrl(account: IJiraIssueAccountSettings, searchQuery: string): string {
        try {
            return (new URL(`${account.host}/issues?filter=-4&jql=${searchQuery}`)).toString()
        } catch (e) { return '' }
    }

    public getTheme(): string {
        return this._settings.darkMode ? 'is-dark' : 'is-light'
    }

    public getNotes(): TFile[] {
        return this._app.vault.getMarkdownFiles()
    }

    public getFrontMatter(file: TFile): FrontMatterCache {
        return this._app.metadataCache.getFileCache(file).frontmatter
    }

    public renderContainer(children: HTMLElement[]): HTMLElement {
        const container = createDiv({ cls: 'jira-issue-container' })
        for (const child of children) {
            container.appendChild(child)
        }
        return container
    }

    public renderLoadingItem(item: string, inline = false): HTMLElement {
        let tagsRow
        if (inline) {
            tagsRow = createSpan({ cls: 'ji-row' })
        } else {
            tagsRow = createDiv({ cls: 'ji-row' })
        }
        createSpan({ cls: 'spinner', parent: createSpan({ cls: `ji-tag ${this.getTheme()}`, parent: tagsRow }) })
        createEl('a', { cls: `ji-tag is-link ${this.getTheme()}`, text: item, parent: tagsRow })
        createSpan({ cls: `ji-tag ${this.getTheme()}`, text: 'Loading ...', parent: tagsRow })
        return tagsRow
    }

    public renderSearchError(el: HTMLElement, message: string, searchView: SearchView): void {
        const tagsRow = createDiv('ji-row')
        createSpan({ cls: 'ji-tag is-delete is-danger', parent: tagsRow })
        if (searchView) {
            createSpan({ cls: `ji-tag is-danger ${this.getTheme()}`, text: "Search error", parent: tagsRow })
        } else {
            createSpan({ cls: `ji-tag is-danger ${this.getTheme()}`, text: "Search error", parent: tagsRow })
        }
        createSpan({ cls: 'ji-tag is-danger', text: message, parent: tagsRow })
        el.replaceChildren(this.renderContainer([tagsRow]))
    }

    public renderIssue(issue: IJiraIssue, compact = false): HTMLElement {
        const tagsRow = createDiv('ji-row')
        const issueTitle = createSpan({ cls: 'ji-tags-group', parent: tagsRow })
        this.renderAccountColorBand(issue.account, issueTitle)
        createEl('img', {
            cls: 'fit-content',
            attr: { src: issue.fields.issuetype.iconUrl, alt: issue.fields.issuetype.name },
            title: issue.fields.issuetype.name,
            parent: createSpan({ cls: `ji-tag ${this.getTheme()} ji-sm-tag`, parent: issueTitle })
        })
        createEl('a', { cls: `ji-tag is-link ${this.getTheme()}`, href: this.issueUrl(issue.account, issue.key), title: this.issueUrl(issue.account, issue.key), text: issue.key, parent: issueTitle })
        if (!compact) {
            createSpan({ cls: `ji-tag ${this.getTheme()}`, text: issue.fields.summary, parent: tagsRow })
        }
        const statusColor = JIRA_STATUS_COLOR_MAP[issue.fields.status.statusCategory.colorName] || 'is-light'
        createSpan({ cls: `ji-tag ${statusColor}`, text: issue.fields.status.name, title: issue.fields.status.description, parent: tagsRow })
        return tagsRow
    }

    public renderIssueError(issueKey: string, message: string): HTMLElement {
        const tagsRow = createDiv('ji-row')
        createSpan({ cls: 'ji-tag is-delete is-danger', parent: tagsRow })
        createSpan({ cls: 'ji-tag is-danger is-light', text: issueKey, parent: tagsRow })
        createSpan({ cls: 'ji-tag is-danger', text: message, parent: tagsRow })
        return tagsRow
    }

    public renderAccountColorBand(account: IJiraIssueAccountSettings, parent: HTMLElement) {
        if (this._settings.showColorBand) {
            createSpan({ cls: `ji-tag ${this.getTheme()} ji-band`, attr: { style: `background-color: ${account.color}` }, title: account.alias, parent: parent })
        }
    }
}