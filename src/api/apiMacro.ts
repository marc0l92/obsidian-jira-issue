import { ESprintState, IJiraSprint, IJiraWorklog, ISeries } from "../interfaces/issueInterfaces"
import API from "./api"
import moment from "moment"

function dateTimeToDate(dateTime: string): string {
    if (dateTime.match(/^\d/)) {
        return moment(dateTime).format('YYYY-MM-DD')
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
    return await getWorkLogByDates(projectKeyOrId, sprint.startDate, sprint.endDate)
}

export async function getWorkLogBySprintId(projectKeyOrId: string, sprintId: number): Promise<IJiraWorklog[]> {
    const sprint = await API.base.getSprint(sprintId)
    return await getWorkLogByDates(projectKeyOrId, sprint.startDate, sprint.endDate)
}

export async function getWorkLogByDates(projectKeyOrId: string, startDate: string, endDate: string = 'now()'): Promise<IJiraWorklog[]> {
    const searchResults = await API.base.getSearchResults(
        `project = "${projectKeyOrId}" AND worklogDate > ${dateTimeToDate(startDate)} AND worklogDate < ${dateTimeToDate(endDate)}`,
        { limit: 50, fields: ['worklog'] }
    )
    let worklogs: IJiraWorklog[] = []
    for (const issue of searchResults.issues) {
        if (issue.fields.worklog && issue.fields.worklog.worklogs) {
            worklogs = worklogs.concat(issue.fields.worklog.worklogs)
        }
    }
    return worklogs
}

export async function getWorkLogByUser(projectKeyOrId: string, startDate: string, endDate: string = 'now()'): Promise<ISeries> {
    const worklogs = await API.macro.getWorkLogByDates(projectKeyOrId, startDate, endDate)
    const series: ISeries = {}
    for (const worklog of worklogs) {
        const author = worklog.author.key
        if (!(author in series)) {
            series[author] = 0
        }
        series[author] += worklog.timeSpentSeconds
    }
    return series
}

export async function getVelocity(projectKeyOrId: string, sprintId: number, storyPointFieldName: string = 'aggregatetimeoriginalestimate') {
    const searchResults = await API.base.getSearchResults(
        `project = "${projectKeyOrId}" AND sprint = ${sprintId} AND resolution = Done`,
        { limit: 50, fields: [storyPointFieldName] }
    )
    let velocity = 0
    for (const issue of searchResults.issues) {
        velocity += issue.fields[storyPointFieldName]
    }
    return velocity
}