import moment from "moment"
import { SECOND_IN_A_DAY } from "src/interfaces/settingsInterfaces"
import { getRandomRGBColor, resetRandomGenerator } from "src/utils"
import API from "./api"

interface IMultiSeries {
    [user: string]: ISeries
}
interface ISeries {
    [date: string]: number
}

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

export async function getWorklogPerUser(projectKeyOrId: string, startDate: string, endDate: string = 'now()', format: EChartFormat = EChartFormat.PERCENTAGE) {
    const worklogs = await API.macro.getWorkLogByDates(projectKeyOrId, startDate, endDate)
    const series: ISeries = {}
    const intervalStart = moment(startDate)
    const intervalEnd = moment(endDate)
    for (const worklog of worklogs) {
        const author = worklog.author.key
        if (!(author in series)) {
            series[author] = 0
        }
        const worklogStart = moment(worklog.started)
        if (intervalStart <= worklogStart && worklogStart <= intervalEnd) {
            series[author] += worklog.timeSpentSeconds
        }
    }
    switch (format) {
        case EChartFormat.DAYS:
            for (const a in series) {
                series[a] = series[a] / SECOND_IN_A_DAY
            }
            break
        case EChartFormat.PERCENTAGE:
            const days = moment(intervalEnd.unix() - intervalStart.unix()).days()
            for (const a in series) {
                series[a] = series[a] / days / SECOND_IN_A_DAY * 100
            }
            break
    }
    // resetRandomGenerator()
    const color = getRandomRGBColor()
    return {
        type: 'bar',
        data: {
            labels: Object.keys(series),
            datasets: [{
                label: `Time logged [${EChartFormat.PERCENTAGE}]`,
                data: Object.values(series),
                backgroundColor: [`rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`],
                borderColor: [`rgba(${color.r}, ${color.g}, ${color.b}, 1)`],
                borderWidth: 1
            }],
        },
    }
}