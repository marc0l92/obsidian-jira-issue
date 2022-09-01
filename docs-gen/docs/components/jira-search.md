---
sidebar_position: 2
---
# Jira Search

This fence component allows to insert a table that displays the results of a Jira query.
The syntax to write the query is described in the official JQL Documentation.

## Basic usage

The basic usage of this block is to put the query directly in the fence. Example:

````
```jira-search
resolution = Unresolved AND assignee = currentUser() AND status = 'In Progress' order by priority DESC
```
````

The columns displayed in the table can be configured in the settings. [See more](/docs/configuration/search-default-columns)

## Advanced usage

It is possible to describe in each jira-search fence how the search results are rendered using the following keyworkds:

| Keyword | Description | Default | Values |
| :- | :- | :- | :- |
| `type` | Rendering mode of the search results | `TABLE` | `TABLE` or `LIST` |
| `query` | Query to use with Jira to retrieve the results |  |  |
| `limit` | Maximum number of items to display | Use value from settings | Integer number |
| `columns` | List of columns to render ([Available columns](#standard-columns)) | Use value from settings | Comma separated list |

Example:

````
```jira-search
type: TABLE
query: status = 'In Progress' order by priority DESC
limit: 15
columns: KEY, SUMMARY, -ASSIGNEE, -REPORTER, STATUS
```
````

## Standard fields

The plugin is able to render as columns the following Jira standard fields:

```
KEY, SUMMARY, TYPE, CREATED, UPDATED, REPORTER, ASSIGNEE, PRIORITY, STATUS, DUE_DATE,
RESOLUTION, RESOLUTION_DATE, PROJECT, ENVIRONMENT, LABELS, FIX_VERSIONS, COMPONENTS,
AGGREGATE_TIME_ESTIMATE, AGGREGATE_TIME_ORIGINAL_ESTIMATE, AGGREGATE_TIME_SPENT,
TIME_ESTIMATE, TIME_ORIGINAL_ESTIMATE, TIME_SPENT, AGGREGATE_PROGRESS, PROGRESS, LAST_VIEWED
```

- Columns names are case insensitive
- If the column starts with `-`, the compact mode is used

Example:
````
```jira-search
query: status = 'In Progress' order by priority DESC
columns: key, -key, type, -type, reporter, -reporter, created, -created
```
````
![Compact Columns](/img/compactColumns.png)

## Custom fields

Jira non standard fields (a.k.a. custom fields) can be inserted using the `$` symbol.

Example:
````
```jira-search
query: status = 'In Progress' order by priority DESC
columns: key, summary, $Epic Link, $Global Rank, $12313422, -$12313499
```
````

It is possible to provide the ID number of the custom field or its name.

## Link to notes
The special column `NOTES` can be used with `jira-search` tables to create a column that shows all the notes that start with the issue key.

Example:
````
```jira-search
query: status = 'In Progress' order by priority DESC
columns: key, summary, status, notes
```
````

![Notes Column](/img/notesColumn.png)

This column is useful to connect the issues with your notes about them. The note title must start with the issue key but it can also contains other letters after that.
Examples:
```
AAA-123
AAA-123 User story summary
AAA-123 Custom string
```
If no notes are found, a `➕` button will be shown in order to allow the creation of a new note directly from this table.

### Frontmatter

You can also access the frontmatter section of the linked notes using the [jsonpath](https://github.com/dchester/jsonpath) syntax after the column `NOTES`. Example:

```jira-search
query: status = 'In Progress' order by priority DESC
columns: key, notes, notes.title, notes.status, notes.tags, notes.tags[0], notes..book[?(@.price<30 && @.category=="fiction")]
```
