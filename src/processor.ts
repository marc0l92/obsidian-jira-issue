import { MarkdownPostProcessorContext } from "obsidian";
import { IJiraIssueSettings } from "./settings";

const loadingMessage = `
<div class="jira-issue-container">
    <span>JiraIssue: Getting issue details...</span><span class="spinner"></span>
</div>
`

export class JiraIssueProcessor {
    private _settings: IJiraIssueSettings

    constructor(settings: IJiraIssueSettings) {
        this._settings = settings
    }

    async fence(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        console.log({ source, el, ctx })
        el.innerHTML = loadingMessage
    }
}