import { MarkdownPostProcessorContext, setIcon } from "obsidian"
import { toDefaultedIssue, IJiraSearchResults } from "../interfaces/issueInterfaces"
import JiraClient from "../client/jiraClient"
import ObjectsCache from "../objectsCache"
import { renderTableColumn } from "./renderTableColumns"
import { SearchView } from "../searchView"
import { SettingsData } from "../settings"
import RC from "./renderingCommon"
import { ESearchColumnsTypes, ESearchResultsRenderingTypes, IJiraIssueAccountSettings, SEARCH_COLUMNS_DESCRIPTION } from "../interfaces/settingsInterfaces"


async function renderSearchResults(rootEl: HTMLElement, searchView: SearchView, searchResults: IJiraSearchResults): Promise<void> {
    searchView.account = searchResults.account
    if (searchView.type === ESearchResultsRenderingTypes.LIST) {
        renderSearchResultsList(rootEl, searchResults)
    } else {
        await renderSearchResultsTable(rootEl, searchView, searchResults)
    }
}

async function renderSearchResultsTable(rootEl: HTMLElement, searchView: SearchView, searchResults: IJiraSearchResults): Promise<void> {
    const table = createEl('table', { cls: `table is-bordered is-striped is-narrow is-hoverable is-fullwidth ${RC.getTheme()}` })
    renderSearchResultsTableHeader(table, searchView, searchResults.account)
    await renderSearchResultsTableBody(table, searchView, searchResults)

    const footer = renderSearchFooter(rootEl, searchView, searchResults)
    rootEl.replaceChildren(RC.renderContainer([table, footer]))
}

function renderSearchResultsTableHeader(table: HTMLElement, searchView: SearchView, account: IJiraIssueAccountSettings): void {
    const header = createEl('tr', {
        parent:
            createEl('thead', { attr: { style: getAccountBandStyle(searchView.account) }, parent: table })
    })
    const columns = searchView.columns.length > 0 ? searchView.columns : SettingsData.searchColumns
    for (const column of columns) {
        let name = SEARCH_COLUMNS_DESCRIPTION[column.type]
        // Frontmatter
        if (column.type === ESearchColumnsTypes.NOTES && column.extra) {
            name = column.extra
        }
        // Custom field
        if (column.type === ESearchColumnsTypes.CUSTOM_FIELD) {
            if (Number(column.extra)) {
                name = account.cache.customFieldsIdToName[column.extra]
            } else {
                name = column.extra
            }
        }
        if (column.compact) {
            createEl('th', { text: name[0].toUpperCase(), attr: { 'aria-label-position': 'top', 'aria-label': column.type }, parent: header })
        } else {
            createEl('th', { text: name, title: column.type, parent: header })
        }
    }
}

async function renderSearchResultsTableBody(table: HTMLElement, searchView: SearchView, searchResults: IJiraSearchResults): Promise<void> {
    const tbody = createEl('tbody', { parent: table })
    for (let issue of searchResults.issues) {
        issue = toDefaultedIssue(issue)
        const row = createEl('tr', { parent: tbody })
        const columns = searchView.columns.length > 0 ? searchView.columns : SettingsData.searchColumns
        await renderTableColumn(columns, issue, row)
    }
}

function renderSearchResultsList(rootEl: HTMLElement, searchResults: IJiraSearchResults): void {
    const list: HTMLElement[] = []
    for (const issue of searchResults.issues) {
        list.push(RC.renderIssue(issue))
    }
    rootEl.replaceChildren(RC.renderContainer(list))
}

function getAccountBandStyle(account: IJiraIssueAccountSettings): string {
    if (SettingsData.showColorBand) {
        return 'border-left: 3px solid ' + account.color
    }
    return ''
}

function renderSearchFooter(rootEl: HTMLElement, searchView: SearchView, searchResults: IJiraSearchResults): HTMLElement {
    const searchFooter = createDiv({ cls: 'search-footer' })
    
    // Debug: Log the search results structure to understand the API response
    SettingsData.logRequestsResponses && console.log('JiraIssue:SearchResults structure:', {
        total: searchResults.total,
        maxResults: searchResults.maxResults,
        startAt: searchResults.startAt,
        issuesLength: searchResults.issues?.length,
        isLast: searchResults.isLast,
        nextPageToken: searchResults.nextPageToken,
        searchResults: searchResults
    })
    
    // Handle API v3 pagination - no total count available
    const alias = searchResults.account?.alias || 'Unknown'
    let searchCount: string
    
    if (searchResults.total !== undefined) {
        // Legacy API v2 response with total count
        searchCount = `Total results: ${searchResults.total.toString()} - ${alias}`
    } else {
        // API v3 response - show current results and pagination status
        const currentCount = searchResults.issues?.length || 0
        if (searchResults.isLast) {
            searchCount = `Results: ${currentCount.toString()} (all results) - ${alias}`
        } else {
            searchCount = `Results: ${currentCount.toString()}+ (more available) - ${alias}`
        }
    }

    if(SettingsData.showJiraLink) {
        createEl('a', {
            text: searchCount,
            href: RC.searchUrl(searchView.account, searchView.query),
            parent: searchFooter,
        })
    } else {
        createDiv({
            text: searchCount,
            parent: searchFooter,
        })
    }

    const lastUpdateContainer = createDiv({ parent: searchFooter })
    createSpan({
        text: `Last update: ${ObjectsCache.getTime(searchView.getCacheKey())}`,
        parent: lastUpdateContainer,
    })
    const refreshButton = createEl('button', { parent: lastUpdateContainer, title: 'Refresh', cls: 'rotate-animation' })
    setIcon(refreshButton, 'sync-small')
    refreshButton.onClickEvent(() => {
        rootEl.empty()
        ObjectsCache.delete(searchView.getCacheKey())
        SearchFenceRenderer(searchView.toRawString(), rootEl, null)
    })
    return searchFooter
}

export const SearchFenceRenderer = async (source: string, rootEl: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> => {
    // console.log(`Search query: ${source}`)
    try {
        const searchView = SearchView.fromString(source)

        const cachedSearchResults = ObjectsCache.get(searchView.getCacheKey())
        if (cachedSearchResults) {
            if (cachedSearchResults.isError) {
                RC.renderSearchError(rootEl, cachedSearchResults.data as string, searchView)
            } else {
                await renderSearchResults(rootEl, searchView, cachedSearchResults.data as IJiraSearchResults)
            }
        } else {
            // console.log(`Search results not available in the cache`)
            RC.renderLoadingItem('Loading...')
            JiraClient.getSearchResults(searchView.query, { limit: searchView.limit || SettingsData.searchResultsLimit, account: searchView.account })
                .then(newSearchResults => {
                    searchView.account = newSearchResults.account
                    const searchResults = ObjectsCache.add(searchView.getCacheKey(), newSearchResults).data as IJiraSearchResults
                    renderSearchResults(rootEl, searchView, searchResults)
                }).catch(err => {
                    ObjectsCache.add(searchView.getCacheKey(), err, true)
                    RC.renderSearchError(rootEl, err, searchView)
                })
        }
    } catch (err) {
        RC.renderSearchError(rootEl, err, null)
    }
}
