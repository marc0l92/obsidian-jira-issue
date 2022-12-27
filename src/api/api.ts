import { getAccountByAlias, getAccountByHost } from "../utils"
import ObjectsCache from "../objectsCache"
import { getActiveSprint, getActiveSprintName, getVelocity, getWorkLogByDates, getWorkLogBySprint, getWorkLogBySprintId, getWorkLogByUser } from "./apiMacro"
import { getDefaultedSearchResults, getIssueDefaulted } from "./apiDefaulted"
import { getWorklogPerDay, getWorklogPerUser } from "./apiChart"
import { getBoards, getDevStatus, getIssue, getLoggedUser, getSearchResults, getSprint, getSprints } from "./apiBase"

const API = {
    base: {
        getIssue: getIssue,
        getSearchResults: getSearchResults,
        getDevStatus: getDevStatus,
        getBoards: getBoards,
        getSprint: getSprint,
        getSprints: getSprints,
        getLoggedUser: getLoggedUser,
    },
    defaulted: {
        getIssue: getIssueDefaulted,
        getSearchResults: getDefaultedSearchResults,
    },
    macro: {
        getActiveSprint: getActiveSprint,
        getActiveSprintName: getActiveSprintName,
        getWorkLogBySprint: getWorkLogBySprint,
        getWorkLogBySprintId: getWorkLogBySprintId,
        getWorkLogByDates: getWorkLogByDates,
        getWorkLogByUser: getWorkLogByUser,
        getVelocity: getVelocity,
    },
    chart: {
        getWorklogPerDay: getWorklogPerDay,
        getWorklogPerUser: getWorklogPerUser,
    },
    account: {
        getAccountByAlias: getAccountByAlias,
        getAccountByHost: getAccountByHost,
    },
    util: {
        clearCache: ObjectsCache.clear
    },
}

export default API
