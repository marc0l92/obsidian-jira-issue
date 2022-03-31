import { Editor, MarkdownView, Notice, Plugin } from 'obsidian'
import { ObjectsCache } from './objectsCache'
import { JiraIssueProcessor } from './processor'
import { JiraIssueSettingsTab } from './settings'

export default class JiraIssuePlugin extends Plugin {
    settings: JiraIssueSettingsTab
    processor: JiraIssueProcessor
    cache: ObjectsCache

    async onload() {
        this.settings = new JiraIssueSettingsTab(this.app, this)
        this.addSettingTab(this.settings)
        this.cache = new ObjectsCache(this.settings.getData())
        this.processor = new JiraIssueProcessor(this.settings.getData())
        this.registerMarkdownCodeBlockProcessor('jira', this.processor.fence)

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

