import JiraClient from "../client/jiraClient"
import { ESprintState, IJiraSprint, IJiraWorklog } from "../interfaces/issueInterfaces"
import API from "./api"

function dateTimeToDate(dateTime: string): string {
    const matches = dateTime.match(/^(\d{4}-\d{2}-\d{2})T.*/)
    if (matches) {
        return matches[1]
    }
    return null
}

export async function getActiveSprint(projectKeyOrId: string): Promise<IJiraSprint> {
    const boards = await API.base.getBoards(projectKeyOrId, { limit: 1 })
    if (boards.length > 0) {
        const sprints = await API.base.getSprints(boards[0].id, { state: [ESprintState.ACTIVE], limit: 1 })
        if (sprints.length > 0) {
            return sprints[0]
        }
    }
    return null
}

export async function getActiveSprintName(projectKeyOrId: string): Promise<string> {
    const sprint = await API.macro.getActiveSprint(projectKeyOrId)
    return sprint ? sprint.name : ''
}

export async function getWorkLogBySprint(projectKeyOrId: string, sprint: IJiraSprint): Promise<IJiraWorklog[]> {
    return await getWorkLogByDates(projectKeyOrId, dateTimeToDate(sprint.startDate), dateTimeToDate(sprint.endDate))
}

export async function getWorkLogByDates(projectKeyOrId: string, startDate: string, endDate: string = 'now()'): Promise<IJiraWorklog[]> {
    const searchResults = await JiraClient.getSearchResults(`project = "${projectKeyOrId}" AND worklogDate > ${startDate} AND worklogDate < ${endDate}`, { limit: 50, fields: ['worklog'] })
    let worklogs: IJiraWorklog[] = []
    for (const issue of searchResults.issues) {
        if (issue.fields.worklog && issue.fields.worklog.worklogs) {
            worklogs = worklogs.concat(issue.fields.worklog.worklogs)
        }
    }
    return worklogs
}