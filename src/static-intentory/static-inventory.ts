import ObjectsCache from "../objectsCache";

/*

The idea is to store JIRA keys & summaries in a dedicated file in the below format.
This fixed format allows easy updating of the inventory, retaining the pre-existing keys and summaries and also
the potential user text in the top of the file (e.g. YAML frontmatter or user text)

Storing can be done on demand via Obsidian command, the inventory is read from the cache.

Format of the output as below. The two configuration lines, if you enter them inline, steer the output format

------------------------------------------

Any custom content can go here

keysAsPlainText: true
inventoryGrouped: no

Any custom content can go here as well


=== DO NOT MODIFY BELOW THIS LINE - IT WILL BE OVERWRITTEN ===

| Key | Summary |
| --- | --- |
| AB-1234 | A summary of the ticket goes here |
| XYZ-35423 | Summary of the ticket read from JIRA goes here |
...

 */

const escapeUnescapedPipe = (s: string) => s.replace(/(?<!\\)\|/g, '\\|')

const convertNewLinesToMDTableFormat = (s: string) => s.replace(/\n/g, '<br>')

const getJiraProjectFromJiraTicketKey = (jiraTicketKey: string, keepTrailingDash?: boolean ) => {
    const match = jiraTicketKey.match(/^((.+)-)\d+$/)
    return match ? (keepTrailingDash ? match[1] : match[2]) : ''
}

const getBooleanConfigInlineValue = (r: RegExp, line: string): boolean => {
    const match = line.match(r)
    if (match) {
        switch (match[1].toLowerCase()) {
            case 'true':
            case 'yes':
            case 'y':
            case 'on':
                return true
            case 'false':
            case 'no':
            case 'n':
            case 'off':
                return false
        }
    }
    return undefined
}

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

        // Inventory mode parameters read from the .md file in a simple format of name: value
        //   which can be either a line of plain text or part of the YAML frontmatter
        let inventoryGrouped = true  // inventoryGrouped: true / false
        let keysAsPlainText = false   // keysAsPlainText: true / false

        // Parse existing data and include in the inventory, not overwriting the items from cache
        for (let line of originalContent.split('\n')) {
            if (collecting) {
                const lineAsKeyAndSummaryRegex = /^\|\s*(?:JIRA:-)*(.+?)\|(.+)\|$/
                const match = line.trim().match(lineAsKeyAndSummaryRegex)
                if (match) {
                    const key = match[1].trim()
                    const summary = match[2].trim()
                    if (/^.+-\d+/.test(key) && !keysAndSummaries[key]) {
                        // TODO: when the summary fetching from JIRA fails, the inventory is overridden with blank summary text,
                        //       need to fix this - retain prior summary
                        keysAndSummaries[key] = escapeUnescapedPipe(summary)
                    }
                }
            } else { // the top lines to retain or the disclaimer or the table header
                if (aboveDisclaimerLine) {
                    if (line === DISCLAIMER_LINE) {
                        aboveDisclaimerLine = false
                        continue
                    } else {
                        inventoryGrouped = getBooleanConfigInlineValue (/^\s*inventoryGrouped:\s*(\w+)\s*$/i, line) ?? inventoryGrouped
                        keysAsPlainText = getBooleanConfigInlineValue(/^\s*keysAsPlainText:\s*(\w+)\s*$/i, line) ?? keysAsPlainText
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

        const jiraTicketsKeysOrdered = Object.keys(keysAndSummaries).sort()

        const updatedFormattedInventoryWithRetainedTopContent = [
            ...originalTopLinesToRetain,
            DISCLAIMER_LINE,
            '',
            `Total tickets count below: ${jiraTicketsKeysOrdered.length}`,
            ''
            ]

        const dumpTickets = (keys: string[]) => {
            for (let ticketKey of keys) {
                const rawSummary = keysAndSummaries[ticketKey] || ''
                const escapedSummary = escapeUnescapedPipe(rawSummary) || ''
                const summaryWithFlattenedNewLines = convertNewLinesToMDTableFormat(escapedSummary)
                ticketKey = keysAsPlainText ? ticketKey : `JIRA:-${ticketKey}`
                updatedFormattedInventoryWithRetainedTopContent.push(`|${ticketKey}| ${summaryWithFlattenedNewLines} |`)
            }
        }

        if (inventoryGrouped) {
            // Group the JIRA tickets by project (the prefix of 'key' value)
            const jiraProjects: { [key: string]: string } = {}

            jiraTicketsKeysOrdered.forEach((key) => {
                const projectPrefix = getJiraProjectFromJiraTicketKey(key)
                if (!jiraProjects[projectPrefix]) jiraProjects[projectPrefix] = projectPrefix
            })

            for (let projectPrefix of Object.keys(jiraProjects).sort()) {
                updatedFormattedInventoryWithRetainedTopContent.push('')
                updatedFormattedInventoryWithRetainedTopContent.push(`## ${projectPrefix}`)
                updatedFormattedInventoryWithRetainedTopContent.push(MD_TABLE_HEADER)
                updatedFormattedInventoryWithRetainedTopContent.push(MD_TABLE_INDICATOR)

                const prefixWithDash = `${projectPrefix}-`
                dumpTickets(jiraTicketsKeysOrdered.filter((key) => key.startsWith(prefixWithDash)))
            }
        } else { // Inventory not grouped
            updatedFormattedInventoryWithRetainedTopContent.push(MD_TABLE_HEADER)
            updatedFormattedInventoryWithRetainedTopContent.push(MD_TABLE_INDICATOR)
            dumpTickets(jiraTicketsKeysOrdered)
        }
        return updatedFormattedInventoryWithRetainedTopContent.join('\n')
    }
}
