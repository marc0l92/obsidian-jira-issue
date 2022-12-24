import { IJiraIssueAccountSettings } from "./settingsInterfaces"

export interface IJiraIssue {
    id: string
    key: string
    fields: {
        assignee: IJiraUser
        created: string
        creator: IJiraUser
        description: string
        duedate: string
        resolution: {
            name: string
            description: string
        }
        resolutiondate: string
        issuetype: {
            iconUrl: string
            name: string
        }
        priority: {
            iconUrl: string
            name: string
        }
        reporter: IJiraUser
        status: {
            statusCategory: {
                colorName: string
            }
            name: string
            description: string
        }
        summary: string
        updated: string
        environment: string
        project: {
            key: string
            name: string
        }
        labels: string[]
        fixVersions: {
            name: string
            description: string
            released: boolean
        }[]
        components: {
            name: string
        }[]
        aggregatetimeestimate: number
        aggregatetimeoriginalestimate: number
        aggregatetimespent: number
        timeestimate: number
        timeoriginalestimate: number
        timespent: number
        issueLinks: {
            type: {
                name: string
            }
            inwardIssue: {
                key: string
                fields: {
                    summary: string
                }
            }
        }[]
        aggregateprogress: {
            percent: number
        }
        progress: {
            percent: number
        }
        lastViewed: string
        worklog: {
            worklogs: IJiraWorklog[]
        }
        [k: string]: any
    }
    account: IJiraIssueAccountSettings
}

export interface IJiraWorklog {
    id: string
    author: IJiraUser
    comment: string
    create: string
    started: string
    timeSpent: string
    timeSpentSeconds: number
    updateAuthor: IJiraUser
    updated: string
}

export interface IJiraUser {
    active: boolean
    displayName: string
    key: string
    emailAddress: string
    self: string
    avatarUrls: {
        '16x16': string
        '24x24': string
        '32x32': string
        '48x48': string
    }
}

export interface IJiraSearchResults {
    issues: IJiraIssue[]
    maxResults: number
    startAt: number
    total: number
    account: IJiraIssueAccountSettings
}

export interface IJiraStatus {
    statusCategory: {
        colorName: string
    }
}

export interface IJiraField {
    custom: boolean
    id: string
    name: string
    schema: IJiraFieldSchema
}

export interface IJiraFieldSchema {
    customId: number
    type: string
    items?: string
}

export interface IJiraAutocompleteDataField {
    value: string
    displayName: string
    auto: string
    orderable: string
    searchable: string
    cfid: string
    operators: [string]
    types: [string]
}

export interface IJiraAutocompleteData {
    visibleFieldNames: IJiraAutocompleteDataField[]
    visibleFunctionNames: [{
        value: string
        displayName: string
        isList?: string
        types: [string]
    }]
    jqlReservedWords: [string]
}

export interface IJiraAutocompleteField {
    results: [{
        value: string
        displayName: string
    }]
}

export interface IJiraDevStatus {
    errors: []
    configErrors: []
    summary: {
        pullrequest: {
            overall: {
                count: number
                lastUpdated: string
                stateCount: number
                state: string
                details: {
                    openCount: number
                    mergedCount: number
                    declinedCount: number
                }
                open: boolean
            }
        }
        build: {
            overall: {
                count: number
            }
        }
        review: {
            overall: {
                count: number
            }
        }
        repository: {
            overall: {
                count: number
            }
        }
        branch: {
            overall: {
                count: number
            }
        }
    }
}

export interface IJiraBoard {
    id: number
    name: string
    type: string
}

export interface IJiraSprint {
    id: number
    state: ESprintState
    name: string
    startDate: string
    endDate: string
    completeDate: string
    activatedDate: string
    originBoardId: number
    goal: string
}

export enum ESprintState {
    CLOSED = 'closed',
    ACTIVE = 'active',
    FUTURE = 'future',
}

const newEmptyUser = () => {
    return {
        active: false,
        avatarUrls: {
            "16x16": '',
            "24x24": '',
            "32x32": '',
            "48x48": '',
        },
        displayName: '',
        self: '',
    } as IJiraUser
}

const EMPTY_ISSUE: IJiraIssue = {
    key: '',
    id: '',
    account: null,
    fields: {
        aggregateprogress: { percent: 0 },
        aggregatetimeestimate: 0,
        aggregatetimeoriginalestimate: 0,
        aggregatetimespent: 0,
        assignee: newEmptyUser(),
        components: [],
        created: '',
        creator: newEmptyUser(),
        description: '',
        duedate: '',
        environment: '',
        fixVersions: [],
        issueLinks: [],
        issuetype: { iconUrl: '', name: '' },
        labels: [],
        lastViewed: '',
        priority: { iconUrl: '', name: '' },
        progress: { percent: 0 },
        project: { key: '', name: '' },
        reporter: newEmptyUser(),
        resolution: { name: '', description: '' },
        resolutiondate: '',
        status: { description: '', name: '', statusCategory: { colorName: '' } },
        summary: '',
        timeestimate: 0,
        timeoriginalestimate: 0,
        timespent: 0,
        updated: '',
        worklog: {
            worklogs: []
        }
    },
}

function isObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item))
}

function mergeDeep(target: any, ...sources: any[]): any {
    if (!sources.length) return target
    const source = sources.shift()

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, {
                        [key]: {}
                    })
                }
                mergeDeep(target[key], source[key])
            } else {
                if (source[key]) {
                    Object.assign(target, {
                        [key]: source[key]
                    })
                }
            }
        }
    }

    return mergeDeep(target, ...sources)
}

export function toDefaultedIssue(originalIssue: IJiraIssue): IJiraIssue {
    if (originalIssue) {
        return mergeDeep(EMPTY_ISSUE, originalIssue)
    }
    return originalIssue
}
