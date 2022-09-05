import { Platform, requestUrl, RequestUrlParam, RequestUrlResponse } from 'obsidian'
import { IJiraAutocompleteData, IJiraAutocompleteField, IJiraField, IJiraIssue, IJiraSearchResults } from './jiraInterfaces'
import { EAuthenticationTypes, IJiraIssueSettings } from "../settings"

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

    private buildUrl(path: string, queryParameters: URLSearchParams = null): string {
        const url = new URL(`${this._settings.host}${this._settings.apiBasePath}${path}`)
        if (queryParameters) {
            url.search = queryParameters.toString()
        }
        return url.toString()
    }

    private buildHeaders(): Record<string, string> {
        const requestHeaders: Record<string, string> = {}
        if (this._settings.authenticationType === EAuthenticationTypes.BASIC) {
            requestHeaders['Authorization'] = 'Basic ' + base64Encode(`${this._settings.username}:${this._settings.password}`)
        } else if (this._settings.authenticationType === EAuthenticationTypes.BEARER_TOKEN) {
            requestHeaders['Authorization'] = `Bearer ${this._settings.bareToken}`
        }
        return requestHeaders
    }

    private async sendRequest(options: RequestUrlParam): Promise<any> {
        let response: RequestUrlResponse
        try {
            this._settings.logRequestsResponses && console.info('JiraIssue:Request:', options)
            response = await requestUrl(options)
        } catch (e) {
            console.error('JiraIssue:response', e)
            throw new Error('Request error')
        }
        this._settings.logRequestsResponses && console.info('JiraIssue:Response:', response)

        if (response.status !== 200) {
            if (response.headers['content-type'].contains('json') && response.json && response.json.errorMessages) {
                throw new Error(response.json.errorMessages.join('\n'))
            } else {
                throw new Error(`HTTP status ${response.status}`)
            }
        }

        return response.json
    }

    private async preFetchImage(url: string): Promise<string> {
        // Pre fetch only images hosted on the Jira server
        if (!url.startsWith(this._settings.host)) {
            return url
        }

        const options = {
            url: url,
            method: 'GET',
            headers: this.buildHeaders(),
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
                issue.fields.issuetype.iconUrl = await this.preFetchImage(issue.fields.issuetype.iconUrl)
            }
            if (issue.fields.reporter) {
                issue.fields.reporter.avatarUrls['16x16'] = await this.preFetchImage(issue.fields.reporter.avatarUrls['16x16'])
            }
            if (issue.fields.assignee) {
                issue.fields.assignee.avatarUrls['16x16'] = await this.preFetchImage(issue.fields.assignee.avatarUrls['16x16'])
            }
            if (issue.fields.priority) {
                issue.fields.priority.iconUrl = await this.preFetchImage(issue.fields.priority.iconUrl)
            }
        }
    }

    async getIssue(issueKey: string): Promise<IJiraIssue> {
        const issue = await this.sendRequest(
            {
                url: this.buildUrl(`/issue/${issueKey}`),
                method: 'GET',
                headers: this.buildHeaders(),
            }
        ) as IJiraIssue
        await this.fetchIssueImages(issue)
        return issue
    }

    async getSearchResults(query: string, max: number): Promise<IJiraSearchResults> {
        const queryParameters = new URLSearchParams({
            jql: query,
            startAt: "0",
            maxResults: max > 0 ? max.toString() : '',
        })
        const searchResults = await this.sendRequest(
            {
                url: this.buildUrl(`/search`, queryParameters),
                method: 'GET',
                headers: this.buildHeaders(),
            }
        ) as IJiraSearchResults
        for (let issue of searchResults.issues) {
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
                url: this.buildUrl(`/status/${status}`),
                method: 'GET',
                headers: this.buildHeaders(),
            }
        )
        this._settings.cache.statusColor[status] = response.statusCategory.colorName
    }

    async updateCustomFieldsCache(): Promise<void> {
        const response: IJiraField[] = await this.sendRequest(
            {
                url: this.buildUrl(`/field`),
                method: 'GET',
                headers: this.buildHeaders(),
            }
        )
        this._settings.cache.customFieldsIdToName = {}
        this._settings.cache.customFieldsNameToId = {}
        this._settings.cache.customFieldsType = {}
        for (const field of response) {
            if (field.custom && field.schema && field.schema.customId) {
                this._settings.cache.customFieldsIdToName[field.schema.customId] = field.name
                this._settings.cache.customFieldsNameToId[field.name] = field.schema.customId.toString()
                this._settings.cache.customFieldsType[field.schema.customId] = field.schema
            }
        }
    }

    async updateJQLAutoCompleteCache(): Promise<void> {
        const response: IJiraAutocompleteData = await this.sendRequest(
            {
                url: this.buildUrl(`/jql/autocompletedata`),
                method: 'GET',
                headers: this.buildHeaders(),
            }
        )
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
                url: this.buildUrl(`/jql/autocompletedata/suggestions`, queryParameters),
                method: 'GET',
                headers: this.buildHeaders(),
            }
        )
    }
}
