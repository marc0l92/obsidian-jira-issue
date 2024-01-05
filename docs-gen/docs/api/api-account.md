---
sidebar_position: 6
---
# API Account

## getAccountByAlias
- `$ji.account.getAccountByAlias(alias: string)`

| Parameter | Required | Type | Default value | Description |
|-|-|-|-|-|
| alias | True | `string` | - | Alias of the account defined in the plugin settings |

Return value type: [`IJiraIssueAccountSettings`](https://github.com/marc0l92/obsidian-jira-issue/blob/master/src/interfaces/settingsInterfaces.ts#L47-L68)

## getAccountByHost
- `$ji.account.getAccountByHost(host: string)`

| Parameter | Required | Type | Default value | Description |
|-|-|-|-|-|
| host | True | `string` | - | Host of the account defined in the plugin settings |

Return value type: [`IJiraIssueAccountSettings`](https://github.com/marc0l92/obsidian-jira-issue/blob/master/src/interfaces/settingsInterfaces.ts#L47-L68)
