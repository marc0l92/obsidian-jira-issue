import JiraClient from "../client/jiraClient"
import { IJiraIssue, IJiraSearchResults, toDefaultedIssue } from "../interfaces/issueInterfaces"
import { IJiraIssueAccountSettings } from "../interfaces/settingsInterfaces"

export async function getIssueDefaulted(issueKey: string, fields: string[] = [], account: IJiraIssueAccountSettings = null): Promise<IJiraIssue> {
    return toDefaultedIssue(await JiraClient.getIssue(issueKey, fields, account))
}

export async function getDefaultedSearchResults(query: string, limit: number = 50, fields: string[] = [], account: IJiraIssueAccountSettings = null): Promise<IJiraSearchResults> {
    const searchResults = await JiraClient.getSearchResults(query, limit, fields, account)
    if (searchResults && searchResults.issues) {
        searchResults.issues = searchResults.issues.map(toDefaultedIssue)
    }
    return searchResults
}