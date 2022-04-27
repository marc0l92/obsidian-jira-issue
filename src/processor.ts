import { MarkdownPostProcessorContext } from "obsidian"
import { createProxy, IJiraIssue, IJiraSearchResults } from "./interfaces"
import { JiraClient } from "./jiraClient"
import { ObjectsCache } from "./objectsCache"
import { ESearchResultsRenderingTypes, IJiraIssueSettings } from "./settings"

const COMMENT_REGEX = /^\s*#/
const ISSUE_REGEX = /^\s*([A-Z0-9]+-[0-9]+)\s*$/i
const ISSUE_LINK_REGEX = /\/([A-Z0-9]+-[0-9]+)\s*$/i
const JIRA_STATUS_COLOR_MAP: Record<string, string> = {
    'blue-gray': 'is-info',
    'yellow': 'is-warning',
    'green': 'is-success',
    'red': 'is-danger',
    'medium-gray': 'is-dark',
}

function dateToStr(fullDate: string): string {
    if (fullDate) {
        const d = new Date(fullDate)
        return d.toLocaleDateString()
    }
    return fullDate
}

export class JiraIssueProcessor {
    private _settings: IJiraIssueSettings
    private _client: JiraClient
    private _cache: ObjectsCache

    constructor(settings: IJiraIssueSettings, client: JiraClient, cache: ObjectsCache) {
        this._settings = settings
        this._client = client
        this._cache = cache
    }

    async issueFence(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        const renderedItems: Record<string, HTMLElement> = {}
        for (const line of source.split('\n')) {
            const issueKey = this.getIssueKey(line)
            if (issueKey) {
                // console.log(`Issue found: ${issueKey}`)
                let issue = this._cache.get(issueKey)
                if (!issue) {
                    // console.log(`Issue not available in the cache`)
                    renderedItems[issueKey] = this.renderLoadingItem(issueKey, this.issueUrl(issueKey))
                    this._client.getIssue(issueKey).then(newIssue => {
                        issue = this._cache.add(issueKey, newIssue)
                        renderedItems[issueKey] = this.renderIssue(issue)
                        this.updateRenderedIssues(el, renderedItems)
                    }).catch(err => {
                        renderedItems[issueKey] = this.renderIssueError(issueKey, err)
                        this.updateRenderedIssues(el, renderedItems)
                    })
                } else {
                    renderedItems[issueKey] = this.renderIssue(issue)
                }
            }
        }
        this.updateRenderedIssues(el, renderedItems)
    }

    async searchFence(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        // console.log(`Search query: ${source}`)
        let searchResults = this._cache.get(source)
        if (!searchResults) {
            // console.log(`Search results not available in the cache`)
            this.renderLoadingItem('View in browser', this.searchUrl(source))
            this._client.getSearchResults(source, this._settings.searchResultsLimit).then(newSearchResults => {
                searchResults = this._cache.add(source, newSearchResults)
                this.renderSearchResults(el, searchResults)
            }).catch(err => {
                this.renderSearchError(el, source, err)
            })
        } else {
            this.renderSearchResults(el, searchResults)
        }
    }

    async issueInline(el: HTMLElement, ctx: MarkdownPostProcessorContext) {
        console.log({ el, ctx })
    }

    private getIssueKey(line: string): string | null {
        if (COMMENT_REGEX.test(line)) {
            return null
        }
        const matches = line.match(ISSUE_REGEX)
        if (matches) {
            return matches[1]
        }
        const matchesLink = line.match(ISSUE_LINK_REGEX)
        if (matchesLink) {
            return matchesLink[1]
        }
        return null
    }

    private updateRenderedIssues(el: HTMLElement, renderedItems: Record<string, HTMLElement>): void {
        if (!Object.isEmpty(renderedItems)) {
            el.replaceChildren(this.renderContainer(Object.values(renderedItems)))
        } else {
            el.replaceChildren(this.renderContainer([this.renderNoItems()]))
        }
    }

    private renderSearchResults(el: HTMLElement, searchResults: IJiraSearchResults): void {
        if (this._settings.searchResultsRenderingType === ESearchResultsRenderingTypes.LIST) {
            this.renderSearchResultsList(el, searchResults)
        } else {
            this.renderSearchResultsTable(el, searchResults)
        }
    }

    private issueUrl(issueKey: string): string {
        return (new URL(`${this._settings.host}/browse/${issueKey}`)).toString()
    }

    private searchUrl(searchQuery: string): string {
        // TODO: find real url for search
        return (new URL(`${this._settings.host}/issues?jql${searchQuery}`)).toString()
    }

    private getTheme(): string {
        return this._settings.darkMode ? 'is-dark' : 'is-light'
    }

    private renderContainer(children: HTMLElement[]): HTMLElement {
        const container = createDiv({ cls: 'jira-issue-container' })
        for (const child of children) {
            container.appendChild(child)
        }
        return container
    }

    private renderLoadingItem(item: string, itemUrl: string): HTMLElement {
        const tagsRow = createDiv('ji-tags has-addons')
        createSpan({ cls: 'spinner', parent: createSpan({ cls: `ji-tag ${this.getTheme()}`, parent: tagsRow }) })
        createEl('a', { cls: `ji-tag is-link ${this.getTheme()}`, href: itemUrl, text: item, parent: tagsRow })
        createSpan({ cls: `ji-tag ${this.getTheme()}`, text: 'Loading ...', parent: tagsRow })
        return tagsRow
    }

    private renderNoItems(): HTMLElement {
        const tagsRow = createDiv('ji-tags has-addons')
        createSpan({ cls: 'ji-tag is-danger is-light', text: 'JiraIssue', parent: tagsRow })
        createSpan({ cls: 'ji-tag is-danger', text: 'No valid issues found', parent: tagsRow })
        return tagsRow
    }

    private renderIssue(issue: IJiraIssue): HTMLElement {
        const tagsRow = createDiv('ji-tags has-addons')
        createEl('img', {
            cls: 'fit-content',
            attr: { src: issue.fields.issuetype.iconUrl, alt: issue.fields.issuetype.name },
            title: issue.fields.issuetype.name,
            parent: createSpan({ cls: `ji-tag ${this.getTheme()}`, parent: tagsRow })
        })
        createEl('a', { cls: `ji-tag is-link ${this.getTheme()} no-wrap`, href: this.issueUrl(issue.key), text: issue.key, parent: tagsRow })
        createSpan({ cls: `ji-tag ${this.getTheme()} issue-summary`, text: issue.fields.summary, parent: tagsRow })
        const statusColor = JIRA_STATUS_COLOR_MAP[issue.fields.status.statusCategory.colorName] || 'is-light'
        createSpan({ cls: `ji-tag no-wrap ${statusColor}`, text: issue.fields.status.name, title: issue.fields.status.description, parent: tagsRow })
        return tagsRow
    }

    private renderIssueError(issueKey: string, message: string): HTMLElement {
        const tagsRow = createDiv('ji-tags has-addons')
        createSpan({ cls: 'ji-tag is-delete is-danger', parent: tagsRow })
        createEl('a', { cls: 'ji-tag is-danger is-light', href: this.issueUrl(issueKey), text: issueKey, parent: tagsRow })
        createSpan({ cls: 'ji-tag is-danger', text: message, parent: tagsRow })
        return tagsRow
    }

    private renderSearchResultsTable(el: HTMLElement, searchResults: IJiraSearchResults): void {
        const table = createEl('table', { cls: 'table is-bordered is-striped is-narrow is-hoverable is-fullwidth' })
        const header = createEl('tr', { parent: createEl('thead', { parent: table }) })
        createEl('th', { text: 'Key', parent: header })
        createEl('th', { text: 'Summary', parent: header })
        createEl('abbr', { text: 'T', title: 'Type', parent: createEl('th', { parent: header }) })
        createEl('th', { text: 'Created', parent: header })
        createEl('th', { text: 'Updated', parent: header })
        createEl('th', { text: 'Reporter', parent: header })
        createEl('th', { text: 'Assignee', parent: header })
        createEl('abbr', { text: 'P', title: 'Priority', parent: createEl('th', { parent: header }) })
        createEl('th', { text: 'Status', parent: header })
        // createEl('th', { text: 'Due Date', parent: header })
        const tbody = createEl('tbody', { parent: table })
        for (let issue of searchResults.issues) {
            issue = createProxy(issue)
            const row = createEl('tr', { parent: tbody })
            createEl('a', { cls: 'no-wrap', href: this.issueUrl(issue.key), text: issue.key, parent: createEl('td', { parent: row }) })
            createEl('td', { text: issue.fields.summary, parent: row })
            createEl('img', {
                attr: { src: issue.fields.issuetype.iconUrl, alt: issue.fields.issuetype.name },
                title: issue.fields.issuetype.name,
                parent: createEl('td', { parent: row })
            })
            createEl('td', { text: dateToStr(issue.fields.created), parent: row })
            createEl('td', { text: dateToStr(issue.fields.updated), parent: row })
            createEl('td', { text: issue.fields.reporter.displayName, parent: row })
            createEl('td', { text: issue.fields.assignee.displayName, parent: row })
            createEl('img', {
                attr: { src: issue.fields.priority.iconUrl, alt: issue.fields.priority.name },
                title: issue.fields.priority.name,
                parent: createEl('td', { parent: row })
            })
            const statusColor = JIRA_STATUS_COLOR_MAP[issue.fields.status.statusCategory.colorName] || 'is-light'
            createSpan({ cls: `ji-tag no-wrap ${statusColor}`, text: issue.fields.status.name, title: issue.fields.status.description, parent: createEl('td', { parent: row }) })
            // createEl('td', { text: dateToStr(issue.fields.duedate), parent: row })
        }
        const statistics = createSpan({ cls: 'statistics', text: `Total results: ${searchResults.total.toString()}` })
        el.replaceChildren(this.renderContainer([table, statistics]))
    }

    private renderSearchResultsList(el: HTMLElement, searchResults: IJiraSearchResults): void {
        const list: HTMLElement[] = []
        for (const issue of searchResults.issues) {
            list.push(this.renderIssue(issue))
        }
        el.replaceChildren(this.renderContainer(list))
    }

    private renderSearchError(el: HTMLElement, searchQuery: string, message: string): void {
        const tagsRow = createDiv('ji-tags has-addons')
        createSpan({ cls: 'ji-tag is-delete is-danger', parent: tagsRow })
        createEl('a', { cls: `ji-tag is-danger ${this.getTheme()}`, href: this.searchUrl(searchQuery), text: "Search error", parent: tagsRow })
        createSpan({ cls: 'ji-tag is-danger', text: message, parent: tagsRow })
        el.replaceChildren(this.renderContainer([tagsRow]))
    }
}