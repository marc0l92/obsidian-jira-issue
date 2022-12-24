import JiraClient from "../client/jiraClient"
import { IJiraIssue, IJiraSearchResults, toDefaultedIssue } from "../interfaces/issueInterfaces"
import { IJiraIssueAccountSettings } from "../interfaces/settingsInterfaces"

export async function getIssueDefaulted(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {}): Promise<IJiraIssue> {
    return toDefaultedIssue(await JiraClient.getIssue(issueKey, options))
}

export async function getDefaultedSearchResults(query: string, options: { limit?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {}): Promise<IJiraSearchResults> {
    const searchResults = await JiraClient.getSearchResults(query, options)
    if (searchResults && searchResults.issues) {
        searchResults.issues = searchResults.issues.map(toDefaultedIssue)
    }
    return searchResults
}