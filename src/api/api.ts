import { getAccountByAlias, getAccountByHost } from "../utils"
import JiraClient from "../client/jiraClient"
import ObjectsCache from "../objectsCache"
import { getActiveSprint, getActiveSprintName, getWorkLogByDates, getWorkLogBySprint } from "./apiMacro"
import { getDefaultedSearchResults, getIssueDefaulted } from "./apiDefaulted"

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
        getActiveSprint: getActiveSprint,
        getActiveSprintName: getActiveSprintName,
        getWorkLogBySprint: getWorkLogBySprint,
        getWorkLogByDates: getWorkLogByDates,
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
