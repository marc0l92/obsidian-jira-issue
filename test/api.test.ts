jest.mock('../src/client/jiraClient', () => {
    return {
        getIssue: jest.fn(),
        getSearchResults: jest.fn(),
        getDevStatus: jest.fn(),
        getLoggedUser: jest.fn(),
        getBoards: jest.fn(),
        getSprints: jest.fn(),
    }
})
jest.mock('../src/objectsCache', () => {
    return {
        get: jest.fn(),
        add: jest.fn(),
    }
})

import ObjectsCache from "../src/objectsCache"
import API from "../src/api/api"
import JiraClient from "../src/client/jiraClient"

const kProject = 'projectKey'
const kBoardId = 1234
const kBoard = { id: kBoardId }
const kSprintName = 'SprintName'
const kSprint = { id: 567, name: kSprintName }

describe('API', () => {
    describe('getActiveSprint', () => {
        test('requested board, requested sprint', async () => {
            (ObjectsCache.get as jest.MockedFunction<any>)
                .mockReturnValueOnce(null)
                .mockReturnValueOnce(null);
            (JiraClient.getBoards as jest.MockedFunction<any>).mockReturnValueOnce([kBoard]);
            (JiraClient.getSprints as jest.MockedFunction<any>).mockReturnValueOnce([kSprint]);

            expect(await API.jira.getActiveSprint(kProject)).toEqual(kSprint)

            expect(ObjectsCache.get).toBeCalledTimes(2)
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(1, expect.stringMatching(new RegExp(kProject)))
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(2, expect.stringMatching(new RegExp(kBoardId.toString())))
            expect(JiraClient.getBoards).toBeCalledTimes(1)
            expect(JiraClient.getBoards).toHaveBeenNthCalledWith(1, kProject, 1)
            expect(JiraClient.getSprints).toBeCalledTimes(1)
            expect(JiraClient.getSprints).toHaveBeenNthCalledWith(1, kBoardId, ['active'], 1)
        })
        // test('cached board, requested sprint', async () => {
        //     (ObjectsCache.get as jest.MockedFunction<any>)
        //         .mockReturnValueOnce({ data: [kBoard] })
        //         .mockReturnValueOnce(null);
        //     // (JiraClient.getBoards as jest.MockedFunction<any>).mockReturnValueOnce([]);
        //     (JiraClient.getSprints as jest.MockedFunction<any>).mockReturnValueOnce([kSprint]);

        //     expect(await API.jira.getActiveSprint(kProject)).toEqual(kSprint)
        // })
        // test('board not found', async () => {
        //     (ObjectsCache.get as jest.MockedFunction<any>).mockReturnValueOnce(null);
        //     (JiraClient.getBoards as jest.MockedFunction<any>).mockReturnValueOnce([]);
        //     // (JiraClient.getSprints as jest.MockedFunction<any>).mockReturnValueOnce([]);

        //     expect(await API.jira.getActiveSprint(kProject)).toEqual(null)
        // })
        // test.todo('board found, sprint not found')
    })

    describe('getActiveSprintName', () => {
        // test('not found', async () => {
        //     (ObjectsCache.get as jest.MockedFunction<any>).mockReturnValueOnce(null);
        //     (JiraClient.getBoards as jest.MockedFunction<any>).mockReturnValueOnce([]);

        //     expect(await API.jira.getActiveSprintName(kProject)).toEqual('')
        // })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})

export { }