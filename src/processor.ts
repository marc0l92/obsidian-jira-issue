import { MarkdownPostProcessorContext } from "obsidian"
import { JiraClient } from "./jiraClient"
import { ObjectsCache } from "./objectsCache"
import { IJiraIssueSettings } from "./settings"

const ISSUE_REGEX = /[A-Z]+-[0-9]+/

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
        // console.log({ source, el, ctx })
        // console.log(this._settings)
        const renderedItems: Record<string, string> = {}
        for (const line of source.split('\n')) {
            const matches = line.match(ISSUE_REGEX)
            if (matches) {
                const issueKey = matches[0]
                console.log(`Issue found: ${issueKey}`)
                let issue = this._cache.get(issueKey)
                if (!issue) {
                    console.log(`Issue not available in the cache`)
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

    private updateRenderedIssues(el: HTMLElement, renderedItems: Record<string, string>) {
        if (!Object.isEmpty(renderedItems)) {
            el.innerHTML = this.renderContainer(Object.values(renderedItems).join('\n'))
        } else {
            el.innerHTML = this.renderContainer(this.renderNoItems())
        }
    }

    private issueUrl(issueKey: string): string {
        return (new URL(`${this._settings.host}/browse/${issueKey}`)).toString()
    }

    private renderContainer(body: string): string {
        return `<div class="jira-issue-container">${body}</div>`
    }

    private renderLoadingItem(item: string, itemUrl: string): string {
        return `
            <div class="tags has-addons">
                <span class="tag is-light"><span class="spinner"></span></span>
                <a class="tag is-link is-light" href="${itemUrl}">${item}</a>
                <span class="tag is-light">Loading ...</span>
            </div>
        `
    }

    private renderNoItems(): string {
        return `
            <div class="tags has-addons">
                <span class="tag is-light">No valid issues found</span>
            </div>
        `
    }

    private renderIssue(issue: any) {
        return `
            <div class="tags has-addons">
                <span class="tag is-light">
                    <img src="${issue.fields.issuetype.iconUrl}" alt="${issue.fields.issuetype.name}" />
                </span>
                <a class="tag is-link is-light" href="${this.issueUrl(issue.key)}">${issue.key}</a>
                <span class="tag is-light">${issue.fields.summary}</span>
                <span class="tag is-info">${issue.fields.status.name}</span>
            </div>
        `
    }

    private renderIssueError(issueKey: string, message: string) {
        return `
            <div class="tags has-addons">
                <span class="tag is-delete is-danger"></span>
                <a class="tag is-danger is-light" href="${this.issueUrl(issueKey)}">${issueKey}</a>
                <span class="tag is-danger">${message}</span>
            </div>
        `
    }
}