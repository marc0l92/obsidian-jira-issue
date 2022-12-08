import { StateField } from "@codemirror/state"
import { Decoration, DecorationSet, EditorView, MatchDecorator, PluginSpec, PluginValue, ViewPlugin, ViewUpdate, WidgetType } from "@codemirror/view"
import { editorLivePreviewField } from "obsidian"
import { JiraClient } from "src/client/jiraClient"
import { IJiraIssue } from "src/client/jiraInterfaces"
import { ObjectsCache } from "src/objectsCache"
import { COMPACT_SYMBOL, SettingsData } from "src/settings"
import { RenderingCommon as RC } from "./renderingCommon"
import escapeStringRegexp from 'escape-string-regexp'
import { getAccountByHost } from "src/utils"

function escapeRegexp(str: string): string {
    return escapeStringRegexp(str).replace(/\//g, '\\/')
}

class InlineIssueWidget extends WidgetType {
    private _issueKey: string
    private _compact: boolean
    private _host: string
    private _htmlContainer: HTMLElement
    constructor(key: string, compact: boolean, host: string = null) {
        super()
        this._issueKey = key
        this._compact = compact
        this._host = host
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
            JiraClient.getIssue(this._issueKey, getAccountByHost(this._host)).then(newIssue => {
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
let jiraTagMatchDecorator: MatchDecorator
let jiraUrlMatchDecorator: MatchDecorator

function buildMatchDecorators() {
    jiraTagMatchDecorator = new MatchDecorator({
        regexp: new RegExp(`${SettingsData.inlineIssuePrefix}(${COMPACT_SYMBOL}?)([A-Z0-9]+-[0-9]+)`, 'g'),
        decoration: (match: RegExpExecArray, view: EditorView, pos: number) => {
            const compact = !!match[1]
            const key = match[2]
            const cursor = view.state.selection.main.head
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

    const urls: string[] = []
    SettingsData.accounts.forEach(account => urls.push(escapeRegexp(account.host)))
    jiraUrlMatchDecorator = new MatchDecorator({
        regexp: new RegExp(`(${COMPACT_SYMBOL}?)(${urls.join('|')})/browse/([A-Z0-9]+-[0-9]+)`, 'g'),
        decoration: (match: RegExpExecArray, view: EditorView, pos: number) => {
            const compact = !!match[1]
            const host = match[2]
            const key = match[3]
            const cursor = view.state.selection.main.head
            if (!view.state.field(editorLivePreviewField as unknown as StateField<boolean>) || (cursor > pos - 1 && cursor < pos + match[0].length + 1)) {
                return Decoration.mark({
                    tagName: 'div',
                    class: 'HyperMD-codeblock HyperMD-codeblock-bg jira-issue-inline-mark',
                })
            } else {
                return Decoration.replace({
                    widget: new InlineIssueWidget(key, compact, host),
                })
            }
        }
    })
}

function buildViewPluginClass(matchDecorator: MatchDecorator) {
    class ViewPluginClass implements PluginValue {
        decorators: DecorationSet

        constructor(view: EditorView) {
            this.decorators = matchDecorator.createDeco(view)
        }

        update(update: ViewUpdate): void {
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

    return {
        class: ViewPluginClass,
        spec: ViewPluginSpec,
    }
}



export class ViewPluginManager {
    private _viewPlugins: ViewPlugin<PluginValue>[]

    constructor() {
        this.update()
        const jiraTagViewPlugin = buildViewPluginClass(jiraTagMatchDecorator)
        const jiraUrlViewPlugin = buildViewPluginClass(jiraUrlMatchDecorator)
        this._viewPlugins = [
            ViewPlugin.fromClass(jiraTagViewPlugin.class, jiraTagViewPlugin.spec),
            ViewPlugin.fromClass(jiraUrlViewPlugin.class, jiraUrlViewPlugin.spec),
        ]
    }

    update() {
        buildMatchDecorators()
    }

    getViewPlugins(): ViewPlugin<any>[] {
        return this._viewPlugins
    }
}