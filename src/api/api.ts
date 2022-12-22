import { getAccountByAlias, getAccountByHost } from "../utils"
import JiraClient from "../client/jiraClient"
import { ESprintState, IJiraIssue, IJiraSearchResults, IJiraSprint, toDefaultedIssue } from "../interfaces/issueInterfaces"
import ObjectsCache from "../objectsCache"
import { IJiraIssueAccountSettings } from "src/interfaces/settingsInterfaces";

type InferArgs<T> = T extends (...t: [...infer Arg]) => any ? Arg : never;
type InferReturn<T> = T extends (...t: [...infer Arg]) => infer Res ? Res : never;

function cacheWrapper<TFunc extends (...args: any[]) => any>(func: TFunc)
    : (...args: InferArgs<TFunc>) => InferReturn<TFunc> {
    return (...args: InferArgs<TFunc>) => {
        const cacheKey = `api-${func.name}-${JSON.stringify(args)}`
        const cacheVal = ObjectsCache.get(cacheKey)
        if (cacheVal) {
            return cacheVal.data
        }
        const returnValue = func(...args)
        ObjectsCache.add(cacheKey, returnValue)
        return returnValue
    }
}

async function getIssueDefaulted(issueKey: string, account: IJiraIssueAccountSettings = null): Promise<IJiraIssue> {
    return toDefaultedIssue(await JiraClient.getIssue(issueKey, account))
}

async function getDefaultedSearchResults(query: string, limit: number = 50, account: IJiraIssueAccountSettings = null): Promise<IJiraSearchResults> {
    const searchResults = await JiraClient.getSearchResults(query, limit, account)
    if (searchResults && searchResults.issues) {
        searchResults.issues = searchResults.issues.map(toDefaultedIssue)
    }
    return searchResults
}

const API = {
    base: {
        getIssue: cacheWrapper(JiraClient.getIssue),
        getSearchResults: cacheWrapper(JiraClient.getSearchResults),
        getDevStatus: cacheWrapper(JiraClient.getDevStatus),
        getLoggedUser: cacheWrapper(JiraClient.getLoggedUser),
        getBoards: cacheWrapper(JiraClient.getBoards),
        getSprints: cacheWrapper(JiraClient.getSprints),
    },
    defaulted: {
        getIssue: cacheWrapper(getIssueDefaulted),
        getSearchResults: cacheWrapper(getDefaultedSearchResults),
    },
    macro: {
        getActiveSprint: async (projectKeyOrId: string): Promise<IJiraSprint> => {
            const boards = await API.base.getBoards(projectKeyOrId, 1)
            if (boards.length > 0) {
                const sprints = await API.base.getSprints(boards[0].id, [ESprintState.ACTIVE], 1)
                if (sprints.length > 0) {
                    return sprints[0]
                }
            }
            return null
        },
        getActiveSprintName: async (projectKeyOrId: string): Promise<string> => {
            const sprint = await API.macro.getActiveSprint(projectKeyOrId)
            return sprint ? sprint.name : ''
        },
    },
    cache: {
        clear: ObjectsCache.clear
    },
    accounts: {
        getAccountByAlias: getAccountByAlias,
        getAccountByHost: getAccountByHost,
    }
}

export default API
