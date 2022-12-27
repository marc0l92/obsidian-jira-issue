import moment from "moment"
import { IMultiSeries, ISeries } from "../interfaces/issueInterfaces"
import { SECOND_IN_A_DAY } from "../interfaces/settingsInterfaces"
import { getRandomRGBColor, resetRandomGenerator } from "../utils"
import API from "./api"

enum EChartFormat {
    SECONDS = 'Seconds',
    DAYS = 'Days',
    PERCENTAGE = 'Percentage',
}

export async function getWorklogPerDay(projectKeyOrId: string, startDate: string, endDate: string = 'now()') {
    const worklogs = await API.macro.getWorkLogByDates(projectKeyOrId, startDate, endDate)
    const labels = []
    const emptySeries: ISeries = {}
    const intervalStart = moment(startDate)
    const intervalEnd = moment(endDate)
    for (const i = intervalStart.clone(); i < intervalEnd; i.add(1, 'd')) {
        labels.push(i.format('YYYY-MM-DD'))
        emptySeries[i.format('YYYY-MM-DD')] = 0
    }
    const usersSeries: IMultiSeries = {}
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
    resetRandomGenerator()
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: Object.entries(usersSeries).map(x => {
                const color = getRandomRGBColor()
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

export async function getWorklogPerUser(projectKeyOrId: string, startDate: string, endDate: string = 'now()', options: { format?: EChartFormat, capacity?: ISeries } = {}) {
    const opt = {
        format: options.format || EChartFormat.PERCENTAGE,
        capacity: options.capacity || {},
    }
    const series = await API.macro.getWorkLogByUser(projectKeyOrId, startDate, endDate)
    switch (opt.format) {
        case EChartFormat.SECONDS:
            break
        case EChartFormat.DAYS:
            for (const a in series) {
                series[a] = series[a] / SECOND_IN_A_DAY
            }
            break
        case EChartFormat.PERCENTAGE:
            const days = moment(moment(endDate).unix() - moment(startDate).unix()).days()
            for (const author in series) {
                const capacity = opt.capacity[author] || days
                series[author] = series[author] / capacity / SECOND_IN_A_DAY * 100
            }
            break
        default:
            throw new Error('Invalid chart format')
    }
    // resetRandomGenerator()
    const color = getRandomRGBColor()
    return {
        type: 'bar',
        data: {
            labels: Object.keys(series),
            datasets: [{
                label: `Time logged [${opt.format}]`,
                data: Object.values(series),
                backgroundColor: [`rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`],
                borderColor: [`rgba(${color.r}, ${color.g}, ${color.b}, 1)`],
                borderWidth: 1
            }],
        },
    }
}
