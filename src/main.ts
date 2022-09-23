import { Editor, MarkdownView, Notice, Plugin } from 'obsidian'
import { JiraClient } from './client/jiraClient'
import { ObjectsCache } from './objectsCache'
import { ColumnsSuggest } from './rendering/columnsSuggest'
import { CountFenceRenderer } from './rendering/countFenceRenderer'
import { InlineIssueRenderer } from './rendering/inlineIssueRenderer'
import { IssueFenceRenderer } from './rendering/issueFenceRenderer'
import { RenderingCommon } from './rendering/renderingCommon'
import { SearchFenceRenderer } from './rendering/searchFenceRenderer'
import { SearchWizardModal } from './rendering/searchWizardModal'
import { JiraIssueSettingsTab } from './settings'
import { ViewPluginManager } from './rendering/inlineIssueViewPlugin'
import { QuerySuggest } from './rendering/querySuggest'

// TODO: text on mobile and implement horizontal scrolling

export default class JiraIssuePlugin extends Plugin {
    _settings: JiraIssueSettingsTab
    _renderingCommon: RenderingCommon
    _issueFenceRenderer: IssueFenceRenderer
    _searchFenceRenderer: SearchFenceRenderer
    _countFenceRenderer: CountFenceRenderer
    _inlineIssueRenderer: InlineIssueRenderer
    _cache: ObjectsCache
    _client: JiraClient
    _columnsSuggest: ColumnsSuggest
    _querySuggest: QuerySuggest
    _inlineIssueViewPlugin: ViewPluginManager

    async onload() {
        this._settings = new JiraIssueSettingsTab(this.app, this)
        await this._settings.loadSettings()
        this.addSettingTab(this._settings)
        this._cache = new ObjectsCache(this._settings.getData())
        this._client = new JiraClient(this._settings.getData())
        this._client.updateCustomFieldsCache()
        this._client.updateJQLAutoCompleteCache()
        this._settings.setJiraClient(this._client)
        this._renderingCommon = new RenderingCommon(this._settings.getData(), this.app)
        // Fence rendering
        this._issueFenceRenderer = new IssueFenceRenderer(this._renderingCommon, this._client, this._cache)
        this.registerMarkdownCodeBlockProcessor('jira-issue', this._issueFenceRenderer.render.bind(this._issueFenceRenderer))
        this._searchFenceRenderer = new SearchFenceRenderer(this._renderingCommon, this._settings.getData(), this._client, this._cache)
        this.registerMarkdownCodeBlockProcessor('jira-search', this._searchFenceRenderer.render.bind(this._searchFenceRenderer))
        this._countFenceRenderer = new CountFenceRenderer(this._renderingCommon, this._client, this._cache)
        this.registerMarkdownCodeBlockProcessor('jira-count', this._countFenceRenderer.render.bind(this._countFenceRenderer))
        // Suggestion menu for columns inside jira-search fence
        this.app.workspace.onLayoutReady(() => {
            this._columnsSuggest = new ColumnsSuggest(this.app, this._settings.getData())
            this.registerEditorSuggest(this._columnsSuggest)
        })
        // Suggestion menu for query inside jira-search fence
        this.app.workspace.onLayoutReady(() => {
            this._querySuggest = new QuerySuggest(this.app, this._settings.getData())
            this.registerEditorSuggest(this._querySuggest)
        })
        // Reading mode inline issue rendering
        this._inlineIssueRenderer = new InlineIssueRenderer(this._renderingCommon, this._settings.getData(), this._client, this._cache)
        this.registerMarkdownPostProcessor(this._inlineIssueRenderer.render.bind(this._inlineIssueRenderer))
        // Live preview inline issue rendering
        this._inlineIssueViewPlugin = new ViewPluginManager(this._renderingCommon, this._settings.getData(), this._client, this._cache)
        this.registerEditorExtension(this._inlineIssueViewPlugin.getViewPlugin())

        // Settings refresh
        this._settings.onChange(() => {
            this._cache.clear()
            this._client.updateCustomFieldsCache()
            this._client.updateJQLAutoCompleteCache()
            this._inlineIssueViewPlugin.update()
        })

        // Commands
        this.addCommand({
            id: 'obsidian-jira-issue-clear-cache',
            name: 'Clear cache',
            callback: () => {
                this._cache.clear()
                this._client.updateCustomFieldsCache()
                this._client.updateJQLAutoCompleteCache()
                new Notice('JiraIssue: Cache cleaned')
            }
        })
        this.addCommand({
            id: 'obsidian-jira-issue-template-fence',
            name: 'Insert issue template',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                editor.replaceRange('```jira-issue\n\n```', editor.getCursor())
            }
        })
        this.addCommand({
            id: 'obsidian-jira-search-wizard-fence',
            name: 'Search wizard',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                new SearchWizardModal(this.app, this._settings.getData(), (result) => {
                    editor.replaceRange(result, editor.getCursor())
                }).open()
            }
        })
        this.addCommand({
            id: 'obsidian-jira-count-template-fence',
            name: 'Insert count template',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                editor.replaceRange('```jira-count\n\n```', editor.getCursor())
            }
        })
    }

    onunload() {
        this._settings = null
        this._cache = null
        this._client = null
        this._renderingCommon = null
        this._issueFenceRenderer = null
        this._searchFenceRenderer = null
        this._countFenceRenderer = null
        this._inlineIssueRenderer = null
        this._columnsSuggest = null
        this._inlineIssueViewPlugin = null
    }
}

