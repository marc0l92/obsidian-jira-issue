jest.mock('obsidian')
jest.mock('../src/client/jiraClient')

import { EAuthenticationTypes, EColorSchema, IJiraIssueSettings } from "../src/interfaces/settingsInterfaces"
import { DEFAULT_ACCOUNT, DEFAULT_SETTINGS, JiraIssueSettingTab, SettingsData } from "../src/settings"

function deepCopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj))
}

const StoredSettings = {
    accounts: [{
        alias: 'aliasVal',
        authenticationType: EAuthenticationTypes.BASIC,
        username: 'usernameVal',
        password: 'passwordVal',
        color: 'colorVal',
        host: 'hostVal',
        bareToken: 'bareToken',
        use2025Api: false,
    }],
    apiBasePath: 'apiBasePathVal',
    cache: {
        columns: ['column1', 'column2']
    },
    cacheTime: 'cacheTimeVal',
    colorSchema: EColorSchema.LIGHT,
    inlineIssuePrefix: 'inlineIssuePrefixVal',
    inlineIssueUrlToTag: true,
    logImagesFetch: false,
    logRequestsResponses: true,
    searchColumns: [
        // { type: ESearchColumnsTypes.KEY, compact: true },
        // { type: ESearchColumnsTypes.CUSTOM_FIELD, compact: false, extra: 'customVal' },
    ],
    searchResultsLimit: 99,
    showColorBand: true,
    showJiraLink: true,
} as IJiraIssueSettings

describe('Settings', () => {
    const pluginMock = {
        loadData: jest.fn(),
        saveData: jest.fn(),
    }
    const settingTab = new JiraIssueSettingTab(null, pluginMock as any)

    test('loadSettings empty settings to default', async () => {
        pluginMock.loadData.mockReturnValueOnce({})
        await settingTab.loadSettings()
        expect(pluginMock.loadData).toBeCalledTimes(1)
        expect(pluginMock.saveData).toBeCalledTimes(1)
        expect(pluginMock.saveData.mock.calls[0][0]).toEqual({
            ...DEFAULT_SETTINGS,
            accounts: [DEFAULT_ACCOUNT],
            customFieldsIdToName: null,
            customFieldsNameToId: null,
            jqlAutocomplete: null,
            statusColorCache: null,
        })
        expect(SettingsData).toEqual({
            ...DEFAULT_SETTINGS,
            accounts: [DEFAULT_ACCOUNT],
        })
    })
    test('loadSettings valid full settings', async () => {
        pluginMock.loadData.mockReturnValueOnce(deepCopy(StoredSettings))
        await settingTab.loadSettings()
        expect(pluginMock.loadData).toBeCalledTimes(1)
        expect(pluginMock.saveData).toBeCalledTimes(0)
        expect(SettingsData).toEqual({
            ...StoredSettings,
            accounts: [{
                ...StoredSettings.accounts[0],
                priority: 1,
                "cache": {
                    "customFieldsIdToName": {},
                    "customFieldsNameToId": {},
                    "customFieldsType": {},
                    "jqlAutocomplete": {
                        "fields": [],
                        "functions": {},
                    },
                    "statusColor": {},
                },
            }],
            cache: { columns: [] }
        })
    })
    test('loadSettings clean cache', async () => {
        pluginMock.loadData.mockReturnValueOnce(deepCopy(StoredSettings))
        await settingTab.loadSettings()
        expect(SettingsData.cache.columns.length).toEqual(0)
    })
    test.todo('loadSettings legacy account migration')
    test.todo('saveSettings')
    test.todo('createNewEmptyAccount')
    test.todo('accountsConflictsFix')
    test.todo('createPriorityOptions')

    afterEach(() => {
        jest.clearAllMocks()
    })
})

export { }