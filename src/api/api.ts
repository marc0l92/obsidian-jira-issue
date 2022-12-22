import { getAccountByAlias, getAccountByHost } from "../utils"
import JiraClient from "../client/jiraClient"
import { ESprintState, IJiraSprint } from "src/interfaces/issueInterfaces"
import ObjectsCache from "../objectsCache"

const API = {
    jira: {
        getIssue: JiraClient.getIssue,
        getSearchResults: JiraClient.getSearchResults,
        getDevStatus: JiraClient.getDevStatus,
        getLoggedUser: JiraClient.getLoggedUser,
        getBoards: JiraClient.getBoards,
        getSprints: JiraClient.getSprints,
        getActiveSprint: async (projectKeyOrId: string): Promise<IJiraSprint> => {
            const boards = await JiraClient.getBoards(projectKeyOrId, 1)
            if (boards.length > 0) {
                const sprints = await JiraClient.getSprints(boards[0].id, [ESprintState.ACTIVE], 1)
                if (sprints.length > 0) {
                    return sprints[0]
                }
            }
            return null
        },
        getActiveSprintName: async (projectKeyOrId: string): Promise<string> => {
            const sprint = await API.jira.getActiveSprint(projectKeyOrId)
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
