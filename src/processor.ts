import { MarkdownPostProcessorContext } from "obsidian";
import { JiraIssueSettings } from "./settings";

export class JiraIssueProcessor {
    settings: JiraIssueSettings

    constructor(settings: JiraIssueSettings) {
        this.settings = settings
    }

    async fence(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        console.log({ source, el, ctx })
        el.innerHTML = `ciao`
    }
}