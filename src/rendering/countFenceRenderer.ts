import { MarkdownPostProcessorContext } from "obsidian"
import { IJiraSearchResults } from "../interfaces/issueInterfaces"
import { JiraClient } from "../client/jiraClient"
import { ObjectsCache } from "../objectsCache"
import { RenderingCommon as RC } from "./renderingCommon"
import { SearchView } from "src/searchView"

function renderSearchCount(el: HTMLElement, searchResults: IJiraSearchResults, query: string): void {
    const tagsRow = createDiv('ji-tags has-addons')
    RC.renderAccountColorBand(searchResults.account, tagsRow)
    createSpan({ cls: `ji-tag is-link ${RC.getTheme()}`, text: `Count`, title: query, parent: tagsRow })
    createSpan({ cls: `ji-tag ${RC.getTheme()}`, text: searchResults.total.toString(), title: query, parent: tagsRow })
    el.replaceChildren(RC.renderContainer([tagsRow]))
}

export const CountFenceRenderer = async (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> => {
    // console.log(`Search query: ${source}`)
    const cachedSearchResults = ObjectsCache.get(source)
    if (cachedSearchResults) {
        if (cachedSearchResults.isError) {
            RC.renderSearchError(el, source, cachedSearchResults.data as SearchView)
        } else {
            renderSearchCount(el, (cachedSearchResults.data as IJiraSearchResults), source)
        }
    } else {
        RC.renderLoadingItem('Loading...')
        JiraClient.getSearchResults(source, -1).then(newSearchResults => {
            const searchResults = ObjectsCache.add(source, newSearchResults).data as IJiraSearchResults
            renderSearchCount(el, searchResults, source)
        }).catch(err => {
            ObjectsCache.add(source, err, true)
            RC.renderSearchError(el, source, err)
        })
    }
}
