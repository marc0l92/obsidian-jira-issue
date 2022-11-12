import { MarkdownPostProcessorContext, setIcon } from "obsidian"
import { createProxy, IJiraIssueAccountSettings, IJiraSearchResults } from "../client/jiraInterfaces"
import { JiraClient } from "../client/jiraClient"
import { ObjectsCache } from "../objectsCache"
import { renderTableColumn } from "./renderTableColumns"
import { ESearchColumnsTypes, ESearchResultsRenderingTypes, SearchView, SEARCH_COLUMNS_DESCRIPTION } from "../searchView"
import { IJiraIssueSettings } from "../settings"
import { RenderingCommon } from "./renderingCommon"

export class SearchFenceRenderer {
    private _rc: RenderingCommon
    private _settings: IJiraIssueSettings
    private _client: JiraClient
    private _cache: ObjectsCache

    constructor(renderingCommon: RenderingCommon, settings: IJiraIssueSettings, client: JiraClient, cache: ObjectsCache) {
        this._rc = renderingCommon
        this._settings = settings
        this._client = client
        this._cache = cache
    }

    async render(source: string, rootEl: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        // console.log(`Search query: ${source}`)
        try {
            const searchView = new SearchView(this._settings).fromString(source)

            const cachedSearchResults = this._cache.get(searchView.getCacheKey())
            if (cachedSearchResults) {
                if (cachedSearchResults.isError) {
                    this._rc.renderSearchError(rootEl, cachedSearchResults.data as string, searchView)
                } else {
                    this.renderSearchResults(rootEl, searchView, cachedSearchResults.data as IJiraSearchResults)
                }
            } else {
                // console.log(`Search results not available in the cache`)
                this._rc.renderLoadingItem('Loading...')
                this._client.getSearchResults(searchView.query, parseInt(searchView.limit) || this._settings.searchResultsLimit)
                    .then(newSearchResults => {
                        const searchResults = this._cache.add(searchView.getCacheKey(), newSearchResults).data as IJiraSearchResults
                        this.renderSearchResults(rootEl, searchView, searchResults)
                    }).catch(err => {
                        this._cache.add(searchView.getCacheKey(), err, true)
                        this._rc.renderSearchError(rootEl, err, searchView)
                    })
            }
        } catch (err) {
            this._rc.renderSearchError(rootEl, err, null)
        }
    }

    private renderSearchResults(rootEl: HTMLElement, searchView: SearchView, searchResults: IJiraSearchResults): void {
        searchView.account = searchResults.account
        if (searchView.type === ESearchResultsRenderingTypes.LIST) {
            this.renderSearchResultsList(rootEl, searchResults)
        } else {
            this.renderSearchResultsTable(rootEl, searchView, searchResults)
        }
    }


    private renderSearchResultsTable(rootEl: HTMLElement, searchView: SearchView, searchResults: IJiraSearchResults): void {
        const table = createEl('table', { cls: `table is-bordered is-striped is-narrow is-hoverable is-fullwidth ${this._rc.getTheme()}` })
        this.renderSearchResultsTableHeader(table, searchView)
        this.renderSearchResultsTableBody(table, searchView, searchResults)

        const footer = this.renderSearchFooter(rootEl, searchView, searchResults)
        rootEl.replaceChildren(this._rc.renderContainer([table, footer]))
    }

    private renderSearchResultsTableHeader(table: HTMLElement, searchView: SearchView): void {
        const header = createEl('tr', {
            parent:
                createEl('thead', { attr: { style: this.getAccountBandStyle(searchView.account) }, parent: table })
        })
        const columns = searchView.columns.length > 0 ? searchView.columns : this._settings.searchColumns
        for (const column of columns) {
            let name = SEARCH_COLUMNS_DESCRIPTION[column.type]
            // Frontmatter
            if (column.type === ESearchColumnsTypes.NOTES && column.extra) {
                name = column.extra
            }
            // Custom field
            if (column.type === ESearchColumnsTypes.CUSTOM_FIELD) {
                name = this._settings.cache.customFieldsIdToName[column.extra]
            }
            if (column.compact) {
                createEl('th', { text: name[0].toUpperCase(), attr: { 'aria-label-position': 'top', 'aria-label': column.type }, parent: header })
            } else {
                createEl('th', { text: name, title: column.type, parent: header })
            }
        }
    }

    private renderSearchResultsTableBody(table: HTMLElement, searchView: SearchView, searchResults: IJiraSearchResults): void {
        const tbody = createEl('tbody', { parent: table })
        for (let issue of searchResults.issues) {
            issue = createProxy(issue)
            const row = createEl('tr', { parent: tbody })
            const columns = searchView.columns.length > 0 ? searchView.columns : this._settings.searchColumns
            renderTableColumn(columns, issue, row, this._rc)
        }
    }

    private renderSearchResultsList(rootEl: HTMLElement, searchResults: IJiraSearchResults): void {
        const list: HTMLElement[] = []
        for (const issue of searchResults.issues) {
            list.push(this._rc.renderIssue(issue))
        }
        rootEl.replaceChildren(this._rc.renderContainer(list))
    }

    private getAccountBandStyle(account: IJiraIssueAccountSettings): string {
        if (this._settings.showColorBand) {
            return 'border-left: 3px solid ' + account.color
        }
        return ''
    }

    private renderSearchFooter(rootEl: HTMLElement, searchView: SearchView, searchResults: IJiraSearchResults): HTMLElement {
        const searchFooter = createDiv({ cls: 'search-footer' })
        createDiv({
            text: `Total results: ${searchResults.total.toString()} - ${searchResults.account.alias}`,
            parent: searchFooter,
        })
        const lastUpdateContainer = createDiv({ parent: searchFooter })
        const lastUpdateText = createSpan({
            text: `Last update: ${this._cache.getTime(searchView.getCacheKey())}`,
            parent: lastUpdateContainer,
        })
        const refreshButton = createEl('button', { parent: lastUpdateContainer, title: 'Refresh' })
        setIcon(refreshButton, 'sync-small')
        refreshButton.on('click', '.search-footer>button', () => {
            rootEl.empty()
            this._cache.delete(searchView.getCacheKey())
            this.render(searchView.toRawString(), rootEl, null)
        })
        return searchFooter
    }
}
