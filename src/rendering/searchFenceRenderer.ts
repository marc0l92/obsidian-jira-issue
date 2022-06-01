import { MarkdownPostProcessorContext, TFile, Vault } from "obsidian"
import { createProxy, IJiraIssue, IJiraSearchResults } from "../client/jiraInterfaces"
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

    async render(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        // console.log(`Search query: ${source}`)
        try {
            const searchView = new SearchView(this._settings).fromString(source)

            const cachedSearchResults = this._cache.get(searchView.query + searchView.limit)
            if (cachedSearchResults) {
                if (cachedSearchResults.isError) {
                    this._rc.renderSearchError(el, cachedSearchResults.data, searchView)
                } else {
                    this.renderSearchResults(el, searchView, cachedSearchResults.data)
                }
            } else {
                // console.log(`Search results not available in the cache`)
                this._rc.renderLoadingItem('View in browser', this._rc.searchUrl(searchView.query))
                this._client.getSearchResults(searchView.query, parseInt(searchView.limit) || this._settings.searchResultsLimit)
                    .then(newSearchResults => {
                        const searchResults: IJiraSearchResults = this._cache.add(searchView.query + searchView.limit, newSearchResults).data
                        this.renderSearchResults(el, searchView, searchResults)
                    }).catch(err => {
                        this._cache.add(searchView.query + searchView.limit, err, true)
                        this._rc.renderSearchError(el, err, searchView)
                    })
            }
        } catch (err) {
            this._rc.renderSearchError(el, err, null)
        }
    }

    private renderSearchResults(el: HTMLElement, searchView: SearchView, searchResults: IJiraSearchResults): void {
        if (searchView.type === ESearchResultsRenderingTypes.LIST) {
            this.renderSearchResultsList(el, searchResults)
        } else {
            this.renderSearchResultsTable(el, searchView, searchResults)
        }
    }


    private renderSearchResultsTable(el: HTMLElement, searchView: SearchView, searchResults: IJiraSearchResults): void {
        const table = createEl('table', { cls: `table is-bordered is-striped is-narrow is-hoverable is-fullwidth ${this._rc.getTheme()}` })
        this.renderSearchResultsTableHeader(table, searchView)
        this.renderSearchResultsTableBody(table, searchResults, searchView)
        const statistics = createSpan({ cls: 'statistics', text: `Total results: ${searchResults.total.toString()} - Last update: ${this._cache.getTime(searchView.query + searchView.limit)}` })
        el.replaceChildren(this._rc.renderContainer([table, statistics]))
    }

    private renderSearchResultsTableHeader(table: HTMLElement, searchView: SearchView): void {
        const header = createEl('tr', { parent: createEl('thead', { parent: table }) })
        const columns = searchView.columns.length > 0 ? searchView.columns : this._settings.searchColumns
        for (const column of columns) {
            let name = SEARCH_COLUMNS_DESCRIPTION[column.type]
            // Frontmatter
            if (column.type === ESearchColumnsTypes.NOTES && column.extra) {
                name = column.extra
            }
            // Custom field
            if (column.type === ESearchColumnsTypes.CUSTOM_FIELD) {
                name = this._settings.customFieldsIdToName[column.extra]
            }
            if (column.compact) {
                createEl('th', { text: name[0].toUpperCase(), attr: { 'aria-label-position': 'top', 'aria-label': column.type }, parent: header })
            } else {
                createEl('th', { text: name, title: column.type, parent: header })
            }
        }
    }

    private renderSearchResultsTableBody(table: HTMLElement, searchResults: IJiraSearchResults, searchView: SearchView): void {
        const tbody = createEl('tbody', { parent: table })
        for (let issue of searchResults.issues) {
            issue = createProxy(issue)
            const row = createEl('tr', { parent: tbody })
            const columns = searchView.columns.length > 0 ? searchView.columns : this._settings.searchColumns
            renderTableColumn(columns, issue, row, this._rc)
        }
    }

    private renderSearchResultsList(el: HTMLElement, searchResults: IJiraSearchResults): void {
        const list: HTMLElement[] = []
        for (const issue of searchResults.issues) {
            list.push(this._rc.renderIssue(issue))
        }
        el.replaceChildren(this._rc.renderContainer(list))
    }
}