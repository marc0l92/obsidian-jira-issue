import { IJiraIssue } from "./interfaces"
import { JiraIssueProcessor, JIRA_STATUS_COLOR_MAP } from "./processor"
import { ESearchColumnsTypes, ISearchColumn } from "./searchView"

const DESCRIPTION_COMPACT_MAX_LENGTH = 20

function dateToStr(fullDate: string): string {
    if (fullDate) {
        const d = new Date(fullDate)
        return d.toLocaleDateString()
    }
    return fullDate
}

export const renderTableColumn = (column: ISearchColumn, issue: IJiraIssue, row: HTMLTableRowElement, processor: JiraIssueProcessor): void => {
    switch (column.type) {
        case ESearchColumnsTypes.KEY:
            createEl('a', {
                cls: 'no-wrap',
                href: processor.issueUrl(issue.key),
                text: column.compact ? '🔗' : issue.key,
                title: column.compact ? issue.key : '',
                parent: createEl('td', { parent: row })
            })
            break
        case ESearchColumnsTypes.SUMMARY:
            if (column.compact) {
                let summaryCompact = issue.fields.summary.substring(0, DESCRIPTION_COMPACT_MAX_LENGTH)
                if (issue.fields.summary.length > DESCRIPTION_COMPACT_MAX_LENGTH) {
                    summaryCompact += '…'
                }
                createEl('td', { text: summaryCompact, title: issue.fields.summary, parent: row })
            } else {
                createEl('td', { text: issue.fields.summary, parent: row })
            }
            break
        case ESearchColumnsTypes.TYPE:
            const typeCell = createEl('td', { parent: row })
            createEl('img', {
                attr: { src: issue.fields.issuetype.iconUrl, alt: issue.fields.issuetype.name },
                title: column.compact ? issue.fields.issuetype.name : '',
                cls: 'letter-height',
                parent: typeCell
            })
            if (!column.compact) {
                createSpan({ text: ' ' + issue.fields.issuetype.name, parent: typeCell })
            }
            break
        case ESearchColumnsTypes.CREATED:
            if (column.compact) {
                createEl('td', { text: '🕑', title: dateToStr(issue.fields.created), parent: row })
            } else {
                createEl('td', { text: dateToStr(issue.fields.created), parent: row })
            }
            break
        case ESearchColumnsTypes.UPDATED:
            if (column.compact) {
                createEl('td', { text: '🕑', title: dateToStr(issue.fields.updated), parent: row })
            } else {
                createEl('td', { text: dateToStr(issue.fields.updated), parent: row })
            }
            break
        case ESearchColumnsTypes.REPORTER:
            const reporterName = issue.fields.reporter.displayName || ''
            if (column.compact && reporterName) {
                createEl('img', {
                    attr: { src: issue.fields.reporter.avatarUrls['16x16'], alt: reporterName },
                    title: reporterName,
                    cls: 'avatar-image',
                    parent: createEl('td', { parent: row })
                })
            } else {
                createEl('td', { text: reporterName, parent: row })
            }
            break
        case ESearchColumnsTypes.ASSIGNEE:
            const assigneeName = issue.fields.assignee.displayName || ''
            if (column.compact && assigneeName) {
                createEl('img', {
                    attr: { src: issue.fields.assignee.avatarUrls['16x16'], alt: assigneeName },
                    title: assigneeName,
                    cls: 'avatar-image',
                    parent: createEl('td', { parent: row })
                })
            } else {
                createEl('td', { text: assigneeName, parent: row })
            }
            break
        case ESearchColumnsTypes.PRIORITY:
            const priorityCell = createEl('td', { parent: row })
            createEl('img', {
                attr: { src: issue.fields.priority.iconUrl, alt: issue.fields.priority.name },
                title: column.compact ? issue.fields.priority.name : '',
                cls: 'letter-height',
                parent: priorityCell
            })
            if (!column.compact) {
                createSpan({ text: ' ' + issue.fields.priority.name, parent: priorityCell })
            }
            break
        case ESearchColumnsTypes.STATUS:
            const statusColor = JIRA_STATUS_COLOR_MAP[issue.fields.status.statusCategory.colorName] || 'is-light'
            if (column.compact) {
                createSpan({ cls: `ji-tag no-wrap ${statusColor}`, text: issue.fields.status.name[0].toUpperCase(), title: issue.fields.status.name, parent: createEl('td', { parent: row }) })
            } else {
                createSpan({ cls: `ji-tag no-wrap ${statusColor}`, text: issue.fields.status.name, title: issue.fields.status.description, parent: createEl('td', { parent: row }) })
            }
            break
        case ESearchColumnsTypes.DUE_DATE:
            if (column.compact) {
                createEl('td', { text: '🕑', title: dateToStr(issue.fields.duedate), parent: row })
            } else {
                createEl('td', { text: dateToStr(issue.fields.duedate), parent: row })
            }
            break
        case ESearchColumnsTypes.RESOLUTION:
            if (issue.fields.resolution.description) {
                createEl('abbr', { text: issue.fields.resolution.name, title: issue.fields.resolution.description, parent: createEl('td', { parent: row }) })
            } else {
                createEl('td', { text: issue.fields.resolution.name, title: issue.fields.resolution.description, parent: row })
            }
            break
        case ESearchColumnsTypes.RESOLUTION_DATE:
            if (column.compact) {
                createEl('td', { text: '🕑', title: dateToStr(issue.fields.resolutiondate), parent: row })
            } else {
                createEl('td', { text: dateToStr(issue.fields.resolutiondate), parent: row })
            }
            break
        case ESearchColumnsTypes.ENVIRONMENT:
            if (column.compact) {
                let environmentCompact = issue.fields.environment.substring(0, DESCRIPTION_COMPACT_MAX_LENGTH)
                if (issue.fields.environment.length > DESCRIPTION_COMPACT_MAX_LENGTH) {
                    environmentCompact += '…'
                }
                createEl('td', { text: environmentCompact, title: issue.fields.environment, parent: row })
            } else {
                createEl('td', { text: issue.fields.environment, parent: row })
            }
            break
        case ESearchColumnsTypes.LABELS:
            if (column.compact) {
                createEl('td', { text: '🏷️', title: issue.fields.labels.join('\n'), parent: row })
            } else {
                createEl('td', { text: issue.fields.labels.join(', '), parent: row })
            }
            break
        case ESearchColumnsTypes.PROJECT:
            createEl('td', { text: issue.fields.project.key, title: issue.fields.project.name, parent: row })
            break
        case ESearchColumnsTypes.FIX_VERSIONS:
            const fixVersionsCell = createEl('td', { parent: row })
            for (let i=0; i< issue.fields.fixVersions.length; i++) {
                const fixVersion = issue.fields.fixVersions[i]
                if (fixVersion.released) {
                    createEl('strong', { text: fixVersion.name, title: fixVersion.description, parent: fixVersionsCell })
                } else {
                    createSpan({ text: fixVersion.name, title: fixVersion.description, parent: fixVersionsCell })
                }
                if(i < issue.fields.fixVersions.length - 1) {
                    createSpan({ text: ', ', parent: fixVersionsCell })
                }
            }
            break
        // case ESearchColumnsTypes.CUSTOM:
        //     break
    }
}