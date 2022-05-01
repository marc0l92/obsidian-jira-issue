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
    TYPE = 'TYPE',
    CREATED = 'CREATED',
    UPDATED = 'UPDATED',
    REPORTER = 'REPORTER',
    ASSIGNEE = 'ASSIGNEE',
    PRIORITY = 'PRIORITY',
    STATUS = 'STATUS',
    DUE_DATE = 'DUE_DATE',
    // CUSTOM = 'CUSTOM',
}
export const SEARCH_COLUMNS_DESCRIPTION = {
    [ESearchColumnsTypes.KEY]: 'Key',
    [ESearchColumnsTypes.SUMMARY]: 'Summary',
    [ESearchColumnsTypes.TYPE]: 'Type',
    [ESearchColumnsTypes.CREATED]: 'Created',
    [ESearchColumnsTypes.UPDATED]: 'Updated',
    [ESearchColumnsTypes.REPORTER]: 'Reporter',
    [ESearchColumnsTypes.ASSIGNEE]: 'Assignee',
    [ESearchColumnsTypes.PRIORITY]: 'Priority',
    [ESearchColumnsTypes.STATUS]: 'Status',
    [ESearchColumnsTypes.DUE_DATE]: 'Due Date',
    // [ESearchColumnsTypes.CUSTOM]: 'Custom',
}

export interface ISearchColumn {
    type: ESearchColumnsTypes
    compact: boolean
    customField?: string
}

export class SearchView {
    type: ESearchResultsRenderingTypes = ESearchResultsRenderingTypes.TABLE
    query: string = ''
    limit: string = ''
    columns: ISearchColumn[] = []

    fromString(str: string): SearchView {
        for (const line of str.split('\n')) {
            if (line && !line.trimStart().startsWith('#')) {
                let [key, value] = line.split(':')

                if (!value) {
                    this.type = ESearchResultsRenderingTypes.TABLE
                    this.query = str
                    this.limit = ''
                    this.columns = []
                    break
                }

                switch (key) {
                    case 'type':
                        value = value.trim()
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
                        this.columns = value.split(',').map(column => {
                            const compact = column.trim().startsWith('#')
                            column = column.trim().replace('#', '').toUpperCase()
                            if (!(column in ESearchColumnsTypes)) {
                                throw new Error(`Invalid column: ${column}`)
                            }
                            return {
                                type: column as ESearchColumnsTypes,
                                compact: compact,
                                customField: '',
                            }
                        })
                        break
                    default:
                        throw new Error(`Invalid key: ${key}`)
                }
            }
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
            result += `columns: ${this.columns.map(c => (c.compact ? '#' : '') + c.type).join(', ')}\n`
        }
        return result + '```'
    }
}