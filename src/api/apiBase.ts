import { ESprintState, IJiraBoard, IJiraDevStatus, IJiraIssue, IJiraSearchResults, IJiraSprint, IJiraUser } from "../interfaces/issueInterfaces"
import { IJiraIssueAccountSettings } from "../interfaces/settingsInterfaces"
import ObjectsCache from "../objectsCache"
import JiraClient from "../client/jiraClient"

type InferArgs<T> = T extends (...t: [...infer Arg]) => any ? Arg : never
type InferReturn<T> = T extends (...t: [...infer Arg]) => infer Res ? Res : never

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

export async function getIssue(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {}): Promise<IJiraIssue> {
    return cacheWrapper(JiraClient.getIssue)(issueKey, options)
}

export async function getSearchResults(query: string, options: { limit?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {}): Promise<IJiraSearchResults> {
    return cacheWrapper(JiraClient.getSearchResults)(query, options)
}

export async function getDevStatus(issueId: string, options: { account?: IJiraIssueAccountSettings } = {}): Promise<IJiraDevStatus> {
    return cacheWrapper(JiraClient.getDevStatus)(issueId, options)
}

export async function getBoards(projectKeyOrId: string, options: { limit?: number, account?: IJiraIssueAccountSettings } = {}): Promise<IJiraBoard[]> {
    return cacheWrapper(JiraClient.getBoards)(projectKeyOrId, options)
}

export async function getSprint(sprintId: number, options: { account?: IJiraIssueAccountSettings } = {}): Promise<IJiraSprint> {
    return cacheWrapper(JiraClient.getSprint)(sprintId, options)
}

export async function getSprints(boardId: number, options: { limit?: number, state?: ESprintState[], account?: IJiraIssueAccountSettings } = {}): Promise<IJiraSprint[]> {
    return cacheWrapper(JiraClient.getSprints)(boardId, options)
}

export async function getLoggedUser(account: IJiraIssueAccountSettings = null): Promise<IJiraUser> {
    return cacheWrapper(JiraClient.getLoggedUser)(account)
}
