import { Decoration, DecorationSet, EditorView, MatchDecorator, PluginSpec, PluginValue, ViewPlugin, ViewUpdate, WidgetType } from "@codemirror/view"
import { COMPACT_SYMBOL, IJiraIssueSettings } from "src/settings"

class InlineIssueWidget extends WidgetType {
    private _key: string
    private _settings: IJiraIssueSettings
    constructor(key: string, settings: IJiraIssueSettings) {
        super()
        this._key = key
        this._settings = settings
    }

    toDOM(view: EditorView): HTMLElement {
        return createSpan({ text: this._key, cls: 'test2', title: 'widget' })
    }
}

// Global variable with the last instance of the MatchDecorator rebuilt every time the settings are changed
let matchDecorator: MatchDecorator

function buildMatchDecorator(settings: IJiraIssueSettings) {
    return new MatchDecorator({
        regexp: new RegExp(`${settings.inlineIssuePrefix}(${COMPACT_SYMBOL}?)([A-Z0-9]+-[0-9]+)`, 'g'),
        decoration: (match: RegExpExecArray, view: EditorView, pos: number) => {
            const key = match[2]
            const cursor = view.state.selection.main.head
            if (cursor > pos - 1 && cursor < pos + match[0].length + 1) {
                return Decoration.mark({
                    tagName: 'div',
                    class: 'HyperMD-codeblock HyperMD-codeblock-bg jira-issue-inline-mark',
                })
            } else {
                return Decoration.replace({
                    widget: new InlineIssueWidget(key, settings),
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
    private _settings: IJiraIssueSettings
    private _viewPlugin: ViewPlugin<ViewPluginClass>
    constructor(settings: IJiraIssueSettings) {
        this._settings = settings
        this.update()
        this._viewPlugin = ViewPlugin.fromClass(ViewPluginClass, ViewPluginSpec)
    }

    update() {
        matchDecorator = buildMatchDecorator(this._settings)
    }

    getViewPlugin(): ViewPlugin<ViewPluginClass> {
        return this._viewPlugin
    }
}