import { ESearchResultsRenderingTypes, ISearchColumn, SearchView } from '../src/searchView'

const kQuery = `status = 'In Progress' order by priority DESC`
const kLimit = '10'
const kComment = '# This is a comment'
const kType1 = 'TABLE'
const kType2 = 'LIST'
const kType3 = 'NOT_SUPPORTED'
const kColumns = 'KEY, SUMMARY, -ASSIGNEE, -REPORTER, STATUS, NOTES'

jest.mock('../src/settings', () => {
    return {
        COMMENT_REGEX: /^\s*#/,
        COMPACT_SYMBOL: '-',
        SettingsData: {},
    }
})

describe('SearchView', () => {

    describe('Constructor', () => {
        test('legacy query only', () => {
            const sv = SearchView.fromString(kQuery)
            expect(sv.query).toEqual(kQuery)
        })
        test('full basic query', () => {
            const sv = SearchView.fromString(`type: ${kType1}
query: ${kQuery}
limit: ${kLimit}
columns: ${kColumns}`)
            expect(sv.query).toEqual(kQuery)
            expect(sv.limit).toEqual(kLimit)
            expect(sv.type).toEqual(ESearchResultsRenderingTypes.TABLE)
            expect(sv.columns).toEqual([
                {
                    compact: false,
                    extra: '',
                    type: 'KEY',
                } as ISearchColumn,
                {
                    compact: false,
                    extra: '',
                    type: 'SUMMARY',
                } as ISearchColumn,
                {
                    compact: true,
                    extra: '',
                    type: 'ASSIGNEE',
                } as ISearchColumn,
                {
                    compact: true,
                    extra: '',
                    type: 'REPORTER',
                } as ISearchColumn,
                {
                    compact: false,
                    extra: '',
                    type: 'STATUS',
                } as ISearchColumn,
                {
                    compact: false,
                    extra: '',
                    type: 'NOTES',
                } as ISearchColumn,
            ])
            expect(sv.account).toBeNull()
        })

        test.todo('Comments')
        test.todo('Invalid keyword key')
        test.todo('Invalid type')
        test.todo('Invalid limit')
        test.todo('List type with custom columns')
        test.todo('Columns custom fields')
    })


    describe('Conversions', () => {
        let sv: SearchView = null
        beforeEach(() => {
            sv = SearchView.fromString(`type: ${kType1}
query: ${kQuery}
limit: ${kLimit}
columns: ${kColumns}`)
        })

        test('toRawString', () => {
            expect(sv.toRawString()).toEqual(`type: ${kType1}
query: ${kQuery}
limit: ${kLimit}
columns: ${kColumns}
`)
        })
        test('toString', () => {
            expect(sv.toString()).toEqual(`\`\`\`jira-search
type: ${kType1}
query: ${kQuery}
limit: ${kLimit}
columns: ${kColumns}
\`\`\``)
        })
        test('getCacheKey', () => {
            expect(sv.getCacheKey()).toEqual(`${kQuery}${kLimit}`)
        })
    })

})

export { }