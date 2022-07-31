---
sidebar_position: 1
---
# Jira Issue

This fence component allows to insert a section where you can put several issues references.

![jira-issue1](/img/jira-issue1.png)


This markdown fence is meant to be used to store many references that may not be related but you want to keep track of them.

You can input issues one per line and they can be referenced using the key or the Jira Issue URL.
You can also insert comments in this fence in order to give some context to those potentially unrelated issues.

Example:
````
```jira-issue
AAA-111
AAA-222
https://my.jira-server.com/browse/BBB-333
# This is a comment
```
````

