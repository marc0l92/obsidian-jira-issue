import { Decoration, DecorationSet, EditorView, MatchDecorator, PluginSpec, PluginValue, ViewPlugin, ViewUpdate, WidgetType } from "@codemirror/view"
import { JiraClient } from "src/client/jiraClient"
import { IJiraIssue } from "src/client/jiraInterfaces"
import { ObjectsCache } from "src/objectsCache"
import { COMPACT_SYMBOL, IJiraIssueSettings } from "src/settings"
import { RenderingCommon } from "./renderingCommon"

class InlineIssueWidget extends WidgetType {
    private _issueKey: string
    private _compact: boolean
    private _rc: RenderingCommon
    private _client: JiraClient
    private _cache: ObjectsCache
    private _htmlContainer: HTMLElement
    constructor(key: string, compact: boolean, renderingCommon: RenderingCommon, client: JiraClient, cache: ObjectsCache) {
        super()
        this._issueKey = key
        this._compact = compact
        this._rc = renderingCommon
        this._client = client
        this._cache = cache
        this._htmlContainer = createSpan({ cls: 'ji-inline-issue jira-issue-container' })
        this.buildTag()
    }

    buildTag() {
        const cachedIssue = this._cache.get(this._issueKey)
        if (cachedIssue) {
            if (cachedIssue.isError) {
                this._htmlContainer.replaceChildren(this._rc.renderIssueError(this._issueKey, cachedIssue.data))
            } else {
                this._htmlContainer.replaceChildren(this._rc.renderIssue(cachedIssue.data, this._compact))
            }
        } else {
            this._htmlContainer.replaceChildren(this._rc.renderLoadingItem(this._issueKey, this._rc.issueUrl(this._issueKey)))
            this._client.getIssue(this._issueKey).then(newIssue => {
                const issue: IJiraIssue = this._cache.add(this._issueKey, newIssue).data
                this._htmlContainer.replaceChildren(this._rc.renderIssue(issue, this._compact))
            }).catch(err => {
                this._cache.add(this._issueKey, err, true)
                this._htmlContainer.replaceChildren(this._rc.renderIssueError(this._issueKey, err))
            })
        }
    }

    // TODO: do not render if source mode instead of live preview
    toDOM(view: EditorView): HTMLElement {
        return this._htmlContainer
    }
}

// Global variable with the last instance of the MatchDecorator rebuilt every time the settings are changed
let matchDecorator: MatchDecorator

function buildMatchDecorator(renderingCommon: RenderingCommon, settings: IJiraIssueSettings, client: JiraClient, cache: ObjectsCache) {
    return new MatchDecorator({
        regexp: new RegExp(`${settings.inlineIssuePrefix}(${COMPACT_SYMBOL}?)([A-Z0-9]+-[0-9]+)`, 'g'),
        decoration: (match: RegExpExecArray, view: EditorView, pos: number) => {
            const compact = !!match[1]
            const key = match[2]
            const cursor = view.state.selection.main.head
            if (cursor > pos - 1 && cursor < pos + match[0].length + 1) {
                return Decoration.mark({
                    tagName: 'div',
                    class: 'HyperMD-codeblock HyperMD-codeblock-bg jira-issue-inline-mark',
                })
            } else {
                return Decoration.replace({
                    widget: new InlineIssueWidget(key, compact, renderingCommon, client, cache),
                })
            }
        }
    })
}


class ViewPluginClass implements PluginValue {
    decorators: DecorationSet

    constructor(view: EditorView) {
        this.decorators = matchDecorator.createDeco(view)
    }

    update(update: ViewUpdate): void {
        if (update.docChanged || update.startState.selection.main !== update.state.selection.main) {
            this.decorators = matchDecorator.createDeco(update.view)
        }
    }

    destroy(): void {
        this.decorators = null
    }
}

const ViewPluginSpec: PluginSpec<ViewPluginClass> = {
    decorations: viewPlugin => viewPlugin.decorators,
}

export class ViewPluginManager {
    private _rc: RenderingCommon
    private _settings: IJiraIssueSettings
    private _viewPlugin: ViewPlugin<ViewPluginClass>
    private _client: JiraClient
    private _cache: ObjectsCache

    constructor(renderingCommon: RenderingCommon, settings: IJiraIssueSettings, client: JiraClient, cache: ObjectsCache) {
        this._rc = renderingCommon
        this._settings = settings
        this._client = client
        this._cache = cache
        this.update()
        this._viewPlugin = ViewPlugin.fromClass(ViewPluginClass, ViewPluginSpec)
    }

    update() {
        matchDecorator = buildMatchDecorator(this._rc, this._settings, this._client, this._cache)
    }

    getViewPlugin(): ViewPlugin<ViewPluginClass> {
        return this._viewPlugin
    }
}