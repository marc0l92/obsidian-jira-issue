import { IJiraAutocompleteDataField } from "src/interfaces/issueInterfaces"
import { EAuthenticationTypes, IJiraIssueSettings } from "../../src/interfaces/settingsInterfaces"

const kEmptyAccountCache = {
    customFieldsIdToName: {},
    customFieldsNameToId: {},
    customFieldsType: {},
    jqlAutocomplete: {
        fields: [] as IJiraAutocompleteDataField[],
        functions: {},
    },
    statusColor: {},
}

export const TestAccountOpen = {
    alias: 'alias1',
    host: 'host1',
    authenticationType: EAuthenticationTypes.OPEN,
    priority: 1,
    color: '#123456',
    cache: kEmptyAccountCache
}

export const TestAccountBasic = {
    alias: 'alias2',
    host: 'host2',
    authenticationType: EAuthenticationTypes.BASIC,
    username: 'username2',
    password: 'password2',
    priority: 2,
    color: '#789012',
    cache: kEmptyAccountCache
}

export default {
    SettingsData: {
        accounts: [
            TestAccountOpen,
            TestAccountBasic,
        ],
        apiBasePath: '/rest/api/latest',
        cacheTime: '15m',
        searchResultsLimit: 10,
        cache: {
            columns: ['CUSTOM1', '12345'],
        },
        darkMode: false,
        inlineIssueUrlToTag: true,
        inlineIssuePrefix: 'JIRA:',
        showColorBand: true,
        searchColumns: [
        ],
        logRequestsResponses: false,
    } as IJiraIssueSettings
}
