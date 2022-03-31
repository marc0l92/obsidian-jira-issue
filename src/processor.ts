import { MarkdownPostProcessorContext } from "obsidian";
import { JiraClient } from "./jiraClient";
import { ObjectsCache } from "./objectsCache";
import { IJiraIssueSettings } from "./settings";

const loadingMessage = `
<div class="jira-issue-container">
    <span>JiraIssue: Getting issue details...</span><span class="spinner"></span>
</div>
`

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
        console.log({ source, el, ctx })
        console.log(this._settings)
        el.innerHTML = loadingMessage
        for (const line of source.split('\n')) {
            const matches = line.match(/[A-Z]+-[0-9]+/)
            if (matches) {
                const issueKey = matches[0]
                console.log(`Issue found: ${issueKey}`)
                let issue = this._cache.get(issueKey)
                if (!issue) {
                    console.log(`Issue not available in the cache`)
                    const newIssue = await this._client.getIssue(issueKey)
                    issue = this._cache.add(issueKey, newIssue)
                }
                // el.innerHTML = this.renderIssue(issue)
            }
        }
    }

    private renderIssue(issue: any) {
        return `
            <div class="jira-issue-container">
                <div class="jira-issue-header">
                    <span class="jira-issue-key">${issue.key}</span>
                    <span class="jira-issue-summary">${issue.fields.summary}</span>
                </div>
                <div class="jira-issue-body">
                    <div class="jira-issue-description">${issue.fields.description}</div>
                    <div class="jira-issue-status">Status: ${issue.fields.status.name}</div>
                    <div class="jira-issue-assignee">Assignee: ${issue.fields.assignee.displayName}</div>
                    <div class="jira-issue-reporter">Reporter: ${issue.fields.reporter.displayName}</div>
                    <div class="jira-issue-created">Created: ${new Date(issue.fields.created).toLocaleString()}</div>
                    <div class="jira-issue-updated">Updated: ${new Date(issue.fields.updated).toLocaleString()}</div>
                </div>
            </div>
            `
    }
}