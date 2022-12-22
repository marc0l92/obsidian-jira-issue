import { getAccountByAlias, getAccountByHost } from "src/utils"
import JiraClient from "../client/jiraClient"

export default {
    jiraClient: {
        getIssue: JiraClient.getIssue,
        getSearchResults: JiraClient.getSearchResults,
        getDevStatus: JiraClient.getDevStatus,
        getLoggedUser: JiraClient.getLoggedUser,
    },
    accounts: {
        getAccountByAlias: getAccountByAlias,
        getAccountByHost: getAccountByHost,
    }
}
