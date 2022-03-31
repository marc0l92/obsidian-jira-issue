import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian'
import { JiraIssueProcessor } from './processor'
import { JiraIssueSettings } from './settings'

export default class JiraIssuePlugin extends Plugin {
    settings: JiraIssueSettings
    processor: JiraIssueProcessor

    async onload() {
        this.settings = new JiraIssueSettings(this.app, this)
        this.addSettingTab(this.settings)
        this.processor = new JiraIssueProcessor(this.settings)
        this.registerMarkdownCodeBlockProcessor('jira', this.processor.fence)

        // new Notice('This is a notice!');

        this.addCommand({
            id: 'obsidian-jira-issue-clear-cache',
            name: 'Clear cache',
            callback: () => {
                // TODO: Clear cache
            }
        })
        this.addCommand({
            id: 'obsidian-jira-issue-template-fence',
            name: 'Insert fence template',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                // TODO: Insert fence template
                console.log(editor)
                // editor.setValue('```jira\n\n```')
            }
        })

    }

    onunload() {
    }
}

