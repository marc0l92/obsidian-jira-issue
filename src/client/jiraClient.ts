import { Platform, requestUrl, RequestUrlParam, RequestUrlResponse } from 'obsidian'
import { EAuthenticationTypes, IJiraIssueAccountSettings } from '../interfaces/settingsInterfaces'
import { IJiraDevStatus, IJiraField, IJiraIssue, IJiraSearchResults, IJiraStatus, IJiraUser } from '../interfaces/issueInterfaces'
import { SettingsData } from "../settings"

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
            console.error('Image mimeType not found:', hex)
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
                break;
            }
        }
    }

    if (response.headers && response.headers['content-type'].contains('json') && response.json && response.json.errorMessages) {
        throw new Error(response.json.errorMessages.join('\n'))
    } else if (response.status) {
        throw new Error(`HTTP status ${response.status}`)
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
        SettingsData.logRequestsResponses && console.info('JiraIssue:FetchImage:', { request: options, response })
    } catch (errorResponse) {
        SettingsData.logRequestsResponses && console.warn('JiraIssue:FetchImage:', { request: options, response: errorResponse })
        response = errorResponse
    }

    if (response.status === 200) {
        const mimeType = getMimeType(response.arrayBuffer)
        if (mimeType) {
            url = `data:${mimeType};base64,` + bufferBase64Encode(response.arrayBuffer)
        }
    }
    return url
}

async function fetchIssueImages(issue: IJiraIssue) {
    if (issue.fields) {
        if (issue.fields.issuetype && issue.fields.issuetype.iconUrl) {
            issue.fields.issuetype.iconUrl = await preFetchImage(issue.account, issue.fields.issuetype.iconUrl)
        }
        if (issue.fields.reporter) {
            issue.fields.reporter.avatarUrls['16x16'] = await preFetchImage(issue.account, issue.fields.reporter.avatarUrls['16x16'])
        }
        if (issue.fields.assignee && issue.fields.assignee.avatarUrls && issue.fields.assignee.avatarUrls['16x16']) {
            issue.fields.assignee.avatarUrls['16x16'] = await preFetchImage(issue.account, issue.fields.assignee.avatarUrls['16x16'])
        }
        if (issue.fields.priority && issue.fields.priority.iconUrl) {
            issue.fields.priority.iconUrl = await preFetchImage(issue.account, issue.fields.priority.iconUrl)
        }
    }
}

export default {

    async getIssue(issueKey: string, account: IJiraIssueAccountSettings = null): Promise<IJiraIssue> {
        const issue = await sendRequest(
            {
                method: 'GET',
                path: `/issue/${issueKey}`,
                account: account,
            }
        ) as IJiraIssue
        await fetchIssueImages(issue)
        return issue
    },

    async getSearchResults(query: string, max: number, account: IJiraIssueAccountSettings = null): Promise<IJiraSearchResults> {
        const queryParameters = new URLSearchParams({
            jql: query,
            startAt: '0',
            maxResults: max > 0 ? max.toString() : '',
        })
        const searchResults = await sendRequest(
            {
                method: 'GET',
                path: `/search`,
                queryParameters: queryParameters,
                account: account,
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

    // async getJQLAutoCompleteField(fieldName: string, fieldValue: string): Promise<IJiraAutocompleteField> {
    //     const queryParameters = new URLSearchParams({
    //         fieldName: fieldName,
    //         fieldValue: fieldValue,
    //     })
    //     return await sendRequest(
    //         {
    //             method: 'GET',
    //             path: `/jql/autocompletedata/suggestions`,
    //             queryParameters: queryParameters,
    //         }
    //     ) as IJiraAutocompleteField
    // },

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

    async getLoggedUser(account: IJiraIssueAccountSettings): Promise<IJiraUser> {
        return await sendRequest(
            {
                method: 'GET',
                path: `/myself`,
                account: account,
            }
        ) as IJiraUser
    },

    async getDevStatus(issueId: string, account: IJiraIssueAccountSettings): Promise<IJiraDevStatus> {
        const queryParameters = new URLSearchParams({
            issueId: issueId,
        })
        return await sendRequest(
            {
                method: 'GET',
                path: `/rest/dev-status/latest/issue/summary?issueId=`,
                queryParameters: queryParameters,
                noBasePath: true,
                account: account,
            }
        ) as IJiraDevStatus
    },
}
