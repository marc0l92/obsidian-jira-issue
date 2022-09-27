import { Platform, requestUrl, RequestUrlParam, RequestUrlResponse } from 'obsidian'
import { IJiraAutocompleteData, IJiraAutocompleteField, IJiraField, IJiraIssue, IJiraIssueAccountSettings, IJiraSearchResults, IJiraStatus, IJiraUser } from './jiraInterfaces'
import { EAuthenticationTypes, IJiraIssueSettings } from "../settings"

interface RequestOptions {
    method: string
    path: string
    queryParameters?: URLSearchParams
    account?: IJiraIssueAccountSettings
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

export class JiraClient {
    private _settings: IJiraIssueSettings

    constructor(settings: IJiraIssueSettings) {
        this._settings = settings
    }

    private buildUrl(host: string, path: string, queryParameters: URLSearchParams = null): string {
        const url = new URL(`${host}${this._settings.apiBasePath}${path}`)
        if (queryParameters) {
            url.search = queryParameters.toString()
        }
        return url.toString()
    }

    private buildHeaders(account: IJiraIssueAccountSettings): Record<string, string> {
        const requestHeaders: Record<string, string> = {}
        if (account.authenticationType === EAuthenticationTypes.BASIC || account.authenticationType === EAuthenticationTypes.CLOUD) {
            requestHeaders['Authorization'] = 'Basic ' + base64Encode(`${account.username}:${account.password}`)
        } else if (account.authenticationType === EAuthenticationTypes.BEARER_TOKEN) {
            requestHeaders['Authorization'] = `Bearer ${account.bareToken}`
        }
        return requestHeaders
    }

    private async sendRequest(requestOptions: RequestOptions): Promise<any> {
        let response: RequestUrlResponse
        if (requestOptions.account) {
            response = await this.sendRequestWithAccount(requestOptions.account, requestOptions)

            if (response.status === 200) {
                return { ...response.json, account: requestOptions.account }
            }
        } else {
            for (let i = 0; i < this._settings.accounts.length; i++) {
                const account = this._settings.accounts[i]
                response = await this.sendRequestWithAccount(account, requestOptions)

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

    private async sendRequestWithAccount(account: IJiraIssueAccountSettings, requestOptions: RequestOptions): Promise<RequestUrlResponse> {
        let response
        try {
            const requestUrlParam: RequestUrlParam = {
                method: requestOptions.method,
                url: this.buildUrl(account.host, requestOptions.path, requestOptions.queryParameters),
                headers: this.buildHeaders(account),
                contentType: 'application/json',
            }
            this._settings.logRequestsResponses && console.info('JiraIssue:Request:', requestUrlParam)
            response = await requestUrl(requestUrlParam)
        } catch (errorResponse) {
            response = errorResponse
        }
        this._settings.logRequestsResponses && console.info('JiraIssue:Response:', response)
        return response
    }

    private async preFetchImage(account: IJiraIssueAccountSettings, url: string): Promise<string> {
        // Pre fetch only images hosted on the Jira server
        if (!url.startsWith(account.host)) {
            return url
        }

        const options = {
            url: url,
            method: 'GET',
            headers: this.buildHeaders(account),
        }
        let response: RequestUrlResponse
        try {
            this._settings.logRequestsResponses && console.info('JiraIssue:RequestImage:', options)
            response = await requestUrl(options)
        } catch (e) {
            console.error('JiraIssue:ResponseImage', e)
            return url
        }
        this._settings.logRequestsResponses && console.info('JiraIssue:ResponseImage:', response)

        if (response.status === 200) {
            const mimeType = getMimeType(response.arrayBuffer)
            if (mimeType) {
                return `data:${mimeType};base64,` + bufferBase64Encode(response.arrayBuffer)
            }
        }
        return url
    }

    private async fetchIssueImages(issue: IJiraIssue) {
        if (issue.fields) {
            if (issue.fields.issuetype) {
                issue.fields.issuetype.iconUrl = await this.preFetchImage(issue.account, issue.fields.issuetype.iconUrl)
            }
            if (issue.fields.reporter) {
                issue.fields.reporter.avatarUrls['16x16'] = await this.preFetchImage(issue.account, issue.fields.reporter.avatarUrls['16x16'])
            }
            if (issue.fields.assignee) {
                issue.fields.assignee.avatarUrls['16x16'] = await this.preFetchImage(issue.account, issue.fields.assignee.avatarUrls['16x16'])
            }
            if (issue.fields.priority) {
                issue.fields.priority.iconUrl = await this.preFetchImage(issue.account, issue.fields.priority.iconUrl)
            }
        }
    }

    async getIssue(issueKey: string): Promise<IJiraIssue> {
        const issue = await this.sendRequest(
            {
                method: 'GET',
                path: `/issue/${issueKey}`,
            }
        ) as IJiraIssue
        await this.fetchIssueImages(issue)
        return issue
    }

    async getSearchResults(query: string, max: number): Promise<IJiraSearchResults> {
        const queryParameters = new URLSearchParams({
            jql: query,
            startAt: '0',
            maxResults: max > 0 ? max.toString() : '',
        })
        const searchResults = await this.sendRequest(
            {
                method: 'GET',
                path: `/search`,
                queryParameters: queryParameters,
            }
        ) as IJiraSearchResults
        for (const issue of searchResults.issues) {
            issue.account = searchResults.account
            await this.fetchIssueImages(issue)
        }
        return searchResults
    }

    async updateStatusColorCache(status: string): Promise<void> {
        if (status in this._settings.cache.statusColor) {
            return
        }
        const response = await this.sendRequest(
            {
                method: 'GET',
                path: `/status/${status}`,
            }
        ) as IJiraStatus
        this._settings.cache.statusColor[status] = response.statusCategory.colorName
    }

    async updateCustomFieldsCache(): Promise<void> {
        const response = await this.sendRequest(
            {
                method: 'GET',
                path: `/field`,
            }
        ) as IJiraField[]
        this._settings.cache.customFieldsIdToName = {}
        this._settings.cache.customFieldsNameToId = {}
        this._settings.cache.customFieldsType = {}
        for (let i in response) {
            const field = response[i]
            if (field.custom && field.schema && field.schema.customId) {
                this._settings.cache.customFieldsIdToName[field.schema.customId] = field.name
                this._settings.cache.customFieldsNameToId[field.name] = field.schema.customId.toString()
                this._settings.cache.customFieldsType[field.schema.customId] = field.schema
            }
        }
    }

    async updateJQLAutoCompleteCache(): Promise<void> {
        const response = await this.sendRequest(
            {
                method: 'GET',
                path: `/jql/autocompletedata`,
            }
        ) as IJiraAutocompleteData
        this._settings.cache.jqlAutocomplete = { fields: [], functions: {} }
        for (const functionData of response.visibleFunctionNames) {
            for (const functionType of functionData.types) {
                if (functionType in this._settings.cache.jqlAutocomplete.functions) {
                    this._settings.cache.jqlAutocomplete.functions[functionType].push(functionData.value)
                } else {
                    this._settings.cache.jqlAutocomplete.functions[functionType] = [functionData.value]
                }
            }
        }
        this._settings.cache.jqlAutocomplete.fields = response.visibleFieldNames
    }

    async getJQLAutoCompleteField(fieldName: string, fieldValue: string): Promise<IJiraAutocompleteField> {
        const queryParameters = new URLSearchParams({
            fieldName: fieldName,
            fieldValue: fieldValue,
        })
        return await this.sendRequest(
            {
                method: 'GET',
                path: `/jql/autocompletedata/suggestions`,
                queryParameters: queryParameters,
            }
        ) as IJiraAutocompleteField
    }

    async testConnection(account: IJiraIssueAccountSettings): Promise<boolean> {
        await this.sendRequest(
            {
                method: 'GET',
                path: `/project`,
                account: account,
            }
        )
        return true
    }

    async getLoggedUser(account: IJiraIssueAccountSettings): Promise<IJiraUser> {
        return await this.sendRequest(
            {
                method: 'GET',
                path: `/myself`,
                account: account,
            }
        ) as IJiraUser
    }
}
