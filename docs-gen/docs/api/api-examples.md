---
sidebar_position: 6
---
# API Examples

In this page collects some examples to use the API with other plugins of Obsidian community.

## Templater

Active sprint data
```md
<%* const projectKey = 'AAA' %>
Sprint Name: <%* tR += await $ji.macro.getActiveSprintName(projectKey) %>
Sprint Start: <%* tR += (await $ji.macro.getActiveSprint(projectKey)).startDate %>
Sprint End: <%* tR += (await $ji.macro.getActiveSprint(projectKey)).endDate %>
```

Loop on search results
````md
<%* const query = `project = "AAA" AND assignee = currentUser() AND resolution = Unresolved` %>
<%* const searchResults = await $ji.base.getSearchResults(query) %>
<%* for(const issue of searchResults.issues) { %>
## <%* tR += `${issue.key} - ${issue.fields.summary}` %>

Description
```
<%* tR += issue.fields.description %>
```
<%* } %>
````

