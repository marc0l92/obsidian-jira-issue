---
sidebar_position: 2
---
# API Base

- `$ji.base.getIssue(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {})`
- `$ji.base.getSearchResults(query: string, options: { limit?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {})`
- `$ji.base.getDevStatus(issueId: string, options: { account?: IJiraIssueAccountSettings } = {})`
- `$ji.base.getBoards(projectKeyOrId: string, options: { limit?: number, account?: IJiraIssueAccountSettings } = {})`
- `$ji.base.getSprints(boardId: number, options: { limit?: number, state?: ESprintState[], account?: IJiraIssueAccountSettings } = {})`
- `$ji.base.getLoggedUser(account: IJiraIssueAccountSettings = null)`
