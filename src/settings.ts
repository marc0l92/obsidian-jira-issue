import { App, Notice, PluginSettingTab, Setting, TextComponent } from 'obsidian'
import { JiraClient } from './client/jiraClient'
import { IJiraAutocompleteDataField, IJiraFieldSchema, IJiraIssueAccountSettings } from './client/jiraInterfaces'
import JiraIssuePlugin from './main'
import { ESearchColumnsTypes, ISearchColumn, SEARCH_COLUMNS_DESCRIPTION } from './searchView'

export enum EAuthenticationTypes {
    OPEN = 'OPEN',
    BASIC = 'BASIC',
    CLOUD = 'CLOUD',
    BEARER_TOKEN = 'BEARER_TOKEN',
}
const AUTHENTICATION_TYPE_DESCRIPTION = {
    [EAuthenticationTypes.OPEN]: 'Open',
    [EAuthenticationTypes.BASIC]: 'Basic Authentication',
    [EAuthenticationTypes.CLOUD]: 'Jira Cloud',
    [EAuthenticationTypes.BEARER_TOKEN]: 'Bearer Token',
}

export const COMPACT_SYMBOL = '-'
export const COMMENT_REGEX = /^\s*#/
const HIDDEN_PASSWORD_PLACEHOLDER = '********'

export interface IJiraIssueSettings {
    accounts: IJiraIssueAccountSettings[]
    apiBasePath: string
    cacheTime: string
    searchResultsLimit: number
    cache: {
        columns: string[]
    }
    darkMode: boolean
    inlineIssueUrlToTag: boolean
    inlineIssuePrefix: string
    searchColumns: ISearchColumn[]
    logRequestsResponses: boolean
    showColorBand: boolean

    // Legacy credentials
    host?: string
    authenticationType?: EAuthenticationTypes
    username?: string
    password?: string
    bareToken?: string
}

const DEFAULT_SETTINGS: IJiraIssueSettings = {
    accounts: [],
    apiBasePath: '/rest/api/latest',
    cacheTime: '15m',
    searchResultsLimit: 10,
    cache: {
        columns: [],
    },
    darkMode: false,
    inlineIssueUrlToTag: true,
    inlineIssuePrefix: 'JIRA:',
    showColorBand: true,
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
    logRequestsResponses: false,
}

const DEFAULT_ACCOUNT: IJiraIssueAccountSettings = {
    alias: 'Default',
    host: 'https://mycompany.atlassian.net',
    authenticationType: EAuthenticationTypes.OPEN,
    password: HIDDEN_PASSWORD_PLACEHOLDER,
    priority: 1,
    color: '#000000',
    cache: {
        statusColor: {},
        customFieldsIdToName: {},
        customFieldsNameToId: {},
        customFieldsType: {},
        jqlAutocomplete: {
            fields: [],
            functions: {},
        },
    },
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


export class JiraIssueSettingTab extends PluginSettingTab {
    private _plugin: JiraIssuePlugin
    private _onChangeListener: (() => void) | null = null
    private _searchColumnsDetails: HTMLDetailsElement = null

    constructor(app: App, plugin: JiraIssuePlugin) {
        super(app, plugin)
        this._plugin = plugin
    }

    async loadSettings() {
        // Read plugin data and fill new fields with default values
        Object.assign(SettingsData, DEFAULT_SETTINGS, await this._plugin.loadData())
        for (const i in SettingsData.accounts) {
            SettingsData.accounts[i] = Object.assign({}, DEFAULT_ACCOUNT, SettingsData.accounts[i])
        }
        SettingsData.cache = DEFAULT_SETTINGS.cache

        if (SettingsData.accounts.first() === null || SettingsData.accounts.length === 0) {
            if (SettingsData.host) {
                // Legacy credentials migration
                SettingsData.accounts = [
                    {
                        priority: 1,
                        host: SettingsData.host,
                        authenticationType: SettingsData.authenticationType,
                        username: SettingsData.username,
                        password: SettingsData.password,
                        bareToken: SettingsData.bareToken,
                        alias: DEFAULT_ACCOUNT.alias,
                        color: DEFAULT_ACCOUNT.color,
                        cache: DEFAULT_ACCOUNT.cache,
                    }
                ]
            } else {
                // First installation
                SettingsData.accounts = [DEFAULT_ACCOUNT]
            }
            this.saveSettings()
        }
        this.accountsConflictsFix()
    }

    async saveSettings() {
        const settingsToStore: IJiraIssueSettings = Object.assign({}, SettingsData, {
            // Global cache settings cleanup
            cache: DEFAULT_SETTINGS.cache, jqlAutocomplete: null, customFieldsIdToName: null, customFieldsNameToId: null, statusColorCache: null
        })
        // Account cache settings cleanup
        settingsToStore.accounts.forEach(account => account.cache = DEFAULT_ACCOUNT.cache)

        await this._plugin.saveData(settingsToStore)

        if (this._onChangeListener) {
            this._onChangeListener()
        }
    }

    onChange(listener: () => void) {
        this._onChangeListener = listener
    }

    display(): void {
        // Backup the search columns details status before cleaning the page
        const isSearchColumnsDetailsOpen = this._searchColumnsDetails
            && this._searchColumnsDetails.getAttribute('open') !== null

        // Clean the page
        this.containerEl.empty()
        this.displayHeader()
        this.displayAccountsSettings()
        this.displayRenderingSettings()
        this.displaySearchColumnsSettings(isSearchColumnsDetailsOpen)
        this.displayExtraSettings()
        this.displayFooter()
    }

    displayHeader() {
        const { containerEl } = this
        containerEl.createEl('h2', { text: 'Jira Issue' })
        const description = containerEl.createEl('p')
        description.appendText('Need help? Explore the ')
        description.appendChild(createEl('a', {
            text: 'Jira Issue documentation',
            href: 'https://marc0l92.github.io/obsidian-jira-issue/',
        }))
        description.appendText('.')

    }

    displayFooter() {
        const { containerEl } = this
        containerEl.createEl('h3', { text: 'Support development' })
        const description = containerEl.createEl('p')
        description.appendText('If you enjoy JiraIssue, consider giving me your feedback on the ')
        description.appendChild(createEl('a', {
            text: 'github repository',
            href: 'https://github.com/marc0l92/obsidian-jira-issue/issues',
        }))
        description.appendText(', and maybe ')
        description.appendChild(createEl('a', {
            text: 'buying me a coffee',
            href: 'https://ko-fi.com/marc0l92',
        }))
        description.appendText(' ☕.')
        const buyMeACoffee = containerEl.createEl('a', { href: 'https://ko-fi.com/marc0l92' })
        buyMeACoffee.appendChild(createEl('img', {
            attr: {
                src: 'https://camo.githubusercontent.com/3c7d0ccc8f3d2f6071fbb1aae2dd2f755212d10bc37cd57cf7b3f53862a89d85/68747470733a2f2f617a3734333730322e766f2e6d7365636e642e6e65742f63646e2f6b6f6669332e706e67',
                height: '50',
            }
        }))
    }

    displayAccountsSettings() {
        const { containerEl } = this
        containerEl.createEl('h3', { text: 'Accounts' })

        for (const account of SettingsData.accounts) {
            const accountSetting = new Setting(containerEl)
                .setName(`${account.priority}: ${account.alias}`)
                .setDesc(account.host)
                .addExtraButton(button => button
                    .setIcon('pencil')
                    .setTooltip('Modify')
                    .onClick(async () => {
                        // Change page
                        this.displayModifyAccountPage(account)
                    }))
                .addExtraButton(button => button
                    .setIcon('trash')
                    .setTooltip('Delete')
                    .setDisabled(SettingsData.accounts.length <= 1)
                    .onClick(async () => {
                        SettingsData.accounts.remove(account)
                        this.accountsConflictsFix()
                        await this.saveSettings()
                        // Force refresh
                        this.display()
                    }))
            accountSetting.infoEl.setAttr('style', 'padding-left:5px;border-left:5px solid ' + account.color)
        }
        new Setting(containerEl)
            .addButton(button => button
                .setButtonText("Add account")
                .setCta()
                .onClick(async value => {
                    SettingsData.accounts.push(this.createNewEmptyAccount())
                    this.accountsConflictsFix()
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
    }

    displayModifyAccountPage(prevAccount: IJiraIssueAccountSettings, newAccount: IJiraIssueAccountSettings = null) {
        if (!newAccount) newAccount = Object.assign({}, prevAccount)
        const { containerEl } = this
        containerEl.empty()
        containerEl.createEl('h3', { text: 'Modify account' })

        new Setting(containerEl)
            .setName('Alias')
            .setDesc('Name of this account.')
            .addText(text => text
                .setPlaceholder('Example: Company name')
                .setValue(newAccount.alias)
                .onChange(async value => {
                    newAccount.alias = value
                }))
        new Setting(containerEl)
            .setName('Host')
            .setDesc('Hostname of your company Jira server.')
            .addText(text => text
                .setPlaceholder('Example: ' + DEFAULT_ACCOUNT.host)
                .setValue(newAccount.host)
                .onChange(async value => {
                    newAccount.host = value
                }))
        new Setting(containerEl)
            .setName('Authentication type')
            .setDesc('Select how the plugin should authenticate in your Jira server.')
            .addDropdown(dropdown => dropdown
                .addOptions(AUTHENTICATION_TYPE_DESCRIPTION)
                .setValue(newAccount.authenticationType)
                .onChange(async value => {
                    newAccount.authenticationType = value as EAuthenticationTypes
                    // Force refresh
                    this.displayModifyAccountPage(prevAccount, newAccount)
                }))
        if (newAccount.authenticationType === EAuthenticationTypes.BASIC) {
            new Setting(containerEl)
                .setName('Username')
                .setDesc('Username to access your Jira Server account using HTTP basic authentication.')
                .addText(text => text
                    // .setPlaceholder('')
                    .setValue(newAccount.username)
                    .onChange(async value => {
                        newAccount.username = value
                    }))
            new Setting(containerEl)
                .setName('Password')
                .setDesc('Password to access your Jira Server account using HTTP basic authentication.')
                .addText(text => text
                    // .setPlaceholder('')
                    .setValue(HIDDEN_PASSWORD_PLACEHOLDER)
                    .onChange(async value => {
                        newAccount.password = value
                    }))
        } else if (newAccount.authenticationType === EAuthenticationTypes.CLOUD) {
            new Setting(containerEl)
                .setName('Email')
                .setDesc('Email of your Jira Cloud account.')
                .addText(text => text
                    // .setPlaceholder('')
                    .setValue(newAccount.username)
                    .onChange(async value => {
                        newAccount.username = value
                    }))
            const apiTokenDescription = new Setting(containerEl)
                .setName('API Token')
                .addText(text => text
                    // .setPlaceholder('')
                    .setValue(HIDDEN_PASSWORD_PLACEHOLDER)
                    .onChange(async value => {
                        newAccount.password = value
                    }))
                .descEl
            apiTokenDescription.appendText('API token of your Jira Cloud account (')
            apiTokenDescription
                .appendChild(createEl('a', {
                    text: 'Official Documentation',
                    href: 'https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/'
                }))
            apiTokenDescription.appendText(').')
        } else if (newAccount.authenticationType === EAuthenticationTypes.BEARER_TOKEN) {
            new Setting(containerEl)
                .setName('Bearer token')
                .setDesc('Token to access your Jira account using OAuth3 Bearer token authentication.')
                .addText(text => text
                    // .setPlaceholder('')
                    .setValue(HIDDEN_PASSWORD_PLACEHOLDER)
                    .onChange(async value => {
                        newAccount.bareToken = value
                    }))
        }
        new Setting(containerEl)
            .setName('Priority')
            .setDesc('Accounts search priority.')
            .addDropdown(dropdown => dropdown
                .addOptions(this.createPriorityOptions())
                .setValue(newAccount.priority.toString())
                .onChange(async value => {
                    newAccount.priority = parseInt(value)
                }))
        let colorTextComponent: TextComponent = null
        const colorInput = new Setting(containerEl)
            .setName('Color band')
            .setDesc('Color of the tags border. Use colors in hexadecimal notation (Example: #000000).')
            .addText(text => {
                text
                    .setPlaceholder('Example: #000000')
                    .setValue(newAccount.color)
                    .onChange(async value => {
                        newAccount.color = value.replace(/[^#0-9A-Fa-f]/g, '')
                        if (newAccount.color[0] != '#') newAccount.color = '#' + newAccount.color
                        console.log(newAccount.color)
                        colorInput.setAttr('style', 'border-left: 5px solid ' + newAccount.color)
                    })
                colorTextComponent = text
            })
            .addExtraButton(button => button
                .setIcon('dice')
                .setTooltip('New random color')
                .onClick(async () => {
                    newAccount.color = getRandomColor()
                    if (colorTextComponent != null) colorTextComponent.setValue(newAccount.color)
                    colorInput.setAttr('style', 'border-left: 5px solid ' + newAccount.color)
                })).controlEl.children[0]
        colorInput.setAttr('style', 'border-left: 5px solid ' + newAccount.color)

        new Setting(containerEl)
            .addButton(button => button
                .setButtonText("Back")
                .setWarning()
                .onClick(async value => {
                    this.display()
                }))
            .addButton(button => button
                .setButtonText("Test Connection")
                .onClick(async value => {
                    button.setDisabled(true)
                    button.setButtonText("Testing...")
                    try {
                        await JiraClient.testConnection(newAccount)
                        new Notice('JiraIssue: Connection established!')
                        try {
                            const loggedUser = await JiraClient.getLoggedUser(newAccount)
                            new Notice(`JiraIssue: Logged as ${loggedUser.displayName}`)
                        } catch (e) {
                            new Notice('JiraIssue: Logged as Guest')
                            console.error('JiraIssue:TestConnection', e)
                        }
                    } catch (e) {
                        console.error('JiraIssue:TestConnection', e)
                        new Notice('JiraIssue: Connection failed!')
                    }
                    button.setButtonText("Test Connection")
                    button.setDisabled(false)
                }))
            .addButton(button => button
                .setButtonText("Save")
                .setCta()
                .onClick(async value => {
                    // Swap priority with another existing account
                    SettingsData.accounts.find(a => a.priority === newAccount.priority).priority = prevAccount.priority
                    Object.assign(prevAccount, newAccount)
                    this.accountsConflictsFix()
                    await this.saveSettings()
                    this.display()
                }))
    }

    displayRenderingSettings() {
        const { containerEl } = this
        containerEl.createEl('h3', { text: 'Rendering' })

        new Setting(containerEl)
            .setName('Default search results limit')
            .setDesc('Maximum number of search results to retrieve when using jira-search without specifying a limit.')
            .addText(text => text
                // .setPlaceholder('Insert a number')
                .setValue(SettingsData.searchResultsLimit.toString())
                .onChange(async value => {
                    SettingsData.searchResultsLimit = parseInt(value) || DEFAULT_SETTINGS.searchResultsLimit
                    await this.saveSettings()
                }))
        new Setting(containerEl)
            .setName('Dark mode')
            // .setDesc('')
            .addToggle(toggle => toggle
                .setValue(SettingsData.darkMode)
                .onChange(async value => {
                    SettingsData.darkMode = value
                    await this.saveSettings()
                }))

        new Setting(containerEl)
            .setName('Issue url to tags')
            .setDesc(`Convert links to issues to tags. Example: ${SettingsData.accounts[0].host}/browse/AAA-123`)
            .addToggle(toggle => toggle
                .setValue(SettingsData.inlineIssueUrlToTag)
                .onChange(async value => {
                    SettingsData.inlineIssueUrlToTag = value
                    await this.saveSettings()
                }))

        new Setting(containerEl)
            .setName('Inline issue prefix')
            .setDesc(`Prefix to use when rendering inline issues. Keep this field empty to disable this feature. Example: ${SettingsData.inlineIssuePrefix}AAA-123`)
            .addText(text => text
                .setValue(SettingsData.inlineIssuePrefix)
                .onChange(async value => {
                    SettingsData.inlineIssuePrefix = value
                    await this.saveSettings()
                }))
        new Setting(containerEl)
            .setName('Show color band')
            .setDesc('Display color band near by inline issue to simplify the account identification.')
            .addToggle(toggle => toggle
                .setValue(SettingsData.showColorBand)
                .onChange(async value => {
                    SettingsData.showColorBand = value
                    await this.saveSettings()
                }))
    }

    displaySearchColumnsSettings(isSearchColumnsDetailsOpen: boolean) {
        const { containerEl } = this
        containerEl.createEl('h3', { text: 'Search columns' })

        const desc = document.createDocumentFragment()
        desc.append(
            "Columns to display in the jira-search table visualization.",
        )
        new Setting(containerEl).setDesc(desc)
        this._searchColumnsDetails = containerEl.createEl('details',
            { attr: isSearchColumnsDetailsOpen ? { open: true } : {} }
        )
        this._searchColumnsDetails.createEl('summary', { text: 'Show/Hide columns' })
        SettingsData.searchColumns.forEach((column, index) => {
            const setting = new Setting(this._searchColumnsDetails)
                .addDropdown(dropdown => dropdown
                    .addOptions(SEARCH_COLUMNS_DESCRIPTION)
                    .setValue(column.type)
                    .onChange(async value => {
                        SettingsData.searchColumns[index].type = value as ESearchColumnsTypes
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
            //             settingData.searchColumns[index].customField = value
            //             await this.saveSettings()
            //         }).inputEl.addClass('custom-field-text')
            //     )
            // }
            setting.addExtraButton(button => button
                .setIcon(SettingsData.searchColumns[index].compact ? 'compress-glyph' : 'enlarge-glyph')
                .setTooltip(SettingsData.searchColumns[index].compact ? 'Compact' : 'Full width')
                .onClick(async () => {
                    SettingsData.searchColumns[index].compact = !SettingsData.searchColumns[index].compact
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
            setting.addExtraButton(button => button
                .setIcon('up-chevron-glyph')
                .setTooltip('Move up')
                .setDisabled(index === 0)
                .onClick(async () => {
                    const tmp = SettingsData.searchColumns[index]
                    SettingsData.searchColumns[index] = SettingsData.searchColumns[index - 1]
                    SettingsData.searchColumns[index - 1] = tmp
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
            setting.addExtraButton(button => button
                .setIcon('down-chevron-glyph')
                .setTooltip('Move down')
                .setDisabled(index === SettingsData.searchColumns.length - 1)
                .onClick(async () => {
                    const tmp = SettingsData.searchColumns[index]
                    SettingsData.searchColumns[index] = SettingsData.searchColumns[index + 1]
                    SettingsData.searchColumns[index + 1] = tmp
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
            setting.addExtraButton(button => button
                .setIcon('trash')
                .setTooltip('Delete')
                .onClick(async () => {
                    SettingsData.searchColumns.splice(index, 1)
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
            setting.infoEl.remove()
        })
        new Setting(this._searchColumnsDetails)
            .addButton(button => button
                .setButtonText("Reset columns")
                .setWarning()
                .onClick(async value => {
                    SettingsData.searchColumns = DEFAULT_SETTINGS.searchColumns
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
            .addButton(button => button
                .setButtonText("Add Column")
                .setCta()
                .onClick(async value => {
                    SettingsData.searchColumns.push({ type: ESearchColumnsTypes.KEY, compact: false })
                    await this.saveSettings()
                    // Force refresh
                    this.display()
                }))
    }

    displayExtraSettings() {
        const { containerEl } = this
        containerEl.createEl('h3', { text: 'Cache' })

        new Setting(containerEl)
            .setName('Cache time')
            .setDesc('Time before the cached issue status expires. A low value will refresh the data very often but do a lot of requests to the server.')
            .addText(text => text
                .setPlaceholder('Example: 15m, 24h, 5s')
                .setValue(SettingsData.cacheTime)
                .onChange(async value => {
                    SettingsData.cacheTime = value
                    await this.saveSettings()
                }))

        containerEl.createEl('h3', { text: 'Troubleshooting' })
        new Setting(containerEl)
            .setName('Log Request and Responses')
            .setDesc('Log in the console (CTRL+Shift+I) all the API requests and responses performed by the plugin.')
            .addToggle(toggle => toggle
                .setValue(SettingsData.logRequestsResponses)
                .onChange(async value => {
                    SettingsData.logRequestsResponses = value
                    await this.saveSettings()
                }))
    }

    createNewEmptyAccount() {
        const newAccount = JSON.parse(JSON.stringify(DEFAULT_ACCOUNT))
        newAccount.priority = SettingsData.accounts.length + 1
        this.accountsConflictsFix()
        return newAccount
    }

    accountsConflictsFix() {
        const aliases: string[] = []
        SettingsData.accounts.sort((a, b) => a.priority - b.priority)
        let priority = 1
        for (const account of SettingsData.accounts) {
            while (aliases.indexOf(account.alias) >= 0) account.alias += '1'
            aliases.push(account.alias)

            account.priority = priority
            priority++
        }
    }

    createPriorityOptions(): Record<string, string> {
        const options: Record<string, string> = {}
        for (let i = 1; i <= SettingsData.accounts.length; i++) {
            options[i.toString()] = i.toString()
        }
        return options
    }
}
export const SettingsData: IJiraIssueSettings = DEFAULT_SETTINGS
