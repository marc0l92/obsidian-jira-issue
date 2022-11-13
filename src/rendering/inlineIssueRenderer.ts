import { MarkdownPostProcessorContext } from "obsidian"
import { JiraClient } from "src/client/jiraClient"
import { IJiraIssue } from "src/client/jiraInterfaces"
import { ObjectsCache } from "src/objectsCache"
import { COMPACT_SYMBOL, SettingsData } from "../settings"
import { RenderingCommon as RC } from "./renderingCommon"

// TODO: support explicit account selection in inline issues

function convertInlineIssuesToTags(el: HTMLElement): void {
    if (SettingsData.inlineIssuePrefix) {
        let match
        while (match = new RegExp(`${SettingsData.inlineIssuePrefix}(${COMPACT_SYMBOL}?)([A-Z0-9]+-[0-9]+)`).exec(el.innerHTML)) {
            // console.log({ match })
            const compact = !!match[1]
            const issueKey = match[2]
            const container = createSpan({ cls: 'ji-inline-issue jira-issue-container', attr: { 'data-issue-key': issueKey, 'data-compact': compact } })
            container.appendChild(RC.renderLoadingItem(issueKey, true))
            el.innerHTML = el.innerHTML.replace(match[0], container.outerHTML)
        }
    }
}

function convertInlineIssuesUrlToTags(el: HTMLElement): void {
    if (SettingsData.inlineIssueUrlToTag) {
        for (const account of SettingsData.accounts) {
            const issueUrlElements: NodeListOf<HTMLAnchorElement> = el.querySelectorAll(`a.external-link[href^="${account.host}/browse/"]`)
            issueUrlElements.forEach((value: HTMLAnchorElement) => {
                const issueKey = value.href.replace(`${account.host}/browse/`, '')
                const container = createSpan({ cls: 'ji-inline-issue jira-issue-container', attr: { 'data-issue-key': issueKey, 'data-compact': false } })
                container.appendChild(RC.renderLoadingItem(issueKey, true))
                value.replaceWith(container)
            })
        }
    }
}

export const InlineIssueRenderer = async (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
    // console.log({ el })
    convertInlineIssuesToTags(el)
    convertInlineIssuesUrlToTags(el)

    const inlineIssueTags: NodeListOf<HTMLSpanElement> = el.querySelectorAll(`span.ji-inline-issue`)
    inlineIssueTags.forEach((value: HTMLSpanElement) => {
        const issueKey = value.getAttribute('data-issue-key')
        const compact = value.getAttribute('data-compact') === 'true'
        const cachedIssue = ObjectsCache.get(issueKey)
        if (cachedIssue) {
            if (cachedIssue.isError) {
                value.replaceChildren(RC.renderIssueError(issueKey, cachedIssue.data as string))
            } else {
                value.replaceChildren(RC.renderIssue(cachedIssue.data as IJiraIssue, compact))
            }
        } else {
            value.replaceChildren(RC.renderLoadingItem(issueKey))
            JiraClient.getIssue(issueKey).then(newIssue => {
                const issue = ObjectsCache.add(issueKey, newIssue).data as IJiraIssue
                value.replaceChildren(RC.renderIssue(issue, compact))
            }).catch(err => {
                ObjectsCache.add(issueKey, err, true)
                value.replaceChildren(RC.renderIssueError(issueKey, err))
            })
        }
    })
}