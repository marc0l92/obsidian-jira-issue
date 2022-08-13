---
sidebar_position: 3
---
# Jira Count

This fence component allows to insert a counter of the issues found as result of a jira query.

![jira-count1](/img/jira-count1.png)

This component may be used to monitor the progress of a project or to display statistics on a dashboard note.

Example:
````
```jira-count
project = REF AND status changed to (Done, "Won't Fix", Archived, "Can't Reproduce", "PM Validated") after -14d
```
````

:::info
This feature is quite basic, if you have any ideas on how to improve it feel free to [open an issue](https://github.com/marc0l92/obsidian-jira-issue/issues/new) about it.
:::
