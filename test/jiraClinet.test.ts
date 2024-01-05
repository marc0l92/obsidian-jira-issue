import * as obsidian from 'obsidian'
import JiraClient from '../src/client/jiraClient'
import { TestAccountOpen } from './testData'

const kIssueKey = 'AAA-123'
const requestUrlMock = jest.spyOn(obsidian, 'requestUrl')

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
            requestUrlMock.mockReturnValue({ status: 200 } as any)
            expect(await JiraClient.testConnection(TestAccountOpen)).toEqual(true)
            expect(requestUrlMock.mock.calls[0][0]).toEqual({
                contentType: 'application/json',
                headers: {},
                method: 'GET',
                url: 'https://test-company.atlassian.net/rest/api/latest/project',
            })
        })
    })

    describe('Negative tests', () => {
        test('testConnection', async () => {
            expect.assertions(2)
            requestUrlMock.mockReturnValue({ status: 401 } as any)
            try {
                await JiraClient.testConnection(TestAccountOpen)
            } catch (e) {
                expect(e).toEqual(new Error(`HTTP status 401`))
                expect(requestUrlMock.mock.calls[0][0]).toEqual({
                    contentType: 'application/json',
                    headers: {},
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