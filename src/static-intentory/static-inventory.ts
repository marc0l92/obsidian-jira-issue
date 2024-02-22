import ObjectsCache from "../objectsCache";

/*

The idea is to store JIRA keys & summaries in a dedicated file in the below format.
This fixed format allows easy updating of the inventory, retaining the pre-existing keys and summaries and also
the potential user text in the top of the file (e.g. YAML frontmatter or user text)

Storing can be done on demand via Obsidian command, the inventory is read from the cache

=== DO NOT MODIFY BELOW THIS LINE - IT WILL BE OVERWRITTEN ===

| Key | Summary |
| --- | --- |
| AB-1234 | A summary of the ticket goes here |
| XYZ-35423 | Summary of the ticket read from JIRA goes here |
...

 */

const escapeUnescapedPipe = (s: string) => s.replace(/(?<!\\)\|/g, '\\|')
const convertNewLinesToMDTableFormat = (s: string) => s.replace(/\n/g, '<br>')

export const updateStaticInventoryFromCache = () => {
    const keysAndSummaries = ObjectsCache.dumpKeysAndSummaries()
    return (originalContent: string): string => {
        const DISCLAIMER_LINE = '=== DO NOT MODIFY BELOW THIS LINE - IT WILL BE OVERWRITTEN ==='
        const MD_TABLE_HEADER = '| Key | Summary |'
        const MD_TABLE_HEADER_REGEX = /^\s*\|\s*Key\s*\|\s*Summary\s*\|\s*$/
        const MD_TABLE_INDICATOR = '| --- | --- |'
        const MD_TABLE_INDICATOR_REGEX = /^\s*\|\s*---\s*\|\s*---\s*|\s*$/
        const originalTopLinesToRetain = []
        let aboveDisclaimerLine = true
        let gotMdHeader = false
        let collecting = false

        // Parse existing data and include in the inventory, not overwriting the items from cache
        for (let line of originalContent.split('\n')) {
            if (collecting) {
                const lineAsKeyAndSummaryRegex = /^\|(.+?)\|(.+)\|$/
                const match = line.trim().match(lineAsKeyAndSummaryRegex)
                if (match) {
                    const key = match[1].trim()
                    const summary = match[2].trim()
                    if (!keysAndSummaries[key]) {
                        keysAndSummaries[key] = escapeUnescapedPipe(summary)
                    }
                }
            } else { // the top lines to retain or the disclaimer or the table header
                if (aboveDisclaimerLine) {
                    if (line === DISCLAIMER_LINE) {
                        aboveDisclaimerLine = false
                        continue
                    } else {
                        originalTopLinesToRetain.push(line)
                    }
                }

                if (line.match(MD_TABLE_INDICATOR_REGEX) && gotMdHeader) {
                    collecting = true
                    continue
                }
                if (line.match(MD_TABLE_HEADER_REGEX)) {
                    gotMdHeader = true
                    continue
                }
            }
        }

        const updatedFormattedInventoryWithRetainedTopContent = [
            ...originalTopLinesToRetain,
            DISCLAIMER_LINE,
            '',
            MD_TABLE_HEADER,
            MD_TABLE_INDICATOR
        ]
        for (let ticketKey of Object.keys(keysAndSummaries).sort()) {
            const escapedSummary = escapeUnescapedPipe(keysAndSummaries[ticketKey]) || ''
            const summaryWithFlattenedNewLines = convertNewLinesToMDTableFormat(escapedSummary)
            updatedFormattedInventoryWithRetainedTopContent.push(`|${ticketKey}| ${summaryWithFlattenedNewLines} |`)
        }

        return updatedFormattedInventoryWithRetainedTopContent.join('\n')
    }
}
