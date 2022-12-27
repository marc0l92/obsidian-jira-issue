---
sidebar_position: 3
---
# API Defaulted

This category contains few functions to directly access the Jira API.

The difference with the [Base](/docs/api/api-base) section is the format of the response where all the fields have been set to a default value in case the Jira API call replied with some missing data. This type of API allows you to simplify the data access because you don't need to check if the fields exists.

The responses are cached in order to reduce the network load. You can clean the cache using [dedicated api](/docs/api/api-util#clearCache) or the [command](/docs/components/commands#clear-cache).

## getIssue
- `$ji.defaulted.getIssue(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {})`

Read [$ji.base.getIssue](/docs/api/api-base#getIssue)

## getSearchResults
- `$ji.defaulted.getSearchResults(query: string, options: { limit?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {})`

Read [$ji.base.getSearchResults](/docs/api/api-base#getSearchResults)
