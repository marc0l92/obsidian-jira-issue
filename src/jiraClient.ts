import { requestUrl, RequestUrlParam, RequestUrlResponse } from 'obsidian'
import { IJiraIssue, IJiraSearchResults } from './interfaces'
import { EAuthenticationTypes, IJiraIssueSettings } from "./settings"

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
            requestHeaders['Authorization'] = 'Basic ' + Buffer.from(`${this._settings.username}:${this._settings.password}`).toString('base64')
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
            throw 'Request error'
        }
        console.info('response', response)

        if (response.status !== 200) {
            // console.log(response.headers)
            if (response.headers['content-type'].contains('json') && response.json && response.json.errorMessages) {
                throw response.json.errorMessages.join('\n')
            } else {
                throw 'HTTP status ' + response.status
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
}
