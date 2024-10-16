---
sidebar_position: 3
---
# Basic authentication

Access the plugin options using and in the `Connection` section configure the `host` and `authentication`.

## Host
In case of Atlassian Jira Server or Jira Cloud, the host is the base URL of your Jira instance.

[Read more...](/docs/configuration/authentication#host)

## Authentication Types

The authentication type depends on the type of Jira you use:

- `Open`: guest mode for open source projects
- `Basic Authentication`: for Jira Server and Jira Cloud

[Read more...](/docs/configuration/authentication#authentication-types)

### Username and password

If you choose `Basic Authentication`, you need to provide the username and password to authenticate with the server.

- **Jira Server**: Use your regular username and password.
- **Jira Cloud**: Use your **email address** as the username, and an **API token** as the password. Note: Jira Cloud does **not** accept your regular password for API access.

To create a new API token in Jira Cloud, navigate to `Account Settings > Security > Create and manage API tokens`. You can find more details here: [Official Documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).

[Read more...](/docs/configuration/authentication#username-and-password)