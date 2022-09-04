import { COMMENT_REGEX, COMPACT_SYMBOL, IJiraIssueSettings } from "./settings"

export enum ESearchResultsRenderingTypes {
    TABLE = 'TABLE',
    LIST = 'LIST',
}
export const SEARCH_RESULTS_RENDERING_TYPE_DESCRIPTION = {
    [ESearchResultsRenderingTypes.TABLE]: 'Table',
    [ESearchResultsRenderingTypes.LIST]: 'List',
}

export enum ESearchColumnsTypes {
    KEY = 'KEY',
    SUMMARY = 'SUMMARY',
    DESCRIPTION = 'DESCRIPTION',
    TYPE = 'TYPE',
    CREATED = 'CREATED',
    UPDATED = 'UPDATED',
    REPORTER = 'REPORTER',
    ASSIGNEE = 'ASSIGNEE',
    PRIORITY = 'PRIORITY',
    STATUS = 'STATUS',
    DUE_DATE = 'DUE_DATE',
    RESOLUTION = 'RESOLUTION',
    RESOLUTION_DATE = 'RESOLUTION_DATE',
    PROJECT = 'PROJECT',
    ENVIRONMENT = 'ENVIRONMENT',
    AGGREGATE_PROGRESS = 'AGGREGATE_PROGRESS',
    AGGREGATE_TIME_ESTIMATED = 'AGGREGATE_TIME_ESTIMATED',
    AGGREGATE_TIME_ORIGINAL_ESTIMATE = 'AGGREGATE_TIME_ORIGINAL_ESTIMATE',
    AGGREGATE_TIME_SPENT = 'AGGREGATE_TIME_SPENT',
    FIX_VERSIONS = 'FIX_VERSIONS',
    // LINKS = 'LINKS',  // Example with: key=STORM-1612
    LABELS = 'LABELS',
    COMPONENTS = 'COMPONENTS',
    LAST_VIEWED = 'LAST_VIEWED',
    PROGRESS = 'PROGRESS',
    // SUBTASKS = 'SUBTASKS',
    TIME_ESTIMATE = 'TIME_ESTIMATE',
    TIME_ORIGINAL_ESTIMATE = 'TIME_ORIGINAL_ESTIMATE',
    TIME_SPENT = 'TIME_SPENT',

    CUSTOM_FIELD = 'CUSTOM_FIELD',
    NOTES = 'NOTES',
}
export const SEARCH_COLUMNS_DESCRIPTION = {
    [ESearchColumnsTypes.KEY]: 'Key',
    [ESearchColumnsTypes.SUMMARY]: 'Summary',
    [ESearchColumnsTypes.DESCRIPTION]: 'Description',
    [ESearchColumnsTypes.TYPE]: 'Type',
    [ESearchColumnsTypes.CREATED]: 'Created',
    [ESearchColumnsTypes.UPDATED]: 'Updated',
    [ESearchColumnsTypes.REPORTER]: 'Reporter',
    [ESearchColumnsTypes.ASSIGNEE]: 'Assignee',
    [ESearchColumnsTypes.PRIORITY]: 'Priority',
    [ESearchColumnsTypes.STATUS]: 'Status',
    [ESearchColumnsTypes.DUE_DATE]: 'Due Date',
    [ESearchColumnsTypes.RESOLUTION]: 'Resolution',
    [ESearchColumnsTypes.RESOLUTION_DATE]: 'Resolution Date',
    [ESearchColumnsTypes.PROJECT]: 'Project',
    [ESearchColumnsTypes.ENVIRONMENT]: 'Environment',
    [ESearchColumnsTypes.AGGREGATE_PROGRESS]: '#Progress',
    [ESearchColumnsTypes.AGGREGATE_TIME_ESTIMATED]: '#🕑Estimated',
    [ESearchColumnsTypes.AGGREGATE_TIME_ORIGINAL_ESTIMATE]: '#🕑Original Estimate',
    [ESearchColumnsTypes.AGGREGATE_TIME_SPENT]: '#🕑Spent',
    [ESearchColumnsTypes.FIX_VERSIONS]: 'Fix Versions',
    // [ESearchColumnsTypes.LINKS]: 'Links', // TODO
    [ESearchColumnsTypes.LABELS]: 'Labels',
    [ESearchColumnsTypes.COMPONENTS]: 'Components',
    [ESearchColumnsTypes.LAST_VIEWED]: 'Last Viewed',
    [ESearchColumnsTypes.PROGRESS]: 'Progress',
    // [ESearchColumnsTypes.SUBTASKS]: 'Subtasks', // TODO
    [ESearchColumnsTypes.TIME_ESTIMATE]: '🕑Estimate',
    [ESearchColumnsTypes.TIME_ORIGINAL_ESTIMATE]: '🕑Original Estimate',
    [ESearchColumnsTypes.TIME_SPENT]: '🕑Spent',

    [ESearchColumnsTypes.CUSTOM_FIELD]: 'Custom field',
    [ESearchColumnsTypes.NOTES]: 'Notes',
}

export interface ISearchColumn {
    type: ESearchColumnsTypes
    compact: boolean
    extra?: string
}

export class SearchView {
    type: ESearchResultsRenderingTypes = ESearchResultsRenderingTypes.TABLE
    query = ''
    limit = ''
    columns: ISearchColumn[] = []
    private _settings: IJiraIssueSettings

    constructor(settings: IJiraIssueSettings) {
        this._settings = settings
    }

    fromString(str: string): SearchView {
        for (const line of str.split('\n')) {
            if (line.trim() && !COMMENT_REGEX.test(line)) {
                const [key, ...values] = line.split(':')
                const value = values.join(':').trim()

                if (!value) {
                    // Basic mode with only the query
                    this.query = line
                } else {
                    // Advanced mode with key value structure
                    switch (key.trim().toLowerCase()) {
                        case 'type':
                            if (value.toUpperCase() in ESearchResultsRenderingTypes) {
                                this.type = value.toUpperCase() as ESearchResultsRenderingTypes
                            } else {
                                throw new Error(`Invalid type: ${value}`)
                            }
                            break
                        case 'query':
                            this.query = value
                            break
                        case 'limit':
                            if (parseInt(value)) {
                                this.limit = parseInt(value).toString()
                            } else {
                                throw new Error(`Invalid limit: ${value}`)
                            }
                            break
                        case 'columns':
                            this.columns = value.split(',')
                                .filter(column => column.trim())
                                .map(column => {
                                    let columnExtra = ''
                                    // Compact
                                    const compact = column.trim().startsWith(COMPACT_SYMBOL)
                                    column = column.trim().replace(new RegExp(`^${COMPACT_SYMBOL}`), '')
                                    // Frontmatter
                                    if (column.toUpperCase().startsWith('NOTES.')) {
                                        const split = column.split('.')
                                        column = split.splice(0, 1)[0]
                                        columnExtra = split.join('.')
                                    }
                                    // Custom field
                                    if (column.toUpperCase().startsWith('$')) {
                                        const customFieldInput = column.slice(1)
                                        column = ESearchColumnsTypes.CUSTOM_FIELD
                                        if (Number(customFieldInput)) {
                                            // Custom field provided as number
                                            if (!(customFieldInput in this._settings.customFieldsIdToName)) {
                                                throw new Error(`Custom field with id ${customFieldInput} not found`)
                                            }
                                            columnExtra = customFieldInput
                                        } else {
                                            // Custom field provided as name
                                            columnExtra = this._settings.customFieldsNameToId[customFieldInput]
                                            if (!columnExtra) {
                                                throw new Error(`Custom field with name "${customFieldInput}" not found`)
                                            }
                                        }
                                    }
                                    // Check validity
                                    column = column.toUpperCase()
                                    if (!(column in ESearchColumnsTypes)) {
                                        if (column.startsWith('#')) {
                                            throw new Error(`Please replace the symbol "#" with "${COMPACT_SYMBOL}" to use the compact format`)
                                        }
                                        throw new Error(`Invalid column: ${column}`)
                                    }
                                    return {
                                        type: column as ESearchColumnsTypes,
                                        compact: compact,
                                        extra: columnExtra,
                                    }
                                })
                            break
                        default:
                            throw new Error(`Invalid key: ${key}`)
                    }
                }
            }
        }
        if (this.type === ESearchResultsRenderingTypes.LIST && this.columns.length > 0) {
            throw new Error('type LIST and custom columns are not compatible options')
        }
        return this
    }

    toString(): string {
        let result = '```jira-search\n'
        result += `type: ${this.type}\n`
        result += `query: ${this.query}\n`
        if (this.limit) {
            result += `limit: ${this.limit}\n`
        }
        if (this.columns.length > 0) {
            result += `columns: ${this.columns.map(c => (c.compact ? COMPACT_SYMBOL : '') + c.type).join(', ')}\n`
        }
        return result + '```'
    }
}