---
sidebar_position: 2
---
# API Base

This category contains all the functions to directly access the Jira API. You can find all the api description at the [official documentation page](https://developer.atlassian.com/cloud/jira/platform/rest).

The responses are cached in order to reduce the network load. You can clean the cache using [dedicated api](/docs/api/api-util#clearCache) or the [command](/docs/components/commands#clear-cache).

## getIssue
- `$ji.base.getIssue(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {})`

Retrieve all details related to an issue based on the key. Use the parameter `options.fields` to specify the list of fields you need, in order to reduce the Jira and network load.

| Parameter | Required | Type | Default value | Description |
|-|-|-|-|-|
| issueKey | True | `string` | - | Id or Key of the issue to retrieve |
| options.fields | False | `string[]` | Most of the fields | List of fields to retrieve |
| options.account | False | `IJiraIssueAccountSettings` | Automatically detect | Jira account to use. Use the [util api](/docs/api/api-util) to retrieve an account object. |

Return value type: [`Promise<IJiraIssue>`](https://github.com/marc0l92/obsidian-jira-issue/blob/master/src/interfaces/issueInterfaces.ts#L3-L79)

## getSearchResults
- `$ji.base.getSearchResults(query: string, options: { limit?: number, offset?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {})`

Execute a JQL query to get all the matching issues.

| Parameter | Required | Type | Default value | Description |
|-|-|-|-|-|
| query | True | `string` | - | JQL query to find the issues |
| options.limit | False | `number > 0` | Configured in Settings | Maximum number of issue to extract |
| options.fields | False | `string[]` | Most of the fields | List of fields to retrieve |
| options.account | False | `IJiraIssueAccountSettings` | Automatically detect | Jira account to use. Use the [util api](/docs/api/api-util) to retrieve an account object. |

Return value type: [`Promise<IJiraSearchResults>`](https://github.com/marc0l92/obsidian-jira-issue/blob/master/src/interfaces/issueInterfaces.ts#L107-L113)

## getDevStatus
- `$ji.base.getDevStatus(issueId: string, options: { account?: IJiraIssueAccountSettings } = {})`

Retrieve the pull requests open/merged/declined related to a user story.

This API works only if the version control software has been connected to your Jira account using OAuth2.
To check your the list of Authorized Application go to [`Profile > Tools > View OAuth Access Tokens`](https://community.atlassian.com/t5/Jira-questions/Where-does-JIRA-s-Authorized-Application-s-list-information/qaq-p/602471).

| Parameter | Required | Type | Default value | Description |
|-|-|-|-|-|
| issueId | True | `string` | - | Issue ID. The id can be found using the [getIssue](/docs/api/api-base#getIssue) API. |
| options.account | False | `IJiraIssueAccountSettings` | Automatically detect | Jira account to use. Use the [util api](/docs/api/api-util) to retrieve an account object. |

Return value type: [`Promise<IJiraDevStatus>`](https://github.com/marc0l92/obsidian-jira-issue/blob/master/src/interfaces/issueInterfaces.ts#L163-L202)

## getBoards
- `$ji.base.getBoards(projectKeyOrId: string, options: { limit?: number, offset?: number, account?: IJiraIssueAccountSettings } = {})`

Retrieve list of boards associated to a project.

| Parameter | Required | Type | Default value | Description |
|-|-|-|-|-|
| projectKeyOrId | True | `string` | - | Project key or numeric id |
| options.limit | False | `number > 0` | Configured in Settings | Maximum number of boards to extract |
| options.account | False | `IJiraIssueAccountSettings` | Automatically detect | Jira account to use. Use the [util api](/docs/api/api-util) to retrieve an account object. |

Return value type: [`Promise<IJiraBoard[]>`](https://github.com/marc0l92/obsidian-jira-issue/blob/master/src/interfaces/issueInterfaces.ts#L204-L208)

## getSprints
- `$ji.base.getSprints(boardId: number, options: { limit?: number, offset?: number, state?: ESprintState[], account?: IJiraIssueAccountSettings } = {})`

Retrieve list of sprints associated to a board.

| Parameter | Required | Type | Default value | Description |
|-|-|-|-|-|
| boardId | True | `number` | - | Board numeric id |
| options.limit | False | `number > 0` | Configured in Settings | Maximum number of sprints to extract |
| options.account | False | `IJiraIssueAccountSettings` | Automatically detect | Jira account to use. Use the [util api](/docs/api/api-util) to retrieve an account object. |

Return value type: [`Promise<IJiraSprint[]>`](https://github.com/marc0l92/obsidian-jira-issue/blob/master/src/interfaces/issueInterfaces.ts#L210-L220)

## getLoggedUser
- `$ji.base.getLoggedUser(account: IJiraIssueAccountSettings = null)`

Retrieve information related to the user associated to the credentials configured in the plugin settings.

| Parameter | Required | Type | Default value | Description |
|-|-|-|-|-|
| account | True | `IJiraIssueAccountSettings` | - | Jira account to use. Use the [util api](/docs/api/api-util) to retrieve an account object. |

Return value type: [`Promise<IJiraUser>`](https://github.com/marc0l92/obsidian-jira-issue/blob/master/src/interfaces/issueInterfaces.ts#L93-L105)
