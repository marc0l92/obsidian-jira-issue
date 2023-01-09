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

### API Category - [Base](/docs/api/api-base)
This category contains all the functions to directly access the Jira API.

The responses are cached in order to reduce the network load.

- [`$ji.base.getIssue(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {})`](/docs/api/api-base#getIssue)
- [`$ji.base.getSearchResults(query: string, options: { limit?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {})`](/docs/api/api-base#getSearchResults)
- [`$ji.base.getDevStatus(issueId: string, options: { account?: IJiraIssueAccountSettings } = {})`](/docs/api/api-base#getDevStatus)
- [`$ji.base.getBoards(projectKeyOrId: string, options: { limit?: number, account?: IJiraIssueAccountSettings } = {})`](/docs/api/api-base#getBoards)
- [`$ji.base.getSprint(sprintId: number, options: { account?: IJiraIssueAccountSettings } = {})`](/docs/api/api-base#getSprint)
- [`$ji.base.getSprints(boardId: number, options: { limit?: number, state?: ESprintState[], account?: IJiraIssueAccountSettings } = {})`](/docs/api/api-base#getSprints)
- [`$ji.base.getLoggedUser(account: IJiraIssueAccountSettings = null)`](/docs/api/api-base#getLoggedUser)

### API Category - [Defaulted](/docs/api/api-defaulted)
This category contains few functions to directly access the Jira API.

The difference with the [Base](#api-category---base) section is the format of the response where all the fields have been set to a default value in case the Jira API call replied with some missing data. This type of API allows you to simplify the data access because you don't need to check if the fields exists.

The responses are cached in order to reduce the network load.


- [`$ji.defaulted.getIssue(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {})`](/docs/api/api-defaulted#getIssue)
- [`$ji.defaulted.getSearchResults(query: string, options: { limit?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {})`](/docs/api/api-defaulted#getSearchResults)

### API Category - [Macro](/docs/api/api-macro)

This category contains functions that perform few Jira API call to get some advanced information. This category is designed to help the user access some data with few steps.

Please open an Issue on GitHub to request more of this functions.

The responses are cached in order to reduce the network load.

- [`$ji.macro.getActiveSprint(projectKeyOrId: string)`](/docs/api/api-macro#getActiveSprint)
- [`$ji.macro.getActiveSprintName(projectKeyOrId: string)`](/docs/api/api-macro#getActiveSprintName)
- [`$ji.macro.getWorkLogBySprint(projectKeyOrId: string, sprint: IJiraSprint)`](/docs/api/api-macro#getWorkLogBySprint)
- [`$ji.macro.getWorkLogBySprintId(projectKeyOrId: string, sprintId: number)`](/docs/api/api-macro#getWorkLogBySprintId)
- [`$ji.macro.getWorkLogByDates(projectKeyOrId: string, startDate: string, endDate: string = 'now()')`](/docs/api/api-macro#getWorkLogByDates)
- [`$ji.macro.getWorkLogSeriesByUser(projectKeyOrId: string, startDate: string, endDate: string = 'now()')`](/docs/api/api-macro#getWorkLogSeriesByUser)
- [`$ji.macro.getVelocity(projectKeyOrId: string, sprintId: number, storyPointFieldName: string = 'aggregatetimeoriginalestimate')`](/docs/api/api-macro#getVelocity)

### API Category - [Chart](/docs/api/api-chart)

This category contains functions to generate charts using the community plugin [Obsidian-Charts](https://github.com/phibr0/obsidian-charts).

- [`$ji.chart.getWorklogPerDay(projectKeyOrId: string, startDate: string, endDate: string = 'now()')`](/docs/api/api-chart#getWorklogPerDay)
- [`$ji.chart.getWorklogPerUser(projectKeyOrId: string, startDate: string, endDate: string = 'now()', options: { format?: EChartFormat, capacity?: ISeries } = {})`](/docs/api/api-chart#getWorklogPerUser)

### API Category - [Account](/docs/api/api-account)

This category contains functions to access the accounts data stored in the Obsidian settings of this plugin.

- [`$ji.account.getAccountByAlias(alias: string)`](/docs/api/api-account#getAccountByAlias)
- [`$ji.account.getAccountByHost(host: string)`](/docs/api/api-account#getAccountByHost)

### API Category - [Util](/docs/api/api-util)

This category contains generic functions.

- [`$ji.util.clearCache()`](/docs/api/api-util#clearCache)
