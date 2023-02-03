import moment from "moment"
import { IMultiSeries, ISeries } from "../interfaces/issueInterfaces"
import API from "./api"
const ms = require('ms')

const CHART_WIDTH = '800px'

enum EChartFormat {
    HOURS = 'Hours',
    DAYS = 'Days',
    PERCENTAGE = 'Percentage',
}

interface IChartSeries {
    title: string
    data: number[]
}

const MS_IN_A_DAY = ms('1d')
const MS_IN_A_HOUR = ms('1h')


function createChart(type: string, labels: string[], series: IChartSeries[]) {
    return `\`\`\`chart
type: ${type}
width: ${CHART_WIDTH}
labels: [${labels}]
series:
${series.map(s => {
        return `  - title: ${s.title}
    data: [${s.data}]`
    }).join('\n')}
\`\`\``
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
        const author = worklog.author.name
        if (!usersSeries[author]) {
            usersSeries[author] = Object.assign({}, emptySeries)
        }
        const worklogStart = moment(worklog.started).format('YYYY-MM-DD')
        if (worklogStart in usersSeries[author]) {
            usersSeries[author][worklogStart] += worklog.timeSpentSeconds
        }
    }

    return createChart('line',
        labels,
        Object.entries(usersSeries).map(u => {
            return {
                title: u[0],
                data: Object.values(u[1])
            } as IChartSeries
        }))
}

export async function getWorklogPerUser(projectKeyOrId: string, startDate: string, endDate: string = 'now()', options: { format?: EChartFormat, capacity?: ISeries } = {}) {
    const opt = {
        format: options.format || EChartFormat.PERCENTAGE,
        capacity: options.capacity || null,
    }
    const series = await API.macro.getWorkLogSeriesByUser(projectKeyOrId, startDate, endDate)
    switch (opt.format) {
        case EChartFormat.HOURS:
            for (const a in series) {
                series[a] = series[a] / MS_IN_A_HOUR
            }
            break
        case EChartFormat.DAYS:
            for (const a in series) {
                series[a] = series[a] / MS_IN_A_DAY
            }
            break
        case EChartFormat.PERCENTAGE:
            const days = moment.duration(moment(endDate).diff(startDate)).asDays()
            for (const author in series) {
                if (opt.capacity) {
                    if (author in opt.capacity) {
                        series[author] = series[author] / opt.capacity[author] / MS_IN_A_DAY * 100
                    } else {
                        delete series[author]
                    }
                } else {
                    series[author] = series[author] / days / MS_IN_A_DAY * 100
                }
            }
            break
        default:
            throw new Error('Invalid chart format')
    }

    return createChart('bar',
        Object.keys(series),
        [{
            title: `Time logged ${opt.format}`,
            data: Object.values(series)
        }])
}
