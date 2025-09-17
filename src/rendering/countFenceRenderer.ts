import { MarkdownPostProcessorContext } from "obsidian"
import { IJiraSearchResults } from "../interfaces/issueInterfaces"
import JiraClient from "../client/jiraClient"
import ObjectsCache from "../objectsCache"
import RC from "./renderingCommon"
import { SearchView } from "../searchView"

function renderSearchCount(el: HTMLElement, searchResults: IJiraSearchResults, searchView: SearchView): void {
    const tagsRow = createDiv('ji-tags has-addons')
    RC.renderAccountColorBand(searchResults.account, tagsRow)
    if (searchView.label !== '') {
        createSpan({ cls: `ji-tag is-link ${RC.getTheme()}`, text: searchView.label || `Count`, title: searchView.query, parent: tagsRow })
    }
    
    // Handle API v3 pagination - no total count available
    let countText: string
    if (searchResults.total !== undefined) {
        // Legacy API v2 response with total count
        countText = searchResults.total.toString()
    } else {
        // API v3 response - show current results and pagination status
        const currentCount = searchResults.issues?.length || 0
        if (searchResults.isLast) {
            countText = currentCount.toString()
        } else {
            countText = `${currentCount}+`
        }
    }
    
    createSpan({ cls: `ji-tag ${RC.getTheme()}`, text: countText, title: searchView.query, parent: tagsRow })
    el.replaceChildren(RC.renderContainer([tagsRow]))
}

export const CountFenceRenderer = async (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> => {
    // console.log(`Search query: ${source}`)
    const searchView = SearchView.fromString(source)
    const cachedSearchResults = ObjectsCache.get(searchView.getCacheKey())
    if (cachedSearchResults) {
        if (cachedSearchResults.isError) {
            RC.renderSearchError(el, cachedSearchResults.data as string, searchView)
        } else {
            renderSearchCount(el, (cachedSearchResults.data as IJiraSearchResults), searchView)
        }
    } else {
        RC.renderLoadingItem('Loading...')
        JiraClient.getSearchResults(searchView.query, { limit: 1 }).then(newSearchResults => {
            const searchResults = ObjectsCache.add(searchView.getCacheKey(), newSearchResults).data as IJiraSearchResults
            renderSearchCount(el, searchResults, searchView)
        }).catch(err => {
            ObjectsCache.add(searchView.getCacheKey(), err, true)
            RC.renderSearchError(el, err, searchView)
        })
    }
}
