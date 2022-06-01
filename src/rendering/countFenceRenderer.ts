import { MarkdownPostProcessorContext } from "obsidian"
import { IJiraSearchResults } from "../client/jiraInterfaces"
import { JiraClient } from "../client/jiraClient"
import { ObjectsCache } from "../objectsCache"
import { RenderingCommon } from "./renderingCommon"

export class CountFenceRenderer {
    private _rc: RenderingCommon
    private _client: JiraClient
    private _cache: ObjectsCache

    constructor(renderingCommon: RenderingCommon, client: JiraClient, cache: ObjectsCache) {
        this._rc = renderingCommon
        this._client = client
        this._cache = cache
    }

    async render(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        // console.log(`Search query: ${source}`)
        const cachedSearchResults = this._cache.get(source)
        if (cachedSearchResults) {
            if (cachedSearchResults.isError) {
                this._rc.renderSearchError(el, source, cachedSearchResults.data)
            } else {
                this.renderSearchCount(el, (cachedSearchResults.data as IJiraSearchResults).total, source)
            }
        } else {
            this._rc.renderLoadingItem('View in browser', this._rc.searchUrl(source))
            this._client.getSearchResults(source, -1).then(newSearchResults => {
                const searchResults: IJiraSearchResults = this._cache.add(source, newSearchResults).data
                this.renderSearchCount(el, searchResults.total, source)
            }).catch(err => {
                this._cache.add(source, err, true)
                this._rc.renderSearchError(el, source, err)
            })
        }
    }

    private renderSearchCount(el: HTMLElement, searchResultsCount: number, query: string): void {
        const tagsRow = createDiv('ji-tags has-addons')
        createSpan({ cls: `ji-tag is-link ${this._rc.getTheme()}`, text: `Count`, title: query, parent: tagsRow })
        createSpan({ cls: `ji-tag ${this._rc.getTheme()}`, text: searchResultsCount.toString(), title: query, parent: tagsRow })
        el.replaceChildren(this._rc.renderContainer([tagsRow]))
    }
}