import { StateField } from "@codemirror/state"
import { Decoration, DecorationSet, EditorView, MatchDecorator, PluginSpec, PluginValue, ViewPlugin, ViewUpdate, WidgetType } from "@codemirror/view"
import { editorLivePreviewField } from "obsidian"
import { JiraClient } from "src/client/jiraClient"
import { IJiraIssue } from "src/client/jiraInterfaces"
import { ObjectsCache } from "src/objectsCache"
import { COMPACT_SYMBOL, SettingsData } from "src/settings"
import { RenderingCommon as RC } from "./renderingCommon"

class InlineIssueWidget extends WidgetType {
    private _issueKey: string
    private _compact: boolean
    private _htmlContainer: HTMLElement
    constructor(key: string, compact: boolean) {
        super()
        this._issueKey = key
        this._compact = compact
        this._htmlContainer = createSpan({ cls: 'ji-inline-issue jira-issue-container' })
        this.buildTag()
    }

    buildTag() {
        const cachedIssue = ObjectsCache.get(this._issueKey)
        if (cachedIssue) {
            if (cachedIssue.isError) {
                this._htmlContainer.replaceChildren(RC.renderIssueError(this._issueKey, cachedIssue.data as string))
            } else {
                this._htmlContainer.replaceChildren(RC.renderIssue(cachedIssue.data as IJiraIssue, this._compact))
            }
        } else {
            this._htmlContainer.replaceChildren(RC.renderLoadingItem(this._issueKey))
            JiraClient.getIssue(this._issueKey).then(newIssue => {
                const issue = ObjectsCache.add(this._issueKey, newIssue).data as IJiraIssue
                this._htmlContainer.replaceChildren(RC.renderIssue(issue, this._compact))
            }).catch(err => {
                ObjectsCache.add(this._issueKey, err, true)
                this._htmlContainer.replaceChildren(RC.renderIssueError(this._issueKey, err))
            })
        }
    }

    toDOM(view: EditorView): HTMLElement {
        return this._htmlContainer
    }
}

// Global variable with the last instance of the MatchDecorator rebuilt every time the settings are changed
let matchDecorator: MatchDecorator

function buildMatchDecorator() {
    return new MatchDecorator({
        regexp: new RegExp(`${SettingsData.inlineIssuePrefix}(${COMPACT_SYMBOL}?)([A-Z0-9]+-[0-9]+)`, 'g'),
        decoration: (match: RegExpExecArray, view: EditorView, pos: number) => {
            const compact = !!match[1]
            const key = match[2]
            const cursor = view.state.selection.main.head
            // TODO: improve this type cast
            if (!view.state.field(editorLivePreviewField as unknown as StateField<boolean>) || (cursor > pos - 1 && cursor < pos + match[0].length + 1)) {
                return Decoration.mark({
                    tagName: 'div',
                    class: 'HyperMD-codeblock HyperMD-codeblock-bg jira-issue-inline-mark',
                })
            } else {
                return Decoration.replace({
                    widget: new InlineIssueWidget(key, compact),
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
        // TODO: improve this type cast
        const editorModeChanged = update.startState.field(editorLivePreviewField as unknown as StateField<boolean>) !== update.state.field(editorLivePreviewField as unknown as StateField<boolean>)
        if (update.docChanged || update.startState.selection.main !== update.state.selection.main || editorModeChanged) {
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
    private _viewPlugin: ViewPlugin<ViewPluginClass>

    constructor() {
        this.update()
        this._viewPlugin = ViewPlugin.fromClass(ViewPluginClass, ViewPluginSpec)
    }

    update() {
        matchDecorator = buildMatchDecorator()
    }

    getViewPlugin(): ViewPlugin<ViewPluginClass> {
        return this._viewPlugin
    }
}