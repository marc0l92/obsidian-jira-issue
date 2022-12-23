---
sidebar_position: 2
---
# API Base

## getIssue
- `$ji.base.getIssue(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {})`
## getSearchResults
- `$ji.base.getSearchResults(query: string, options: { limit?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {})`
## getDevStatus
- `$ji.base.getDevStatus(issueId: string, options: { account?: IJiraIssueAccountSettings } = {})`
## getBoards
- `$ji.base.getBoards(projectKeyOrId: string, options: { limit?: number, account?: IJiraIssueAccountSettings } = {})`
## getSprints
- `$ji.base.getSprints(boardId: number, options: { limit?: number, state?: ESprintState[], account?: IJiraIssueAccountSettings } = {})`
## getLoggedUser
- `$ji.base.getLoggedUser(account: IJiraIssueAccountSettings = null)`
