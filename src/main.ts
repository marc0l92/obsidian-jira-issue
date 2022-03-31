import { Editor, MarkdownView, Notice, Plugin } from 'obsidian'
import { JiraClient } from './jiraClient'
import { ObjectsCache } from './objectsCache'
import { JiraIssueProcessor } from './processor'
import { JiraIssueSettingsTab } from './settings'

export default class JiraIssuePlugin extends Plugin {
    settings: JiraIssueSettingsTab
    processor: JiraIssueProcessor
    cache: ObjectsCache
    client: JiraClient

    async onload() {
        this.settings = new JiraIssueSettingsTab(this.app, this)
        await this.settings.loadSettings()
        this.addSettingTab(this.settings)
        this.cache = new ObjectsCache(this.settings.getData())
        this.client = new JiraClient(this.settings.getData())
        this.processor = new JiraIssueProcessor(this.settings.getData(), this.client, this.cache)
        this.registerMarkdownCodeBlockProcessor('jira-issue', this.processor.issueFence.bind(this.processor))

        this.addCommand({
            id: 'obsidian-jira-issue-clear-cache',
            name: 'Clear cache',
            callback: () => {
                this.cache.clear()
                new Notice('JiraIssue: Cache cleaned')
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

