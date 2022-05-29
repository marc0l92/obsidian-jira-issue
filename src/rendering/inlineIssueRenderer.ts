import { MarkdownPostProcessorContext } from "obsidian"
import { JiraClient } from "src/client/jiraClient"
import { IJiraIssue } from "src/client/jiraInterfaces"
import { ObjectsCache } from "src/objectsCache"
import { COMPACT_SYMBOL, IJiraIssueSettings } from "../settings"
import { RenderingCommon } from "./renderingCommon"



export class InlineIssueRenderer {
    private _rc: RenderingCommon
    private _settings: IJiraIssueSettings
    private _client: JiraClient
    private _cache: ObjectsCache

    constructor(renderingCommon: RenderingCommon, settings: IJiraIssueSettings, client: JiraClient, cache: ObjectsCache) {
        this._rc = renderingCommon
        this._settings = settings
        this._client = client
        this._cache = cache
    }

    async render(el: HTMLElement, ctx: MarkdownPostProcessorContext) {
        console.log({ el })
        this.convertInlineIssuesToTags(el)
        this.convertInlineIssuesUrlToTags(el)

        const inlineIssueTags: NodeListOf<HTMLSpanElement> = el.querySelectorAll(`span.ji-inline-issue`)
        inlineIssueTags.forEach((value: HTMLSpanElement) => {
            const issueKey = value.getAttribute('data-issue-key')
            const compact = value.getAttribute('data-compact') === 'true'
            let issue: IJiraIssue = this._cache.get(issueKey)
            if (!issue) {
                this._client.getIssue(issueKey).then(newIssue => {
                    issue = this._cache.add(issueKey, newIssue)
                    value.replaceChildren(this._rc.renderIssue(issue, compact))
                }).catch(err => {
                    value.replaceChildren(this._rc.renderIssueError(issueKey, err))
                })
            } else {
                value.replaceChildren(this._rc.renderIssue(issue, compact))
            }
        })
    }

    private convertInlineIssuesToTags(el: HTMLElement): void {
        if (this._settings.inlineIssuePrefix) {
            let match
            while (match = new RegExp(`${this._settings.inlineIssuePrefix}(${COMPACT_SYMBOL}?)([A-Z0-9]+-[0-9]+)`).exec(el.innerHTML)) {
                console.log({ match })
                const compact = !!match[1]
                const issueKey = match[2]
                const container = createSpan({ cls: 'ji-inline-issue jira-issue-container', attr: { 'data-issue-key': issueKey, 'data-compact': compact } })
                container.appendChild(this._rc.renderLoadingItem(issueKey, this._rc.issueUrl(issueKey), true))
                el.innerHTML = el.innerHTML.replace(match[0], container.outerHTML)
            }
        }
    }

    private convertInlineIssuesUrlToTags(el: HTMLElement): void {
        if (this._settings.inlineIssueUrlToTag) {
            const issueUrlElements: NodeListOf<HTMLAnchorElement> = el.querySelectorAll(`a.external-link[href^="${this._settings.host}/browse/"]`)
            issueUrlElements.forEach((value: HTMLAnchorElement) => {
                const issueKey = value.href.replace(`${this._settings.host}/browse/`, '')
                const container = createSpan({ cls: 'ji-inline-issue jira-issue-container', attr: { 'data-issue-key': issueKey, 'data-compact': false } })
                container.appendChild(this._rc.renderLoadingItem(issueKey, value.href, true))
                value.replaceWith(container)
            })
        }
    }
}