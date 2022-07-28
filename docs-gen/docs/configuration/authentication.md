---
sidebar_position: 1
---
# Authentication

The authentication section of the plugin settings allows you to configure how the plugin should authenticate when using the Jira Rest API.

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

This is the most common authentication and it can be used for both Jira Server and Jira Cloud.

In case of **Jira Server**, the username and password are the same you use to login in the Jira website. If you are already logged in, you can try to open a browser incognito window and access to your Jira instance. The browser will ask you to login and you can try your credentials.

In case of **Jira Cloud**, the username is your email address and the password is your API token. You can create a new API token in Jira Cloud from `Account Settings > Security > Create and manage API tokens` ([Official Documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)). It is usually recommended to have generate a dedicated API token for this plugin.

The specifications of this type  of authentication can be found in the [RFC 7617](https://datatracker.ietf.org/doc/html/rfc7617).

### Authentication Type: Bearer Token

This authentication is used to access Jira instances that uses OAuth2.0.

The specifications of this type  of authentication can be found in the [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750).


## Security risks

### Credentials storage

The credentials are stored in clear in the configuration file of this plugin.
The configuration file is located at:
```
<your vault>/.obsidian/plugins/obsidian-jira-issue/data.json
```

Pay attention when you synchronize the notes across devices because the credentials may be copied as well.

### API Calls

For security reason, it is recommended to use a host with `https` protocol. Other protocols like `http` do not encrypt the traffic and your credential may be at risk.
