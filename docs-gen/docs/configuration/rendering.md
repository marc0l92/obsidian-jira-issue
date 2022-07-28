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

:::info

Work in progress

:::

## Inline issue prefix

This setting allows you to configure the prefix used to identify inline issues. Inline issues are composed by the prefix followed by the issue key.

Example:
```
JIRA:AMQCPP-711
```

The default value is `JIRA:`.