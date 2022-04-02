import { Editor, MarkdownView, Notice, Plugin } from 'obsidian'
import { JiraClient } from './jiraClient'
import { ObjectsCache } from './objectsCache'
import { JiraIssueProcessor } from './processor'
import { JiraIssueSettingsTab } from './settings'

export default class JiraIssuePlugin extends Plugin {
    _settings: JiraIssueSettingsTab
    _processor: JiraIssueProcessor
    _cache: ObjectsCache
    _client: JiraClient

    async onload() {
        this._settings = new JiraIssueSettingsTab(this.app, this)
        await this._settings.loadSettings()
        this.addSettingTab(this._settings)
        this._cache = new ObjectsCache(this._settings.getData())
        this._settings.onChange(() => {
            this._cache.clear()
        })
        this._client = new JiraClient(this._settings.getData())
        this._processor = new JiraIssueProcessor(this._settings.getData(), this._client, this._cache)
        this.registerMarkdownCodeBlockProcessor('jira-issue', this._processor.issueFence.bind(this._processor))

        this.addCommand({
            id: 'obsidian-jira-issue-clear-cache',
            name: 'Clear cache',
            callback: () => {
                this._cache.clear()
                new Notice('JiraIssue: Cache cleaned')
            }
        })
        this.addCommand({
            id: 'obsidian-jira-issue-template-fence',
            name: 'Insert fence template',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                editor.replaceRange('```jira-issue\n\n```', editor.getCursor());
            }
        })

    }

    onunload() {
    }
}

