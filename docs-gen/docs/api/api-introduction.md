---
sidebar_position: 1
---
# API Introduction

The plugin exposes some API that can be used by other plugins that provide JavaScript access.

Some of the plugin that are compatible with those API are:
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview)
- [Templater](https://github.com/SilentVoid13/Templater)
- [Obsidian Chart](https://github.com/phibr0/obsidian-charts)

It is possible to access the API using the plugin reference
```js
this.app.plugins.plugins['obsidian-jira-issue'].api
```

or the global variable:
```js
$ji
```


## API Categories

The API are divided in few categories to help the navigation.

### API Category - Base
This category contains all the functions to directly access the Jira API.
The response is cached in order to reduce the network load.

- `$ji.base.getIssue(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {})`
- `$ji.base.getSearchResults(query: string, options: { limit?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {})`
- `$ji.base.getDevStatus(issueId: string, options: { account?: IJiraIssueAccountSettings } = {})`
- `$ji.base.getBoards(projectKeyOrId: string, options: { limit?: number, account?: IJiraIssueAccountSettings } = {})`
- `$ji.base.getSprints(boardId: number, options: { limit?: number, state?: ESprintState[], account?: IJiraIssueAccountSettings } = {})`
- `$ji.base.getLoggedUser(account: IJiraIssueAccountSettings = null)`

### API Category - Defaulted
This category contains few functions to directly access the Jira API. The difference with the [Base](#api-category---base) section is the format of the response where all the fields have been set to a default value in case the Jira API call replied with some missing data. This type of API allows you to simplify the data access because you don't need to check if the fields exists.


- `$ji.defaulted.getIssue(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {})`
- `$ji.defaulted.getSearchResults(query: string, options: { limit?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {})`

### API Category - Macro

This category contains functions that perform few Jira API call to get some advanced information. This category is designed to help the user access some data with few steps.

Please open an Issue on GitHub to request more of this functions.

- `$ji.macro.getActiveSprint(projectKeyOrId: string)`
- `$ji.macro.getActiveSprintName(projectKeyOrId: string)`
- `$ji.macro.getWorkLogBySprint(projectKeyOrId: string, sprint: IJiraSprint)`
- `$ji.macro.getWorkLogByDates(projectKeyOrId: string, startDate: string, endDate: string = 'now()')`

### API Category - Account

This category contains functions to access the accounts data stored in the Obsidian settings of this plugin.

- `$ji.account.getAccountByAlias(alias: string)`
- `$ji.account.getAccountByHost(host: string)`

### API Category - Util

This category contains generic functions.

- `$ji.util.clearCache()`
