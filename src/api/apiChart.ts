import moment from "moment"
import { getRandomHexColor, getRandomRGBColor } from "src/utils"
import API from "./api"

interface IWorklogUsersSeries {
    [user: string]: IWorklogSeries
}
interface IWorklogSeries {
    [date: string]: number
}

export async function getWorklogPerDay(projectKeyOrId: string, startDate: string, endDate: string = 'now()') {
    const worklogs = await API.macro.getWorkLogByDates(projectKeyOrId, startDate, endDate)
    const labels = []
    const emptySeries: IWorklogSeries = {}
    const intervalStart = moment(startDate)
    const intervalEnd = moment(endDate)
    for (const i = intervalStart.clone(); i < intervalEnd; i.add(1, 'd')) {
        labels.push(i.format('YYYY-MM-DD'))
        emptySeries[i.format('YYYY-MM-DD')] = 0
    }
    const usersSeries: IWorklogUsersSeries = {}
    for (const worklog of worklogs) {
        const author = worklog.author.key
        if (!usersSeries[author]) {
            usersSeries[author] = Object.assign({}, emptySeries)
        }
        const worklogStart = moment(worklog.started).format('YYYY-MM-DD')
        if (worklogStart in usersSeries[author]) {
            usersSeries[author][worklogStart] += worklog.timeSpentSeconds
        }
    }
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: Object.entries(usersSeries).map(x => {
                const color = getRandomRGBColor()
                console.log({ color })
                return {
                    label: x[0],
                    data: Object.values(x[1]),
                    backgroundColor: [`rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`],
                    borderColor: [`rgba(${color.r}, ${color.g}, ${color.b}, 1)`],
                    borderWidth: 1
                }
            }),
        },
    }
}
