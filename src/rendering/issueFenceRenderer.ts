import { MarkdownPostProcessorContext } from "obsidian"
import { IJiraIssue } from "../client/jiraInterfaces"
import { JiraClient } from "../client/jiraClient"
import { ObjectsCache } from "../objectsCache"
import { RenderingCommon } from "./renderingCommon"
import { COMMENT_REGEX } from "src/settings"

const ISSUE_REGEX = /^\s*([A-Z0-9]+-[0-9]+)\s*$/i
const ISSUE_LINK_REGEX = /\/([A-Z0-9]+-[0-9]+)\s*$/i

export class IssueFenceRenderer {
    private _rc: RenderingCommon
    private _client: JiraClient
    private _cache: ObjectsCache

    constructor(renderingCommon: RenderingCommon, client: JiraClient, cache: ObjectsCache) {
        this._rc = renderingCommon
        this._client = client
        this._cache = cache
    }

    async render(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        const renderedItems: Record<string, HTMLElement> = {}
        for (const line of source.split('\n')) {
            const issueKey = this.getIssueKey(line)
            if (issueKey) {
                // console.log(`Issue found: ${issueKey}`)
                let issue: IJiraIssue = this._cache.get(issueKey)
                if (!issue) {
                    // console.log(`Issue not available in the cache`)
                    renderedItems[issueKey] = this._rc.renderLoadingItem(issueKey, this._rc.issueUrl(issueKey))
                    this._client.getIssue(issueKey).then(newIssue => {
                        issue = this._cache.add(issueKey, newIssue)
                        renderedItems[issueKey] = this._rc.renderIssue(issue)
                        this.updateRenderedIssues(el, renderedItems)
                    }).catch(err => {
                        renderedItems[issueKey] = this._rc.renderIssueError(issueKey, err)
                        this.updateRenderedIssues(el, renderedItems)
                    })
                } else {
                    renderedItems[issueKey] = this._rc.renderIssue(issue)
                }
            }
        }
        this.updateRenderedIssues(el, renderedItems)
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
            el.replaceChildren(this._rc.renderContainer(Object.values(renderedItems)))
        } else {
            el.replaceChildren(this._rc.renderContainer([this.renderNoItems()]))
        }
    }

    private renderNoItems(): HTMLElement {
        const tagsRow = createDiv('ji-tags has-addons')
        createSpan({ cls: 'ji-tag is-danger is-light', text: 'JiraIssue', parent: tagsRow })
        createSpan({ cls: 'ji-tag is-danger', text: 'No valid issues found', parent: tagsRow })
        return tagsRow
    }
}