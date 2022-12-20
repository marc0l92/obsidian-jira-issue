import { COMPACT_SYMBOL } from '../src/interfaces/settingsInterfaces'
import { ESearchResultsRenderingTypes, ISearchColumn, SearchView } from '../src/searchView'
import { TestAccountOpen } from './testCommon'

const kQuery = `status = 'In Progress' order by priority DESC`
const kLimit = '10'
const kLimitInvalid = 'xx'
const kComment = '# This is a comment'
const kType = 'TABLE'
const kTypeInvalid = 'NOT_SUPPORTED'
const kColumns = ` KEY, summary, ${COMPACT_SYMBOL}ASSIgnee,    ${COMPACT_SYMBOL}REPORTER, STATUS, NOTES`
const kInvalidKey = 'invalidKey'
const kInvalidValue = 'invalidValue'
const kInvalidCustomColumn = 'CustomInvalid'

jest.mock('../src/settings', () => {
    const { TestSettingsDataBasic } = jest.requireActual('./testCommon')
    return { SettingsData: TestSettingsDataBasic }
})

describe('SearchView', () => {

    describe('Constructor', () => {
        // Positive tests
        test('legacy query only', () => {
            const sv = SearchView.fromString(kQuery)
            expect(sv.query).toEqual(kQuery)
        })
        test('full basic query', () => {
            const sv = SearchView.fromString(`type: ${kType}
${kComment}
query: ${kQuery}
limit: ${kLimit}
columns: ${kColumns}`)
            expect(sv.query).toEqual(kQuery)
            expect(sv.limit).toEqual(kLimit)
            expect(sv.type).toEqual(ESearchResultsRenderingTypes.TABLE)
            expect(sv.columns).toEqual([
                { compact: false, extra: '', type: 'KEY' } as ISearchColumn,
                { compact: false, extra: '', type: 'SUMMARY' } as ISearchColumn,
                { compact: true, extra: '', type: 'ASSIGNEE' } as ISearchColumn,
                { compact: true, extra: '', type: 'REPORTER' } as ISearchColumn,
                { compact: false, extra: '', type: 'STATUS' } as ISearchColumn,
                { compact: false, extra: '', type: 'NOTES' } as ISearchColumn,
            ])
            expect(sv.account).toBeNull()
        })
        test('List type', () => {
            const sv = SearchView.fromString(`type: ${ESearchResultsRenderingTypes.LIST}
            ${kComment}
            query: ${kQuery}
            limit: ${kLimit}`)
            expect(sv.query).toEqual(kQuery)
            expect(sv.limit).toEqual(kLimit)
            expect(sv.type).toEqual(ESearchResultsRenderingTypes.LIST)
            expect(sv.columns).toEqual([])
            expect(sv.account).toBeNull()
        })
        test('Explicit account', () => {
            const sv = SearchView.fromString(`type: ${kType}
${kComment}
query: ${kQuery}
limit: ${kLimit}
columns: ${kColumns}
account: ${TestAccountOpen.alias}`)
            expect(sv.query).toEqual(kQuery)
            expect(sv.limit).toEqual(kLimit)
            expect(sv.type).toEqual(ESearchResultsRenderingTypes.TABLE)
            expect(sv.columns).toEqual([
                { compact: false, extra: '', type: 'KEY' } as ISearchColumn,
                { compact: false, extra: '', type: 'SUMMARY' } as ISearchColumn,
                { compact: true, extra: '', type: 'ASSIGNEE' } as ISearchColumn,
                { compact: true, extra: '', type: 'REPORTER' } as ISearchColumn,
                { compact: false, extra: '', type: 'STATUS' } as ISearchColumn,
                { compact: false, extra: '', type: 'NOTES' } as ISearchColumn,
            ])
            expect(sv.account).toEqual(TestAccountOpen)
        })
        test('Columns custom fields', () => {
            const sv = SearchView.fromString(`type: ${kType}
    ${kComment}
    query: ${kQuery}
    limit: ${kLimit}
    columns: ${kColumns}, $Custom1, ${COMPACT_SYMBOL}$12345, NOTES.field1.field2,`)
            expect(sv.query).toEqual(kQuery)
            expect(sv.limit).toEqual(kLimit)
            expect(sv.type).toEqual(ESearchResultsRenderingTypes.TABLE)
            expect(sv.columns).toEqual([
                { compact: false, extra: '', type: 'KEY' } as ISearchColumn,
                { compact: false, extra: '', type: 'SUMMARY' } as ISearchColumn,
                { compact: true, extra: '', type: 'ASSIGNEE' } as ISearchColumn,
                { compact: true, extra: '', type: 'REPORTER' } as ISearchColumn,
                { compact: false, extra: '', type: 'STATUS' } as ISearchColumn,
                { compact: false, extra: '', type: 'NOTES' } as ISearchColumn,
                { compact: false, extra: 'Custom1', type: 'CUSTOM_FIELD' } as ISearchColumn,
                { compact: true, extra: '12345', type: 'CUSTOM_FIELD' } as ISearchColumn,
                { compact: false, extra: 'field1.field2', type: 'NOTES' } as ISearchColumn,
            ])
            expect(sv.account).toBeNull()
        })

        // Negative tests
        test('Invalid keyword key', () => {
            expect(() => SearchView.fromString(`type: ${kType}
        ${kComment}
        query: ${kQuery}
        limit: ${kLimit}
        ${kInvalidKey}: ${kInvalidValue}
        columns: ${kColumns}`)).toThrow(new Error(`Invalid key: ${kInvalidKey}`))
        })
        test('Invalid type', () => {
            expect(() => SearchView.fromString(`type: ${kTypeInvalid}
        ${kComment}
        query: ${kQuery}
        limit: ${kLimit}
        columns: ${kColumns}`)).toThrow(new Error(`Invalid type: ${kTypeInvalid}`))
        })
        test('Invalid limit', () => {
            expect(() => SearchView.fromString(`type: ${kType}
        ${kComment}
        query: ${kQuery}
        limit: ${kLimitInvalid}
        columns: ${kColumns}`)).toThrow(new Error(`Invalid limit: ${kLimitInvalid}`))
        })
        test('List type with custom columns', () => {
            expect(() => SearchView.fromString(`type: ${ESearchResultsRenderingTypes.LIST}
            ${kComment}
            query: ${kQuery}
            limit: ${kLimit}
            columns: ${kColumns}`)).toThrow(new Error(`Type LIST and custom columns are not compatible options`))
        })
        test('Standard columns not found', () => {
            expect(() => SearchView.fromString(`type: ${kType}
    ${kComment}
    query: ${kQuery}
    limit: ${kLimit}
    columns: ${kColumns}, ${kInvalidCustomColumn},`))
                .toThrow(new Error(`Invalid column: ${kInvalidCustomColumn.toUpperCase()}`))
        })
        test('Custom columns not found', () => {
            expect(() => SearchView.fromString(`type: ${kType}
    ${kComment}
    query: ${kQuery}
    limit: ${kLimit}
    columns: ${kColumns}, $${kInvalidCustomColumn},`))
                .toThrow(new Error(`Custom field ${kInvalidCustomColumn} not found`))
        })
        test('Legacy compact column not supported', () => {
            expect(() => SearchView.fromString(`type: ${kType}
    ${kComment}
    query: ${kQuery}
    limit: ${kLimit}
    columns: ${kColumns}, #${kInvalidCustomColumn},`))
                .toThrow(new Error(`Please replace the symbol "#" with "${COMPACT_SYMBOL}" to use the compact format`))
        })
    })


    describe('Conversions maximal', () => {
        let sv: SearchView = null
        beforeEach(() => {
            sv = SearchView.fromString(`type: ${kType}
 ${kComment}  
  query:      ${kQuery} 
    limit   : ${kLimit}  
columns: ${kColumns}

account: ${TestAccountOpen.alias}

`)
        })

        test('toRawString', () => {
            expect(sv.toRawString()).toEqual(`type: ${kType}
query: ${kQuery}
limit: ${kLimit}
columns: ${kColumns.toUpperCase().trim().replace(/ +/g, ' ')}
account: ${TestAccountOpen.alias}
`)
        })
        test('toString', () => {
            expect(sv.toString()).toEqual(`\`\`\`jira-search
type: ${kType}
query: ${kQuery}
limit: ${kLimit}
columns: ${kColumns.toUpperCase().trim().replace(/ +/g, ' ')}
account: ${TestAccountOpen.alias}
\`\`\``)
        })
        test('getCacheKey', () => {
            expect(sv.getCacheKey()).toEqual(`${kQuery}${kLimit}${TestAccountOpen.alias}`)
        })
    })


    describe('Conversions minimal', () => {
        let sv: SearchView = null
        beforeEach(() => {
            sv = SearchView.fromString(`type: ${kType}
  query:      ${kQuery} 
`)
        })

        test('toRawString', () => {
            expect(sv.toRawString()).toEqual(`type: ${kType}
query: ${kQuery}
`)
        })
        test('toString', () => {
            expect(sv.toString()).toEqual(`\`\`\`jira-search
type: ${kType}
query: ${kQuery}
\`\`\``)
        })
        test('getCacheKey', () => {
            expect(sv.getCacheKey()).toEqual(`${kQuery}`)
        })
        test('toRawString zero columns', () => {
            sv = SearchView.fromString(`type: ${kType}
  query:      ${kQuery} 
  columns:
`)
            console.log('sv.query = ', sv.query)
            expect(sv.toRawString()).toEqual(`type: ${kType}
query: ${kQuery}
`)
        })
    })

})

export { }