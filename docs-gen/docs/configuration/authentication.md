---
sidebar_position: 1
---
# Authentication

The authentication section of the plugin settings allows you to configure how the plugin should authenticate when using the Jira Rest API.

## Multi account support

It is possible to configure multiple accounts in order to retrieve data from multiple sources. This feature as been designed to support consulting company employee that are usually interacting with more than one company.

![inlineIssues](/img/multi-account.png)

## Alias

Mnemonic name of the account used to identify it.

## Host
The host is the base URL of the Jira instance. No matter if you use Jira Cloud or Jira Server, the way to get the host is the same.

For example, if you are working on a user story like:
```
https://issues.apache.org/jira/browse/AMQCPP-711
```
the host would be:
```
https://issues.apache.org/jira
```

## Authentication Types

The plugin supports the following authentication types:
- Open
- Basic Authentication
- Jira Cloud
- Bearer Token

### Authentication Type: Open

This type of authentication is used to access public Jira instances as a guest.
The advantage of this type of authentication is that you don't need to provide and store any credentials in the plugin, but very often, Jira instances don't allow this type of authentication in order to keep the data private.

Some example of Jira instances that support this type of authentication are:
```
https://jira.atlassian.com/
https://issues.apache.org/jira
https://jira.secondlife.com/jira
```

This type of authentication don't allow to use function like `currentUser()` in the JQL because there is no user logged in.

### Authentication Type: Basic Authentication

This is the recommended authentication type when the plugin interacts with Jira Server.

The username and password are the same you use to login in the Jira website. If you are already logged in, you can try to open a browser incognito window and access to your Jira instance. The browser will ask you to login and you can try your credentials.

The specifications of this type of authentication can be found in the [RFC 7617](https://datatracker.ietf.org/doc/html/rfc7617).

### Authentication Type: Jira Cloud

This is the recommended authentication type when the plugin interacts with Jira Cloud.

You can create a new API token in Jira Cloud from `Account Settings > Security > Create and manage API tokens` ([Official Documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)). It is usually recommended to have generate a dedicated API token for this plugin.


### Authentication Type: Bearer Token

This authentication is used to access Jira instances that uses OAuth2.0.

The specifications of this type  of authentication can be found in the [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750).

## Priority

The priority defines the order in which the accounts should be used to retrieve the data. It is recommended to put an higher priority to the accounts that are used the most in the Obsidian.md notes.

## Color band

To help identify the Jira account used by each tag, it is possible to associate a color to each account. The color should be written in hexadecimal notation.

![inlineIssues](/img/color-band.png)

## Security risks

### Credentials storage

The credentials are stored in clear in a dedicated configuration file (`auth.json`) of this plugin.
The general plugin configuration is located at:
```
<your vault>/.obsidian/plugins/obsidian-jira-issue/data.json
```
And the authentication data is stored at:
```
<your vault>/.obsidian/plugins/obsidian-jira-issue/auth.json
```

Pay attention when you synchronize the notes across devices because the credentials may be copied as well.
If you are using a Git plugin to version your vault, it is highly recommended to add `auth.json` to your `.gitignore` file to prevent accidentally committing your credentials.

### API Calls

For security reason, it is recommended to use a host with `https` protocol. Other protocols like `http` do not encrypt the traffic and your credential may be at risk.
