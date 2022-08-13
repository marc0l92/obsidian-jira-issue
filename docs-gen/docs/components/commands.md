# Commands

It is possible to access the plugin commands using the Obsidian.md command palette.
The all the plugin commands are described in this page.

## Insert template

The plugin provides a set of commands to insert a template of each component in case you forget the syntax of them.

- Insert issue template
- Insert search template
- Insert count template

## Clear cache

Every time a request is performed to the Jira server, the response is cached in order to reduce the network interactions and speedup the note rendering.

An item stored in the cache is automatically deleted after its expiration time that can be configured in the plugin settings. [See more](/docs/configuration/advanced#cache-time)

It is possible to force the cache clean up using the `Clear cache` command.

Changing the plugin settings will automatically clean the cache.

## Search wizard

The [jira-search](/docs/components/jira-search) component allows to create advanced search block that display the results of a Jira query.

The `search wizard` command allows to create a search block without having to remember the name of each section because it provides a UI to insert them.

![searchWizard](/img/searchWizard.png)
