import { MarkdownPostProcessorContext } from "obsidian"
import { JiraClient } from "./jiraClient"
import { ObjectsCache } from "./objectsCache"
import { IJiraIssueSettings } from "./settings"

const ISSUE_REGEX = /[A-Z]+-[0-9]+/
const JIRA_STATUS_COLOR_MAP: Record<string, string> = {
    'blue-gray': 'is-info',
    'yellow': 'is-warning',
    'green': 'is-success',
    'red': 'is-danger',
    'medium-gray': 'is-dark',
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

    private updateRenderedIssues(el: HTMLElement, renderedItems: Record<string, HTMLElement>) {
        if (!Object.isEmpty(renderedItems)) {
            el.replaceChildren(this.renderContainer(Object.values(renderedItems)))
        } else {
            el.replaceChildren(this.renderContainer([this.renderNoItems()]))
        }
    }

    private issueUrl(issueKey: string): string {
        return (new URL(`${this._settings.host}/browse/${issueKey}`)).toString()
    }

    private renderContainer(children: HTMLElement[]): HTMLElement {
        const container = createDiv({ cls: 'jira-issue-container' })
        for (const child of children) {
            container.appendChild(child)
        }
        return container
    }

    private renderLoadingItem(item: string, itemUrl: string): HTMLElement {
        const container = createDiv('ji-tags has-addons')
        createSpan({ cls: 'spinner', parent: createSpan({ cls: 'ji-tag is-light', parent: container }) })
        createEl('a', { cls: 'ji-tag is-link is-light', href: itemUrl, text: item, parent: container })
        createSpan({ cls: 'ji-tag is-light', text: 'Loading ...', parent: container })
        return container
    }

    private renderNoItems(): HTMLElement {
        const container = createDiv('ji-tags has-addons')
        createSpan({ cls: 'ji-tag is-danger is-light', text: 'JiraIssue', parent: container })
        createSpan({ cls: 'ji-tag is-danger', text: 'No valid issues found', parent: container })
        return container
    }

    private renderIssue(issue: any): HTMLElement {
        const container = createDiv('ji-tags has-addons')
        createEl('img', {
            cls: 'fit-content',
            attr: { src: issue.fields.issuetype.iconUrl, alt: issue.fields.issuetype.name },
            parent: createSpan({ cls: 'ji-tag is-light', parent: container })
        })
        createEl('a', { cls: 'ji-tag is-link is-light no-wrap', href: this.issueUrl(issue.key), text: issue.key, parent: container })
        createSpan({ cls: 'ji-tag is-light issue-summary', text: issue.fields.summary, parent: container })
        const statusColor = JIRA_STATUS_COLOR_MAP[issue.fields.status.statusCategory.colorName] || 'is-light'
        createSpan({ cls: `ji-tag no-wrap ${statusColor}`, text: issue.fields.status.name, parent: container })
        return container
    }

    private renderIssueError(issueKey: string, message: string): HTMLElement {
        const container = createDiv('ji-tags has-addons')
        createSpan({ cls: 'ji-tag is-delete is-danger', parent: container })
        createEl('a', { cls: 'ji-tag is-danger is-light', href: this.issueUrl(issueKey), text: issueKey, parent: container })
        createSpan({ cls: 'ji-tag is-danger', text: message, parent: container })
        return container
    }
}