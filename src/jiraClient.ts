import { EAuthenticationTypes, IJiraIssueSettings } from "./settings"

export class JiraClient {
    private _settings: IJiraIssueSettings

    constructor(settings: IJiraIssueSettings) {
        this._settings = settings
    }

    private async fetchWithTimeout(resource: RequestInfo, options: RequestInit): Promise<Response> {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), this._settings.requestsTimeout)

        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        })
        clearTimeout(id)

        return response
    }

    private buildUrl(path: string, queryParameters: URLSearchParams = null): string {
        const url = new URL(`${this._settings.host}${this._settings.apiBasePath}${path}`)
        if (queryParameters) {
            url.search = queryParameters.toString()
        }
        return url.toString()
    }

    private buildHeaders(): HeadersInit {
        const requestHeaders: HeadersInit = new Headers()
        if (this._settings.authenticationType === EAuthenticationTypes.BASIC) {
            requestHeaders.set('Authorization', 'Basic ' + Buffer.from(`${this._settings.username}:${this._settings.password}`).toString('base64'))
        } else if (this._settings.authenticationType === EAuthenticationTypes.BEARER_TOKEN) {
            requestHeaders.set('Authorization', `Bearer ${this._settings.bareToken}`)
        }
        return requestHeaders
    }

    private async sendRequest(url: string, options: RequestInit): Promise<any> {
        let response: Response
        try {
            response = await this.fetchWithTimeout(url.toString(), options)
        } catch (e) {
            console.error('JiraClient::response', e.name, e)
            if (e.name === 'AbortError') {
                throw 'Request timeout'
            }
            throw 'Request error'
        }

        if (response.status === 200) {
            console.info('response', response)
            try {
                return response.json()
            } catch (e) {
                console.error('JiraClient::parsing', response, e)
                throw 'The API response is not a JSON. Please check the host configured in the plugin options.'
            }
        } else {
            console.error('JiraClient::error', response)
            let responseJson: any
            try {
                responseJson = await response.json()
            } catch (e) {
                throw 'HTTP status ' + response.status
            }
            throw responseJson['errorMessages'].join('\n')
        }
    }

    async getIssue(issue: string): Promise<any> {
        return await this.sendRequest(
            this.buildUrl(`/issue/${issue}`),
            {
                method: 'GET',
                headers: this.buildHeaders(),
            }
        )
    }

    async getSearchResults(query: string, max: number): Promise<any> {
        const queryParameters = new URLSearchParams({
            jql: query,
            startAt: "0",
            maxResults: max.toString(),
        })
        return await this.sendRequest(
            this.buildUrl(`/search`, queryParameters),
            {
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
            this.buildUrl(`/status/${status}`),
            {
                method: 'GET',
                headers: this.buildHeaders(),
            }
        )
        this._settings.statusColorCache[status] = response.statusCategory.colorName
    }
}
