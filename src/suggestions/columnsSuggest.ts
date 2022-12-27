import { App, Editor, EditorPosition, EditorSuggest, EditorSuggestContext, EditorSuggestTriggerInfo, TFile } from "obsidian"
import { COMPACT_SYMBOL, ESearchColumnsTypes } from "../interfaces/settingsInterfaces"
import { SettingsData } from "../settings"

interface SuggestionEntry {
    name: string
    isCompact: boolean
    isCustomField: boolean
}

export class ColumnsSuggest extends EditorSuggest<SuggestionEntry> {

    constructor(app: App) {
        super(app)
    }

    onTrigger(cursor: EditorPosition, editor: Editor, file: TFile): EditorSuggestTriggerInfo | null {
        // console.log('onTrigger', { cursor, editor, file })
        const cursorLine = editor.getLine(cursor.line)
        // check line contains prefix "columns:"
        if (!cursorLine.match(/^\s*columns\s*:/)) {
            // console.log('!check line contains prefix "columns:"')
            return null
        }
        // check cursor is after "columns:"
        if (!cursorLine.substring(0, cursor.ch).match(/^\s*columns\s*:/)) {
            // console.log('!check cursor is after "columns:"')
            return null
        }
        // check cursor inside jira-search fence
        let jiraSearchFenceStartFound = false
        for (let i = cursor.line - 1; i >= 0; i--) {
            const line = editor.getLine(i)
            if (line.match(/^\s*```\s*jira-search/)) {
                jiraSearchFenceStartFound = true
                break
            }
        }
        if (!jiraSearchFenceStartFound) {
            // console.log('!check cursor inside jira-search fence')
            return null
        }

        const strBeforeCursor = cursorLine.substring(0, cursor.ch)
        const strAfterColumnsKey = strBeforeCursor.split(':').slice(1).join(':')
        const lastColumn = strAfterColumnsKey.split(',').pop()

        return {
            start: { line: cursor.line, ch: cursor.ch - lastColumn.length },
            end: cursor,
            query: lastColumn,
        }
    }

    getSuggestions(context: EditorSuggestContext): SuggestionEntry[] | Promise<SuggestionEntry[]> {
        const suggestions: SuggestionEntry[] = []
        let query = context.query.trim().toUpperCase()
        const isCompact = query.startsWith(COMPACT_SYMBOL)
        query = query.replace(new RegExp(`^${COMPACT_SYMBOL}`), '')

        // Standard fields
        if (!query.startsWith('$')) {
            for (const column of Object.values(ESearchColumnsTypes)) {
                if (suggestions.length >= this.limit) break
                if (column.startsWith(query) && column !== ESearchColumnsTypes.CUSTOM_FIELD) {
                    suggestions.push({
                        name: column,
                        isCompact: isCompact,
                        isCustomField: false,
                    })
                }
            }
        }
        // Custom fields
        query = query.replace(/^\$/, '')
        for (const column of SettingsData.cache.columns) {
            if (suggestions.length >= this.limit) break
            if (column.toUpperCase().startsWith(query)) {
                suggestions.push({
                    name: column,
                    isCompact: isCompact,
                    isCustomField: true,
                })
            }
        }

        return suggestions
    }

    renderSuggestion(value: SuggestionEntry, el: HTMLElement): void {
        // console.log('renderSuggestion', { value, el })
        if (value.isCompact) {
            el.createSpan({ text: COMPACT_SYMBOL, cls: 'jira-issue-suggestion is-compact' })
        }
        if (value.isCustomField) {
            el.createSpan({ text: '$', cls: 'jira-issue-suggestion is-custom-field' })
        }
        el.createSpan({ text: value.name, cls: 'jira-issue-suggestion' })
    }

    selectSuggestion(value: SuggestionEntry, evt: MouseEvent | KeyboardEvent): void {
        // console.log('selectSuggestion', { value, evt }, this.context)
        if (!this.context) return

        const selectedColumn = ' ' + (value.isCompact ? COMPACT_SYMBOL : '') + (value.isCustomField ? '$' : '') + value.name + ', '
        this.context.editor.replaceRange(selectedColumn, this.context.start, this.context.end, 'jira-issue')
    }
}