import { MarkdownPostProcessorContext } from "obsidian"
import { IJiraIssueSettings } from "../settings"

export class InlineIssueRenderer {
    private _settings: IJiraIssueSettings

    constructor(settings: IJiraIssueSettings) {
        this._settings = settings
    }

    async render(el: HTMLElement, ctx: MarkdownPostProcessorContext) {
        console.log({ el })
        if (this._settings.inlineIssuePrefix) {
            const matches = el.innerHTML.match(new RegExp(`${this._settings.inlineIssuePrefix}([A-Z0-9]+-[0-9]+)`, 'g'))
            console.log({ matches })
            if (matches) {
                for (const match of matches) {
                    const issueKey = match.replace(this._settings.inlineIssuePrefix, '')
                    const issueTag = this.renderInlineIssue(issueKey)
                    el.innerHTML = el.innerHTML.replace(match, issueTag.outerHTML)
                }
            }
        }
        if(this._settings.issueUrlToTag) {
            
        }
    }

    private renderInlineIssue(issueKey: string): HTMLElement {
        return createSpan({ text: 'test of ' + issueKey })
        // console.log(`Issue found: ${issueKey}`)
        // let issue: IJiraIssue = this._cache.get(issueKey)
        // if (!issue) {
        //     // console.log(`Issue not available in the cache`)
        //     renderedItems[issueKey] = this.renderLoadingItem(issueKey, this.issueUrl(issueKey))
        //     this._client.getIssue(issueKey).then(newIssue => {
        //         issue = this._cache.add(issueKey, newIssue)
        //         renderedItems[issueKey] = this.renderIssue(issue)
        //         this.updateRenderedIssues(el, renderedItems)
        //     }).catch(err => {
        //         renderedItems[issueKey] = this.renderIssueError(issueKey, err)
        //         this.updateRenderedIssues(el, renderedItems)
        //     })
        // } else {
        //     return this.renderIssue(issue)
        // }
    }


    // private renderIssue(issue: IJiraIssue): HTMLElement {
    //     const tagsRow = createDiv('ji-tags has-addons')
    //     createEl('img', {
    //         cls: 'fit-content',
    //         attr: { src: issue.fields.issuetype.iconUrl, alt: issue.fields.issuetype.name },
    //         title: issue.fields.issuetype.name,
    //         parent: createSpan({ cls: `ji-tag ${this.getTheme()}`, parent: tagsRow })
    //     })
    //     createEl('a', { cls: `ji-tag is-link ${this.getTheme()} no-wrap`, href: this.issueUrl(issue.key), text: issue.key, parent: tagsRow })
    //     createSpan({ cls: `ji-tag ${this.getTheme()} issue-summary`, text: issue.fields.summary, parent: tagsRow })
    //     const statusColor = JIRA_STATUS_COLOR_MAP[issue.fields.status.statusCategory.colorName] || 'is-light'
    //     createSpan({ cls: `ji-tag no-wrap ${statusColor}`, text: issue.fields.status.name, title: issue.fields.status.description, parent: tagsRow })
    //     return tagsRow
    // }
}