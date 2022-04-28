import { App, PluginSettingTab, Setting } from 'obsidian'
import JiraIssuePlugin from './main'

export enum EAuthenticationTypes {
    OPEN = 'OPEN',
    BASIC = 'BASIC',
    BEARER_TOKEN = 'BEARER_TOKEN',
}
const AUTHENTICATION_TYPE_DESCRIPTION = {
    [EAuthenticationTypes.OPEN]: 'Open',
    [EAuthenticationTypes.BASIC]: 'Basic Authentication',
    [EAuthenticationTypes.BEARER_TOKEN]: 'Bearer Token',
}

export enum ESearchResultsRenderingTypes {
    TABLE = 'TABLE',
    LIST = 'LIST',
}
const SEARCH_RESULTS_RENDERING_TYPE_DESCRIPTION = {
    [ESearchResultsRenderingTypes.TABLE]: 'Table',
    [ESearchResultsRenderingTypes.LIST]: 'List',
}

export enum ESearchColumnsTypes {
    KEY = 'KEY',
    SUMMARY = 'SUMMARY',
    TYPE = 'TYPE',
    CREATED = 'CREATED',
    UPDATED = 'UPDATED',
    REPORTER = 'REPORTER',
    ASSIGNEE = 'ASSIGNEE',
    PRIORITY = 'PRIORITY',
    STATUS = 'STATUS',
    // CUSTOM = 'CUSTOM',
}
export const SEARCH_COLUMNS_DESCRIPTION = {
    [ESearchColumnsTypes.KEY]: 'Key',
    [ESearchColumnsTypes.SUMMARY]: 'Summary',
    [ESearchColumnsTypes.TYPE]: 'Type',
    [ESearchColumnsTypes.CREATED]: 'Created',
    [ESearchColumnsTypes.UPDATED]: 'Updated',
    [ESearchColumnsTypes.REPORTER]: 'Reporter',
    [ESearchColumnsTypes.ASSIGNEE]: 'Assignee',
    [ESearchColumnsTypes.PRIORITY]: 'Priority',
    [ESearchColumnsTypes.STATUS]: 'Status',
    // [ESearchColumnsTypes.CUSTOM]: 'Custom',
}

interface ISearchColumn {
    type: ESearchColumnsTypes
    compact: boolean
    customField?: string
}

export interface IJiraIssueSettings {
    host: string
    authenticationType: EAuthenticationTypes
    username?: string
    password?: string
    bareToken?: string
    apiBasePath: string
    cacheTime: string
    searchResultsLimit: number
    statusColorCache: Record<string, string>
    searchResultsRenderingType: ESearchResultsRenderingTypes
    darkMode: boolean
    searchColumns: ISearchColumn[]
}

const DEFAULT_SETTINGS: IJiraIssueSettings = {
    host: 'https://issues.apache.org/jira',
    authenticationType: EAuthenticationTypes.OPEN,
    apiBasePath: '/rest/api/latest',
    password: '********',
    cacheTime: '15m',
    searchResultsLimit: 10,
    statusColorCache: {},
    searchResultsRenderingType: ESearchResultsRenderingTypes.TABLE,
    darkMode: false,
    searchColumns: [
        { type: ESearchColumnsTypes.KEY, compact: false },
        { type: ESearchColumnsTypes.SUMMARY, compact: false },
        { type: ESearchColumnsTypes.TYPE, compact: true },
        { type: ESearchColumnsTypes.CREATED, compact: false },
        { type: ESearchColumnsTypes.UPDATED, compact: false },
        { type: ESearchColumnsTypes.REPORTER, compact: false },
        { type: ESearchColumnsTypes.ASSIGNEE, compact: false },
        { type: ESearchColumnsTypes.PRIORITY, compact: true },
        { type: ESearchColumnsTypes.STATUS, compact: false },
    ],
}

export class JiraIssueSettingsTab extends PluginSettingTab {
    private _plugin: JiraIssuePlugin
    private _data: IJiraIssueSettings = DEFAULT_SETTINGS
    private _onChangeListener: (() => void) | null = null

    constructor(app: App, plugin: JiraIssuePlugin) {
        super(app, plugin)
        this._plugin = plugin
    }

    getData(): IJiraIssueSettings {
        return this._data
    }

    async loadSettings() {
        this._data = Object.assign({}, DEFAULT_SETTINGS, await this._plugin.loadData())
        this._data.statusColorCache = DEFAULT_SETTINGS.statusColorCache
    }

    async saveSettings() {
        await this._plugin.saveData(this._data)
        if (this._onChangeListener) {
            this._onChangeListener()
        }
    }

    onChange(listener: () => void) {
        this._onChangeListener = listener
    }

    display(): void {
        const { containerEl } = this
        containerEl.empty()

        containerEl.createEl('h2', { text: 'Connection' })
        new Setting(containerEl)
            .setName('Host')
            .setDesc('Hostname of your company Jira server.')
            .addText(text => text
                .setPlaceholder('Example: ' + DEFAULT_SETTINGS.host)
                .setValue(this._data.host)
                .onChange(async value => {
                    this._data.host = value
                    await this.saveSettings()
                }))
        new Setting(containerEl)
            .setName('Authentication type')
            .setDesc('Select how the plugin should authenticate in your Jira server.')
            .addDropdown(dropdown => dropdown
                .addOptions(AUTHENTICATION_TYPE_DESCRIPTION)
                .setValue(this._data.authenticationType)
                .onChange(async value => {
                    this._data.authenticationType = value as EAuthenticationTypes
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
        if (this._data.authenticationType === EAuthenticationTypes.BASIC) {
            new Setting(containerEl)
                .setName('Username')
                .setDesc('Username to access your Jira account using HTTP basic authentication.')
                .addText(text => text
                    // .setPlaceholder('')
                    .setValue(this._data.username)
                    .onChange(async value => {
                        this._data.username = value
                        await this.saveSettings()
                    }))
            new Setting(containerEl)
                .setName('Password')
                .setDesc('Password to access your Jira account using HTTP basic authentication.')
                .addText(text => text
                    // .setPlaceholder('')
                    .setValue(DEFAULT_SETTINGS.password)
                    .onChange(async value => {
                        this._data.password = value
                        await this.saveSettings()
                    }))
        }
        if (this._data.authenticationType === EAuthenticationTypes.BEARER_TOKEN) {
            new Setting(containerEl)
                .setName('Bearer token')
                .setDesc('Token to access your Jira account using OAuth2 Bearer token authentication.')
                .addText(text => text
                    // .setPlaceholder('')
                    .setValue(this._data.bareToken)
                    .onChange(async value => {
                        this._data.bareToken = value
                        await this.saveSettings()
                    }))
        }


        containerEl.createEl('h2', { text: 'Cache' })
        new Setting(containerEl)
            .setName('Cache time')
            .setDesc('Time before the cached issue status expires. A low value will refresh the data very often but do a lot of request to the server.')
            .addText(text => text
                .setPlaceholder('Example: 15m, 24h, 5s')
                .setValue(this._data.cacheTime)
                .onChange(async value => {
                    this._data.cacheTime = value
                    await this.saveSettings()
                }))


        containerEl.createEl('h2', { text: 'Rendering' })
        new Setting(containerEl)
            .setName('Search rendering type')
            .setDesc('Select how the results of a jira-search should be rendered.')
            .addDropdown(dropdown => dropdown
                .addOptions(SEARCH_RESULTS_RENDERING_TYPE_DESCRIPTION)
                .setValue(this._data.searchResultsRenderingType)
                .onChange(async value => {
                    this._data.searchResultsRenderingType = value as ESearchResultsRenderingTypes
                    await this.saveSettings()
                }))
        new Setting(containerEl)
            .setName('Search results limit')
            .setDesc('Maximum number of search results to retrieve from a JQL query performed with jira-search.')
            .addText(text => text
                // .setPlaceholder('Insert a number')
                .setValue(this._data.searchResultsLimit.toString())
                .onChange(async value => {
                    this._data.searchResultsLimit = parseInt(value) || DEFAULT_SETTINGS.searchResultsLimit
                    await this.saveSettings()
                }))
        new Setting(containerEl)
            .setName('Dark mode')
            // .setDesc('')
            .addToggle(toggle => toggle
                .setValue(this._data.darkMode)
                .onChange(async value => {
                    this._data.darkMode = value
                    await this.saveSettings()
                }))


        containerEl.createEl('h2', { text: 'Search columns' })
        const desc = document.createDocumentFragment()
        desc.append(
            "Columns to display in the jira-search table visualization.",
        )
        new Setting(containerEl).setDesc(desc)
        this._data.searchColumns.forEach((column, index) => {
            const setting = new Setting(containerEl)
                .addDropdown(dropdown => dropdown
                    .addOptions(SEARCH_COLUMNS_DESCRIPTION)
                    .setValue(column.type)
                    .onChange(async value => {
                        this._data.searchColumns[index].type = value as ESearchColumnsTypes
                        await this.saveSettings()
                        // Force refresh
                        this.display()
                    }).selectEl.addClass('flex-grow-1')
                )

            // if (column.type === ESearchColumnsTypes.CUSTOM) {
            //     setting.addText(text => text
            //         .setPlaceholder('Custom field name')
            //         .setValue(column.customField)
            //         .onChange(async value => {
            //             this._data.searchColumns[index].customField = value
            //             await this.saveSettings()
            //         }).inputEl.addClass('custom-field-text')
            //     )
            // }
            setting.addExtraButton(button => button
                .setIcon(this._data.searchColumns[index].compact ? 'compress-glyph' : 'enlarge-glyph')
                .setTooltip(this._data.searchColumns[index].compact ? 'Compact' : 'Full width')
                .onClick(async () => {
                    this._data.searchColumns[index].compact = !this._data.searchColumns[index].compact
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
            setting.addExtraButton(button => button
                .setIcon('up-chevron-glyph')
                .setTooltip('Move up')
                .setDisabled(index === 0)
                .onClick(async () => {
                    const tmp = this._data.searchColumns[index]
                    this._data.searchColumns[index] = this._data.searchColumns[index - 1]
                    this._data.searchColumns[index - 1] = tmp
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
            setting.addExtraButton(button => button
                .setIcon('down-chevron-glyph')
                .setTooltip('Move down')
                .setDisabled(index === this._data.searchColumns.length - 1)
                .onClick(async () => {
                    const tmp = this._data.searchColumns[index]
                    this._data.searchColumns[index] = this._data.searchColumns[index + 1]
                    this._data.searchColumns[index + 1] = tmp
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
            setting.addExtraButton(button => button
                .setIcon('trash')
                .setTooltip('Delete')
                .onClick(async () => {
                    this._data.searchColumns.splice(index, 1)
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
            setting.infoEl.remove()
        })
        const searchColumnsButtons = new Setting(containerEl)
        searchColumnsButtons.addButton(button => button
            .setButtonText("Add Column")
            .setCta()
            .onClick(async value => {
                this._data.searchColumns.push({ type: ESearchColumnsTypes.STATUS, compact: false })
                await this.saveSettings()
                // Force refresh
                this.display()
            })
        )
        searchColumnsButtons.addButton(button => button
            .setButtonText("Reset columns")
            .setWarning()
            .onClick(async value => {
                this._data.searchColumns = DEFAULT_SETTINGS.searchColumns
                await this.saveSettings()
                // Force refresh
                this.display()
            })
        )
    }
}