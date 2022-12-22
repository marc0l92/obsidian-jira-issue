jest.mock('obsidian')
jest.mock('../src/settings', () => jest.requireActual('./__mocks__/settings').default)

import { DEFAULT_ACCOUNT } from '../src/settings'
import JiraClient from '../src/client/jiraClient'

describe('JiraClient', () => {
    beforeEach(() => {
    })

    test.todo('getIssue')
    test.todo('getSearchResults')
    test.todo('updateStatusColorCache')
    test.todo('updateCustomFieldsCache')
    test('testConnection', async () => {
        // requestUrl.mock
        // expect(await JiraClient.testConnection(DEFAULT_ACCOUNT)).toEqual(true)
    })
    test.todo('getLoggedUser')
    test.todo('getDevStatus')

    afterEach(() => {
        jest.clearAllMocks()
    })
})

export { }