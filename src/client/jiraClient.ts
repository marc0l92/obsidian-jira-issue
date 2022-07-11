import { Platform, requestUrl, RequestUrlParam, RequestUrlResponse } from 'obsidian'
import { IJiraAutocompleteData, IJiraAutocompleteField, IJiraField, IJiraIssue, IJiraSearchResults } from './jiraInterfaces'
import { EAuthenticationTypes, IJiraIssueSettings } from "../settings"

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
            if (Platform.isMobileApp) {
                requestHeaders['Authorization'] = 'Basic ' + btoa(`${this._settings.username}:${this._settings.password}`)
            } else {
                requestHeaders['Authorization'] = 'Basic ' + Buffer.from(`${this._settings.username}:${this._settings.password}`).toString('base64')
            }
        } else if (this._settings.authenticationType === EAuthenticationTypes.BEARER_TOKEN) {
            requestHeaders['Authorization'] = `Bearer ${this._settings.bareToken}`
        }
        return requestHeaders
    }

    private async sendRequest(options: RequestUrlParam): Promise<any> {
        let response: RequestUrlResponse
        try {
            // console.info('request', options)
            response = await requestUrl(options)
        } catch (e) {
            console.error('JiraClient::response', e)
            throw new Error('Request error')
        }
        // console.info('response', response)

        if (response.status !== 200) {
            console.error('jiraClient error response:', response)
            // console.log(response.headers)
            if (response.headers['content-type'].contains('json') && response.json && response.json.errorMessages) {
                throw new Error(response.json.errorMessages.join('\n'))
            } else {
                throw new Error(`HTTP status ${response.status}`)
            }
        }

        return response.json
    }

    async getIssue(issue: string): Promise<IJiraIssue> {
        return await this.sendRequest(
            {
                url: this.buildUrl(`/issue/${issue}`),
                method: 'GET',
                headers: this.buildHeaders(),
            }
        )
    }

    async getSearchResults(query: string, max: number): Promise<IJiraSearchResults> {
        const queryParameters = new URLSearchParams({
            jql: query,
            startAt: "0",
            maxResults: max > 0 ? max.toString() : '',
        })
        return await this.sendRequest(
            {
                url: this.buildUrl(`/search`, queryParameters),
                method: 'GET',
                headers: this.buildHeaders(),
            }
        )
    }

    async updateStatusColorCache(status: string): Promise<void> {
        if (status in this._settings.statusColorCache) {
            return
        }
        const response = await this.sendRequest(
            {
                url: this.buildUrl(`/status/${status}`),
                method: 'GET',
                headers: this.buildHeaders(),
            }
        )
        this._settings.statusColorCache[status] = response.statusCategory.colorName
    }

    async updateCustomFieldsCache(): Promise<void> {
        const response: IJiraField[] = await this.sendRequest(
            {
                url: this.buildUrl(`/field`),
                method: 'GET',
                headers: this.buildHeaders(),
            }
        )
        this._settings.customFieldsIdToName = {}
        for (const field of response) {
            if (field.custom && field.schema && field.schema.customId) {
                this._settings.customFieldsIdToName[field.schema.customId] = field.name
                this._settings.customFieldsNameToId[field.name] = field.schema.customId.toString()
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
        this._settings.jqlAutocomplete.functions = {}
        for (const functionData of response.visibleFunctionNames) {
            for (const functionType of functionData.types) {
                if (functionType in this._settings.jqlAutocomplete.functions) {
                    this._settings.jqlAutocomplete.functions[functionType].push(functionData.value)
                } else {
                    this._settings.jqlAutocomplete.functions[functionType] = [functionData.value]
                }
            }
        }
        this._settings.jqlAutocomplete.fields = response.visibleFieldNames
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
