import { Decoration, DecorationSet, EditorView, MatchDecorator, PluginSpec, PluginValue, ViewPlugin, ViewUpdate, WidgetType } from "@codemirror/view"
import { COMPACT_SYMBOL, IJiraIssueSettings } from "src/settings"

class InlineIssueWidget extends WidgetType {
    private key: string
    constructor(key: string) {
        super()
        this.key = key
    }

    toDOM(view: EditorView): HTMLElement {
        return createSpan({ text: this.key, cls: 'test2', title: 'widget' })
    }
}

let matchDecorator: MatchDecorator

function buildMatchDecorator(settings: IJiraIssueSettings) {
    return new MatchDecorator({
        regexp: new RegExp(`${settings.inlineIssuePrefix}(${COMPACT_SYMBOL}?)([A-Z0-9]+-[0-9]+)`, 'g'),
        decoration: (match: RegExpExecArray, view: EditorView, pos: number) => {
            console.log({ match, view, pos })
            console.log(settings)
            const key = match[0]
            const cursor = view.state.selection.main.head
            if (cursor > pos - 1 && cursor < pos + match[0].length + 1) {
                return Decoration.mark({
                    tagName: 'div',
                    class: 'HyperMD-codeblock HyperMD-codeblock-bg jira-issue-inline-mark',
                })
            } else {
                return Decoration.replace({
                    widget: new InlineIssueWidget(key),
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