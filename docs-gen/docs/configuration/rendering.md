---
sidebar_position: 2
---
# Rendering

The rendering section of the plugin settings allows you to configure some visualization settings of the plugin.

## Default search results limit

This setting allows you to configure the default limit of search results displayed when using the `jira-search` fence.
You can override this setting in the `jira-search` fence by using the `limit` attribute.

[Read more...](/docs/components/jira-search)

## Dark mode

This setting allows you to enable the dark mode of the plugin.

Examples:

![light-mode1](/img/light-mode1.png)

![dark-mode1](/img/dark-mode1.png)

## Issue URL to tag

This settings allows you to enable the conversion of Jira issue URL to tags. The plugin looks for URL that are composed like:

```
<host>/browse/<issue-key>
```

Example:
```
https://my-project.jira.com/browse/ABCD-1234
```

## Inline issue prefix

This setting allows you to configure the prefix used to identify inline issues. Inline issues are composed by the prefix followed by the issue key.

Example:
```
JIRA:ABCD-711
```

The default value is `JIRA:`.
