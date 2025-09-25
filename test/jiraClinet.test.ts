import * as obsidian from 'obsidian'
import JiraClient from '../src/client/jiraClient'
import { TestAccountOpen } from './testData'

const kIssueKey = 'AAA-123'
const requestUrlMock = jest.spyOn(obsidian, 'requestUrl')
const defaultHeaders = { 'content-type': 'application/json' }

describe('JiraClient', () => {
    describe('Positive tests', () => {
        // test('getIssue minimal', async () => {
        //     requestUrlMock.mockReturnValue({ status: 200, json: {} } as any)
        //     expect(await JiraClient.getIssue(kIssueKey)).toEqual(true)
        //     expect(requestUrlMock.mock.calls[0][0]).toEqual({
        //         contentType: 'application/json',
        //         headers: {},
        //         method: 'GET',
        //         url: 'https://test-company.atlassian.net/rest/api/latest/project',
        //     })
        // })

        test('testConnection', async () => {
            requestUrlMock.mockReturnValue({ status: 200, headers: defaultHeaders, json: { issues: [] } } as any)
            expect(await JiraClient.testConnection(TestAccountOpen)).toEqual(true)
            expect(requestUrlMock.mock.calls[0][0]).toEqual({
                contentType: 'application/json',
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "obsidian-jira-issue-plugin",
                    "X-Atlassian-Token": "no-check",
                },
                method: 'GET',
                url: 'https://test-company.atlassian.net/rest/api/latest/project',
            })
        })
    })

    describe('Negative tests', () => {
        test('testConnection', async () => {
            expect.assertions(2)
            requestUrlMock.mockReturnValue({ status: 401, headers: defaultHeaders } as any)
            try {
                await JiraClient.testConnection(TestAccountOpen)
            } catch (e) {
                expect(e).toEqual(new Error(`Unauthorized: Please check your authentication credentials`))
                expect(requestUrlMock.mock.calls[0][0]).toEqual({
                    contentType: 'application/json',
                    headers: {
                        "Accept": "application/json",
                        "User-Agent": "obsidian-jira-issue-plugin",
                        "X-Atlassian-Token": "no-check",
                    },
                    method: 'GET',
                    url: 'https://test-company.atlassian.net/rest/api/latest/project',
                })
            }
        })
    })

    test.todo('getIssue')
    test.todo('getSearchResults')
    test.todo('updateStatusColorCache')
    test.todo('updateCustomFieldsCache')
    test.todo('getLoggedUser')
    test.todo('getDevStatus')

    afterEach(() => {
        jest.clearAllMocks()
    })
})

export { }