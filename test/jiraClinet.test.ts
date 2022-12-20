import JiraClient from '../src/client/jiraClient'

jest.mock('obsidian')
jest.mock('../src/settings', () => jest.requireActual('./__mocks__/settings').default)

describe('JiraClient', () => {
    beforeEach(() => {
        JiraClient.getIssue('')
    })

    test.todo('Define tests')
})

export { }