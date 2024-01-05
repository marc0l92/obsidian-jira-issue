---
sidebar_position: 4
---
# Advanced configuration
Other plugin settings.

## Cache time
To speed up the issues rendering and reduce the network usage, the plugin relies on a in-memory cache.

The cache stores the issues data and the JQL search results.
Every time a component is rendered, the plugin first check if the data is available in the cache and if not, it retrieves the data from the Jira server.

The items stored in the in-memory cache have an expiration date in order to periodically download updated information on the issues status and the search results. The default value is `15m`.

The syntax used to fill this field must be compatible with the [JavaScript library ms](https://github.com/vercel/ms#readme).

Examples

|Example|Description|
|-|-|
|`5s`|5 seconds|
|`1m`|1 minute|
|`2h`|2 hours|
|`1d`|1 day|

## Debug mode
In order to help users debug authentication issues and provide useful information when submitting new Issues on GitHub, the plugin provides a way to increase the debug information in the Obsidian.md console.

The `Log Requests and Responses` option allow to display in the console all the request and responses exchanged with the Jira Server.
