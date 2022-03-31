import { App, PluginSettingTab, Setting } from 'obsidian'
import JiraIssuePlugin from './main'

const AUTHENTICATION_TYPES = {
    OPEN: 'Open',
    BASIC_AUTHENTICATION: 'Basic Authentication',
    BEARER_TOKEN: 'Bearer Token',
}

export interface IJiraIssueSettings {
    host: string
    authenticationType: string
    username?: string
    password?: string
    bareToken?: string
    apiBasePath: string // TODO
    cacheTime: string
    defaultSearchResultsLimit: number // TODO
    searchTemplate: string // TODO
}

const DEFAULT_SETTINGS: IJiraIssueSettings = {
    host: 'https://jira.secondlife.com',
    authenticationType: Object.keys(AUTHENTICATION_TYPES)[0],
    apiBasePath: '/rest/api/latest',
    password: '********',
    cacheTime: '15m',
    defaultSearchResultsLimit: 10,
    searchTemplate: 'kut<>rapsd',
}

export class JiraIssueSettingsTab extends PluginSettingTab {
    private _plugin: JiraIssuePlugin
    private _data: IJiraIssueSettings

    constructor(app: App, plugin: JiraIssuePlugin) {
        super(app, plugin)
        this._plugin = plugin
        this.loadSettings()
    }

    getData(): IJiraIssueSettings {
        return this._data
    }

    async loadSettings() {
        this._data = Object.assign({}, DEFAULT_SETTINGS, await this._plugin.loadData())
    }

    async saveSettings() {
        await this._plugin.saveData(this._data)
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
                .onChange(async (value) => {
                    this._data.host = value
                    await this.saveSettings()
                }))
        new Setting(containerEl)
            .setName('Authentication type')
            .setDesc('Select how the plugin should authenticate in your Jira server.')
            .addDropdown(dropdown => dropdown
                .addOptions(AUTHENTICATION_TYPES)
                .setValue(this._data.authenticationType)
                .onChange(async (value) => {
                    this._data.authenticationType = value
                    await this.saveSettings()
                }))
        new Setting(containerEl)
            .setName('Username')
            .setDesc('Username to access your Jira account using HTTP basic authentication.')
            .addText(text => text
                // .setPlaceholder('')
                .setValue(this._data.username)
                .onChange(async (value) => {
                    this._data.username = value
                    await this.saveSettings()
                }))
        new Setting(containerEl)
            .setName('Password')
            .setDesc('Password to access your Jira account using HTTP basic authentication.')
            .addText(text => text
                // .setPlaceholder('')
                .setValue(DEFAULT_SETTINGS.password)
                .onChange(async (value) => {
                    this._data.password = value
                    await this.saveSettings()
                }))
        new Setting(containerEl)
            .setName('Bearer token')
            .setDesc('Token to access your Jira account using OAuth2 Bearer token authentication.')
            .addText(text => text
                // .setPlaceholder('')
                .setValue(this._data.bareToken)
                .onChange(async (value) => {
                    this._data.bareToken = value
                    await this.saveSettings()
                }))


        containerEl.createEl('h2', { text: 'Cache' })
        new Setting(containerEl)
            .setName('Cache time')
            .setDesc('Time before the cached issue status expires. A low value will refresh the data very often but do a lot of request to the server.')
            .addText(text => text
                .setPlaceholder('Example: 15m, 24h, 5s')
                .setValue(this._data.cacheTime)
                .onChange(async (value) => {
                    this._data.cacheTime = value
                    await this.saveSettings()
                }))


        // containerEl.createEl('h2', { text: 'Rendering' })
        // new Setting(containerEl)
        //     .setName('Cache time')
        //     .setDesc('Time before the cached issue status expires. A low value will refresh the data very often but do a lot of request to the server.')
        //     .addText(text => text
        //         .setPlaceholder('Example: 15m, 24h, 5s')
        //         .setValue(this.settingsData.cacheTime)
        //         .onChange(async (value) => {
        //             this.settingsData.cacheTime = value
        //             await this.saveSettings()
        //         }))

    }
}