import { MarkdownPostProcessorContext } from "obsidian"
import { JiraClient } from "src/client/jiraClient"
import { IJiraIssue } from "src/client/jiraInterfaces"
import { ObjectsCache } from "src/objectsCache"
import { COMPACT_SYMBOL, IJiraIssueSettings } from "../settings"
import { RenderingCommon } from "./renderingCommon"

// TODO: support explicit account selection in inline issues

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
        // console.log({ el })
        this.convertInlineIssuesToTags(el)
        this.convertInlineIssuesUrlToTags(el)

        const inlineIssueTags: NodeListOf<HTMLSpanElement> = el.querySelectorAll(`span.ji-inline-issue`)
        inlineIssueTags.forEach((value: HTMLSpanElement) => {
            const issueKey = value.getAttribute('data-issue-key')
            const compact = value.getAttribute('data-compact') === 'true'
            const cachedIssue = this._cache.get(issueKey)
            if (cachedIssue) {
                if (cachedIssue.isError) {
                    value.replaceChildren(this._rc.renderIssueError(issueKey, cachedIssue.data as string))
                } else {
                    value.replaceChildren(this._rc.renderIssue(cachedIssue.data as IJiraIssue, compact))
                }
            } else {
                value.replaceChildren(this._rc.renderLoadingItem(issueKey))
                this._client.getIssue(issueKey).then(newIssue => {
                    const issue = this._cache.add(issueKey, newIssue).data as IJiraIssue
                    value.replaceChildren(this._rc.renderIssue(issue, compact))
                }).catch(err => {
                    this._cache.add(issueKey, err, true)
                    value.replaceChildren(this._rc.renderIssueError(issueKey, err))
                })
            }
        })
    }

    private convertInlineIssuesToTags(el: HTMLElement): void {
        if (this._settings.inlineIssuePrefix) {
            let match
            while (match = new RegExp(`${this._settings.inlineIssuePrefix}(${COMPACT_SYMBOL}?)([A-Z0-9]+-[0-9]+)`).exec(el.innerHTML)) {
                // console.log({ match })
                const compact = !!match[1]
                const issueKey = match[2]
                const container = createSpan({ cls: 'ji-inline-issue jira-issue-container', attr: { 'data-issue-key': issueKey, 'data-compact': compact } })
                container.appendChild(this._rc.renderLoadingItem(issueKey, true))
                el.innerHTML = el.innerHTML.replace(match[0], container.outerHTML)
            }
        }
    }

    private convertInlineIssuesUrlToTags(el: HTMLElement): void {
        if (this._settings.inlineIssueUrlToTag) {
            for (const account of this._settings.accounts) {
                const issueUrlElements: NodeListOf<HTMLAnchorElement> = el.querySelectorAll(`a.external-link[href^="${account.host}/browse/"]`)
                issueUrlElements.forEach((value: HTMLAnchorElement) => {
                    const issueKey = value.href.replace(`${account.host}/browse/`, '')
                    const container = createSpan({ cls: 'ji-inline-issue jira-issue-container', attr: { 'data-issue-key': issueKey, 'data-compact': false } })
                    container.appendChild(this._rc.renderLoadingItem(issueKey, true))
                    value.replaceWith(container)
                })
            }
        }
    }
}