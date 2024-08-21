import { Platform, requestUrl, RequestUrlParam, RequestUrlResponse } from 'obsidian'
import { AVATAR_RESOLUTION, EAuthenticationTypes, IJiraIssueAccountSettings } from '../interfaces/settingsInterfaces'
import { ESprintState, IJiraAutocompleteField, IJiraBoard, IJiraDevStatus, IJiraField, IJiraIssue, IJiraSearchResults, IJiraSprint, IJiraStatus, IJiraUser } from '../interfaces/issueInterfaces'
import { SettingsData } from "../settings"
import { JIRA_ISSUE_TYPE_ICON_MAP, JIRA_DEFAULT_ISSUE_ICON, JIRA_DEFAULT_PRIORITY_ICON, JIRA_PRIORITY_ICON_MAP} from 'src/rendering/renderingCommon'

interface RequestOptions {
    method: string
    path: string
    queryParameters?: URLSearchParams
    account?: IJiraIssueAccountSettings
    noBasePath?: boolean
}

function getMimeType(imageBuffer: ArrayBuffer): string {
    const imageBufferUint8 = new Uint8Array(imageBuffer.slice(0, 4))
    let bytes: string[] = []
    imageBufferUint8.forEach((byte) => {
        bytes.push(byte.toString(16))
    })
    const hex = bytes.join('').toUpperCase()
    switch (hex) {
        case '89504E47':
            return 'image/png'
        case '47494638':
            return 'image/gif'
        case 'FFD8FFDB':
        case 'FFD8FFE0':
        case 'FFD8FFE1':
            return 'image/jpeg'
        case '3C737667':
        case '3C3F786D':
            return 'image/svg+xml'
        default:
            SettingsData.logImagesFetch && console.error('Image mimeType not found:', hex)
            return null
    }
}

function bufferBase64Encode(b: ArrayBuffer) {
    const a = new Uint8Array(b)
    if (Platform.isMobileApp) {
        return btoa(String.fromCharCode(...a))
    } else {
        return Buffer.from(a).toString('base64')
    }
}

function base64Encode(s: string) {
    if (Platform.isMobileApp) {
        return btoa(s)
    } else {
        return Buffer.from(s).toString('base64')
    }
}

function buildUrl(host: string, requestOptions: RequestOptions): string {
    const basePath = requestOptions.noBasePath ? '' : SettingsData.apiBasePath
    const url = new URL(`${host}${basePath}${requestOptions.path}`)
    if (requestOptions.queryParameters) {
        url.search = requestOptions.queryParameters.toString()
    }
    return url.toString()
}

function buildHeaders(account: IJiraIssueAccountSettings): Record<string, string> {
    const requestHeaders: Record<string, string> = {}
    if (account.authenticationType === EAuthenticationTypes.BASIC || account.authenticationType === EAuthenticationTypes.CLOUD) {
        requestHeaders['Authorization'] = 'Basic ' + base64Encode(`${account.username}:${account.password}`)
    } else if (account.authenticationType === EAuthenticationTypes.BEARER_TOKEN) {
        requestHeaders['Authorization'] = `Bearer ${account.bareToken}`
    }
    return requestHeaders
}

async function sendRequest(requestOptions: RequestOptions): Promise<any> {
    let response: RequestUrlResponse
    if (requestOptions.account) {
        response = await sendRequestWithAccount(requestOptions.account, requestOptions)

        if (response.status === 200) {
            return { ...response.json, account: requestOptions.account }
        }
    } else {
        for (let i = 0; i < SettingsData.accounts.length; i++) {
            const account = SettingsData.accounts[i]
            response = await sendRequestWithAccount(account, requestOptions)

            if (response.status === 200) {
                return { ...response.json, account: account }
            } else if (Math.floor(response.status / 100) !== 4) {
                break
            }
        }
    }

    if (response && response.headers && response.headers['content-type'].contains('json') && response.json && response.json.errorMessages) {
        throw new Error(response.json.errorMessages.join('\n'))
    } else if (response && response.status) {
        switch (response.status) {
            case 400:
                throw new Error(`The query is not valid`)
            case 404:
                throw new Error(`Issue does not exist`)
            default:
                throw new Error(`HTTP status ${response.status}`)
        }
    } else {
        throw new Error(response as any)
    }
}

async function sendRequestWithAccount(account: IJiraIssueAccountSettings, requestOptions: RequestOptions): Promise<RequestUrlResponse> {
    let response
    const requestUrlParam: RequestUrlParam = {
        method: requestOptions.method,
        url: buildUrl(account.host, requestOptions),
        headers: buildHeaders(account),
        contentType: 'application/json',
    }
    try {
        response = await requestUrl(requestUrlParam)
        SettingsData.logRequestsResponses && console.info('JiraIssue:Fetch:', { request: requestUrlParam, response })
    } catch (errorResponse) {
        SettingsData.logRequestsResponses && console.warn('JiraIssue:Fetch:', { request: requestUrlParam, response: errorResponse })
        response = errorResponse
    }
    return response
}

async function preFetchImage(account: IJiraIssueAccountSettings, url: string): Promise<string> {
    // Pre fetch only images hosted on the Jira server
    if (!url.startsWith(account.host)) {
        return url
    }

    const options = {
        url: url,
        method: 'GET',
        headers: buildHeaders(account),
    }
    let response: RequestUrlResponse
    try {
        response = await requestUrl(options)
        SettingsData.logImagesFetch && console.info('JiraIssue:FetchImage:', { request: options, response })
    } catch (errorResponse) {
        SettingsData.logImagesFetch && console.warn('JiraIssue:FetchImage:', { request: options, response: errorResponse })
        response = errorResponse
    }

    if (response.status === 200) {
        const mimeType = getMimeType(response.arrayBuffer)
        if (mimeType) {
            return `data:${mimeType};base64,` + bufferBase64Encode(response.arrayBuffer)
        }
    }
    return null
}

async function fetchIssueImages(issue: IJiraIssue) {
    const disableImages = issue.account.disableImageFetch;
    if (issue.fields) {
        if (issue.fields.issuetype && issue.fields.issuetype.iconUrl) {
            if (disableImages) {
                issue.fields.issuetype.iconUrl = JIRA_ISSUE_TYPE_ICON_MAP[issue.fields.issuetype.name.toLowerCase()] || (issue.fields.issuetype.name.toLowerCase().startsWith("sub-") && JIRA_ISSUE_TYPE_ICON_MAP["subtask"]) || JIRA_DEFAULT_ISSUE_ICON
            } else {
                issue.fields.issuetype.iconUrl = await preFetchImage(issue.account, issue.fields.issuetype.iconUrl)
            }
        }
        if (issue.fields.reporter) {
            if (disableImages) {
                issue.fields.reporter.avatarUrls[AVATAR_RESOLUTION] = ""
            } else {
                issue.fields.reporter.avatarUrls[AVATAR_RESOLUTION] = await preFetchImage(issue.account, issue.fields.reporter.avatarUrls[AVATAR_RESOLUTION])
            }
        }
        if (issue.fields.assignee && issue.fields.assignee.avatarUrls && issue.fields.assignee.avatarUrls[AVATAR_RESOLUTION]) {
            if (disableImages) {
                issue.fields.assignee.avatarUrls[AVATAR_RESOLUTION] = ""
            } else {
                issue.fields.assignee.avatarUrls[AVATAR_RESOLUTION] = await preFetchImage(issue.account, issue.fields.assignee.avatarUrls[AVATAR_RESOLUTION])
            }
        }
        if (issue.fields.priority && issue.fields.priority.iconUrl) {
            if (disableImages) {
                issue.fields.priority.iconUrl = JIRA_PRIORITY_ICON_MAP[issue.fields.priority.name.toLowerCase()] || JIRA_DEFAULT_PRIORITY_ICON
            } else {
                issue.fields.priority.iconUrl = await preFetchImage(issue.account, issue.fields.priority.iconUrl)
            }
        }
    }
}

export default {

    async getIssue(issueKey: string, options: { fields?: string[], account?: IJiraIssueAccountSettings } = {}): Promise<IJiraIssue> {
        const opt = {
            fields: options.fields || [],
            account: options.account || null,
        }
        const queryParameters = new URLSearchParams({
            fields: opt.fields.join(','),
        })
        const issue = await sendRequest(
            {
                method: 'GET',
                path: `/issue/${issueKey}`,
                account: opt.account,
                queryParameters: queryParameters,
            }
        ) as IJiraIssue
        await fetchIssueImages(issue)
        return issue
    },

    async getSearchResults(query: string, options: { limit?: number, offset?: number, fields?: string[], account?: IJiraIssueAccountSettings } = {}): Promise<IJiraSearchResults> {
        const opt = {
            fields: options.fields || [],
            offset: options.offset || 0,
            limit: options.limit || 50,
            account: options.account || null,
        }
        const queryParameters = new URLSearchParams({
            jql: query,
            fields: opt.fields.join(','),
            startAt: opt.offset > 0 ? opt.offset.toString() : '',
            maxResults: opt.limit > 0 ? opt.limit.toString() : '',
        })
        const searchResults = await sendRequest(
            {
                method: 'GET',
                path: `/search`,
                queryParameters: queryParameters,
                account: opt.account,
            }
        ) as IJiraSearchResults
        for (const issue of searchResults.issues) {
            issue.account = searchResults.account
            await fetchIssueImages(issue)
        }
        return searchResults
    },

    async updateStatusColorCache(status: string, account: IJiraIssueAccountSettings): Promise<void> {
        if (status in account.cache.statusColor) {
            return
        }
        const response = await sendRequest(
            {
                method: 'GET',
                path: `/status/${status}`,
            }
        ) as IJiraStatus
        account.cache.statusColor[status] = response.statusCategory.colorName
    },

    async updateCustomFieldsCache(): Promise<void> {
        SettingsData.cache.columns = []
        for (const account of SettingsData.accounts) {
            try {
                const response = await sendRequest(
                    {
                        method: 'GET',
                        path: `/field`,
                        account: account,
                    }
                ) as IJiraField[]
                account.cache.customFieldsIdToName = {}
                account.cache.customFieldsNameToId = {}
                account.cache.customFieldsType = {}
                for (let i in response) {
                    const field = response[i]
                    if (field.custom && field.schema && field.schema.customId) {
                        account.cache.customFieldsIdToName[field.schema.customId] = field.name
                        account.cache.customFieldsNameToId[field.name] = field.schema.customId.toString()
                        account.cache.customFieldsType[field.schema.customId] = field.schema
                        SettingsData.cache.columns.push(field.schema.customId.toString(), field.name.toUpperCase())
                    }
                }
            } catch (e) {
                console.error('Error while retrieving custom fields list of account:', account.alias, e)
            }
        }
    },

    // async updateJQLAutoCompleteCache(): Promise<void> {
    // const response = await sendRequest(
    //     {
    //         method: 'GET',
    //         path: `/jql/autocompletedata`,
    //     }
    // ) as IJiraAutocompleteData
    // settingData.cache.jqlAutocomplete = { fields: [], functions: {} }
    // for (const functionData of response.visibleFunctionNames) {
    //     for (const functionType of functionData.types) {
    //         if (functionType in settingData.cache.jqlAutocomplete.functions) {
    //             settingData.cache.jqlAutocomplete.functions[functionType].push(functionData.value)
    //         } else {
    //             settingData.cache.jqlAutocomplete.functions[functionType] = [functionData.value]
    //         }
    //     }
    // }
    // settingData.cache.jqlAutocomplete.fields = response.visibleFieldNames
    // },

    async getJQLAutoCompleteField(fieldName: string, fieldValue: string): Promise<IJiraAutocompleteField> {
        const queryParameters = new URLSearchParams({
            fieldName: fieldName,
            fieldValue: fieldValue,
        })
        return await sendRequest(
            {
                method: 'GET',
                path: `/jql/autocompletedata/suggestions`,
                queryParameters: queryParameters,
            }
        ) as IJiraAutocompleteField
    },

    async testConnection(account: IJiraIssueAccountSettings): Promise<boolean> {
        await sendRequest(
            {
                method: 'GET',
                path: `/project`,
                account: account,
            }
        )
        return true
    },

    async getLoggedUser(account: IJiraIssueAccountSettings = null): Promise<IJiraUser> {
        return await sendRequest(
            {
                method: 'GET',
                path: `/myself`,
                account: account,
            }
        ) as IJiraUser
    },

    async getDevStatus(issueId: string, options: { account?: IJiraIssueAccountSettings } = {}): Promise<IJiraDevStatus> {
        const opt = {
            account: options.account || null,
        }
        const queryParameters = new URLSearchParams({
            issueId: issueId,
        })
        return await sendRequest(
            {
                method: 'GET',
                path: `/rest/dev-status/latest/issue/summary`,
                queryParameters: queryParameters,
                noBasePath: true,
                account: opt.account,
            }
        ) as IJiraDevStatus
    },

    async getBoards(projectKeyOrId: string, options: { limit?: number, offset?: number, account?: IJiraIssueAccountSettings } = {}): Promise<IJiraBoard[]> {
        const opt = {
            offset: options.offset || 0,
            limit: options.limit || 50,
            account: options.account || null,
        }
        const queryParameters = new URLSearchParams({
            projectKeyOrId: projectKeyOrId,
            startAt: opt.offset > 0 ? opt.offset.toString() : '',
            maxResults: opt.limit > 0 ? opt.limit.toString() : '',
        })
        const boards = await sendRequest(
            {
                method: 'GET',
                path: `/rest/agile/1.0/board`,
                queryParameters: queryParameters,
                noBasePath: true,
                account: opt.account,
            }
        )
        if (boards.values && boards.values.length) {
            return boards.values
        }
        return []
    },

    async getSprints(boardId: number, options: { limit?: number, offset?: number, state?: ESprintState[], account?: IJiraIssueAccountSettings } = {}): Promise<IJiraSprint[]> {
        const opt = {
            state: options.state || [],
            offset: options.offset || 0,
            limit: options.limit || 50,
            account: options.account || null,
        }
        const queryParameters = new URLSearchParams({
            state: opt.state.join(','),
            startAt: opt.offset > 0 ? opt.offset.toString() : '',
            maxResults: opt.limit > 0 ? opt.limit.toString() : '',
        })
        const sprints = await sendRequest(
            {
                method: 'GET',
                path: `/rest/agile/1.0/board/${boardId}/sprint`,
                queryParameters: queryParameters,
                noBasePath: true,
                account: opt.account,
            }
        )
        if (sprints.values && sprints.values.length) {
            return sprints.values
        }
        return []
    },

    async getSprint(sprintId: number, options: { account?: IJiraIssueAccountSettings } = {}): Promise<IJiraSprint> {
        const opt = {
            account: options.account || null
        }
        return await sendRequest(
            {
                method: 'GET',
                path: `/rest/agile/1.0/sprint/${sprintId}`,
                noBasePath: true,
                account: opt.account,
            }
        )
    },
}
