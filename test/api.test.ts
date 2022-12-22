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

const kIssueKey = 'AAA-123'
const kIssue = { key: kIssueKey }
const kSearchQuery = 'key=AAA-123'
const kSearchResults = { issues: [kIssue] }
const kProject = 'projectKey'
const kBoardId = 1234
const kBoard = { id: kBoardId }
const kSprintName = 'SprintName'
const kSprint = { id: 567, name: kSprintName }

describe('API', () => {

    describe('defaulted', () => {
        test('getIssue', async () => {
            (JiraClient.getIssue as jest.MockedFunction<any>).mockReturnValue(kIssue);

            const baseIssue = await API.base.getIssue(kIssueKey)
            const defaultedIssue = await API.defaulted.getIssue(kIssueKey)

            expect(baseIssue).toEqual(kIssue)
            expect(defaultedIssue.id).toEqual('')
            expect(defaultedIssue.fields.assignee.displayName).toEqual('')
        })
        test('getSearchResults', async () => {
            (JiraClient.getSearchResults as jest.MockedFunction<any>).mockReturnValue(kSearchResults);

            const baseSearchResults = await API.base.getSearchResults(kSearchQuery)
            const defaultedSearchResults = await API.defaulted.getSearchResults(kSearchQuery)

            expect(baseSearchResults).toEqual(kSearchResults)
            expect(defaultedSearchResults.issues[0].id).toEqual('')
            expect(defaultedSearchResults.issues[0].fields.assignee.displayName).toEqual('')
        })
    })

    describe('getActiveSprint', () => {
        test('requested board, requested sprint', async () => {
            (ObjectsCache.get as jest.MockedFunction<any>)
                .mockReturnValueOnce(null)
                .mockReturnValueOnce(null);
            (JiraClient.getBoards as jest.MockedFunction<any>).mockReturnValueOnce([kBoard]);
            (JiraClient.getSprints as jest.MockedFunction<any>).mockReturnValueOnce([kSprint]);

            expect(await API.macro.getActiveSprint(kProject)).toEqual(kSprint)

            expect(ObjectsCache.get).toBeCalledTimes(2)
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(1, expect.stringMatching(new RegExp(kProject)))
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(2, expect.stringMatching(new RegExp(kBoardId.toString())))
            expect(ObjectsCache.add).toBeCalledTimes(2)
            expect(ObjectsCache.add).toHaveBeenNthCalledWith(1, expect.stringMatching(new RegExp(kProject)), [kBoard])
            expect(ObjectsCache.add).toHaveBeenNthCalledWith(2, expect.stringMatching(new RegExp(kBoardId.toString())), [kSprint])
            expect(JiraClient.getBoards).toBeCalledTimes(1)
            expect(JiraClient.getBoards).toHaveBeenNthCalledWith(1, kProject, 1)
            expect(JiraClient.getSprints).toBeCalledTimes(1)
            expect(JiraClient.getSprints).toHaveBeenNthCalledWith(1, kBoardId, ['active'], 1)
        })
        test('cached board, requested sprint', async () => {
            (ObjectsCache.get as jest.MockedFunction<any>)
                .mockReturnValueOnce({ data: [kBoard] })
                .mockReturnValueOnce(null);
            (JiraClient.getSprints as jest.MockedFunction<any>).mockReturnValueOnce([kSprint]);

            expect(await API.macro.getActiveSprint(kProject)).toEqual(kSprint)

            expect(ObjectsCache.get).toBeCalledTimes(2)
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(1, expect.stringMatching(new RegExp(kProject)))
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(2, expect.stringMatching(new RegExp(kBoardId.toString())))
            expect(ObjectsCache.add).toBeCalledTimes(1)
            expect(ObjectsCache.add).toHaveBeenNthCalledWith(1, expect.stringMatching(new RegExp(kBoardId.toString())), [kSprint])
            expect(JiraClient.getBoards).not.toBeCalled()
            expect(JiraClient.getSprints).toBeCalledTimes(1)
            expect(JiraClient.getSprints).toHaveBeenNthCalledWith(1, kBoardId, ['active'], 1)
        })
        test('cached board, cached sprint', async () => {
            (ObjectsCache.get as jest.MockedFunction<any>)
                .mockReturnValueOnce({ data: [kBoard] })
                .mockReturnValueOnce({ data: [kSprint] });

            expect(await API.macro.getActiveSprint(kProject)).toEqual(kSprint)

            expect(ObjectsCache.get).toBeCalledTimes(2)
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(1, expect.stringMatching(new RegExp(kProject)))
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(2, expect.stringMatching(new RegExp(kBoardId.toString())))
            expect(ObjectsCache.add).not.toBeCalled()
            expect(JiraClient.getBoards).not.toBeCalled()
            expect(JiraClient.getSprints).not.toBeCalled()
        })
        test('board not found', async () => {
            (ObjectsCache.get as jest.MockedFunction<any>).mockReturnValueOnce(null);
            (JiraClient.getBoards as jest.MockedFunction<any>).mockReturnValueOnce([]);

            expect(await API.macro.getActiveSprint(kProject)).toEqual(null)

            expect(ObjectsCache.get).toBeCalledTimes(1)
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(1, expect.stringMatching(new RegExp(kProject)))
            expect(ObjectsCache.add).toBeCalledTimes(1)
            expect(ObjectsCache.add).toHaveBeenNthCalledWith(1, expect.stringMatching(new RegExp(kProject)), [])
            expect(JiraClient.getBoards).toBeCalledTimes(1)
            expect(JiraClient.getBoards).toHaveBeenNthCalledWith(1, kProject, 1)
            expect(JiraClient.getSprints).not.toBeCalled()
        })
        test('board found, sprint not found', async () => {
            (ObjectsCache.get as jest.MockedFunction<any>).mockReturnValueOnce(null).mockReturnValueOnce(null);
            (JiraClient.getBoards as jest.MockedFunction<any>).mockReturnValueOnce([kBoard]);
            (JiraClient.getSprints as jest.MockedFunction<any>).mockReturnValueOnce([]);

            expect(await API.macro.getActiveSprint(kProject)).toEqual(null)

            expect(ObjectsCache.get).toBeCalledTimes(2)
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(1, expect.stringMatching(new RegExp(kProject)))
            expect(ObjectsCache.get).toHaveBeenNthCalledWith(2, expect.stringMatching(new RegExp(kBoardId.toString())))
            expect(ObjectsCache.add).toBeCalledTimes(2)
            expect(ObjectsCache.add).toHaveBeenNthCalledWith(1, expect.stringMatching(new RegExp(kProject)), [kBoard])
            expect(ObjectsCache.add).toHaveBeenNthCalledWith(2, expect.stringMatching(new RegExp(kBoardId.toString())), [])
            expect(JiraClient.getBoards).toBeCalledTimes(1)
            expect(JiraClient.getBoards).toHaveBeenNthCalledWith(1, kProject, 1)
            expect(JiraClient.getSprints).toBeCalledTimes(1)
            expect(JiraClient.getSprints).toHaveBeenNthCalledWith(1, kBoardId, ['active'], 1)
        })
    })

    describe('getActiveSprintName', () => {
        test('found', async () => {
            (ObjectsCache.get as jest.MockedFunction<any>)
                .mockReturnValueOnce({ data: [kBoard] })
                .mockReturnValueOnce({ data: [kSprint] });

            expect(await API.macro.getActiveSprintName(kProject)).toEqual(kSprintName)
        })
        test('not found', async () => {
            (ObjectsCache.get as jest.MockedFunction<any>).mockReturnValueOnce(null);
            (JiraClient.getBoards as jest.MockedFunction<any>).mockReturnValueOnce([]);

            expect(await API.macro.getActiveSprintName(kProject)).toEqual('')
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})

export { }