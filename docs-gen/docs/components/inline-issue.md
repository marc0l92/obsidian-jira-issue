---
sidebar_position: 4
---
# Inline Issue

Inline issues can be used insert a reference to a Jira issue inline with your note's text, without creating a dedicated fence block.

They can be added inside paragraphs, titles, bullet points list, checkbox lists, fence blocks.

Example:

![inlineIssues](/img/inlineIssues.png)

Syntax:
````
With inline issue you can insert an issue like JIRA:OPEN-351 inside your text.
The plugin will detect urls like https://jira.secondlife.com/browse/OPEN-352 and render the issue as tags.
- [ ] Issue can be extended JIRA:OPEN-353 with the summary
- [x] Or compact JIRA:-OPEN-354 without the summary
- [ ] JIRA:-OPEN-355 use the `-` symbol before the issue key to make it compact
```
The plugin searches inside the note for those patterns and replace them
JIRA:-OPEN-356
```
````

## How to use it

An inline issue is rendered when the plugin detects in the note an "inline issue prefix" followed by an issue key.

The default value for the prefix is `JIRA:` and it can be changed in the configuration.
[See more](/docs/configuration/rendering#inline-issue-prefix)

It is possible to render an issue tag by only putting the URL to the issue on your Jira server.

Example:
```
https://my-project.jira.com/browse/ABCD-1234
```

This feature can be activated in the plugin settings. [See more](/docs/configuration/rendering#issue-url-to-tag)

### Compact mode

An inline issue will be rendered showing the:
- Type icon
- Key
- Summary
- Status

Another rendering option is the compact mode that hides the summary in order to have a shorter tag that will take less spaces in the note.

The compact mode can be activated by putting a `-` symbol between the prefix and the issue key.

Example:

```
Non compact mode: JIRA:AAA-123
Compact mode: JIRA:-AAA-123
```

The compact mode for URL can be enabled putting a `-` before the URL.

Example:
```
Non compact mode: https://my-project.jira.com/browse/ABCD-1234
Compact mode: -https://my-project.jira.com/browse/ABCD-1234
```
