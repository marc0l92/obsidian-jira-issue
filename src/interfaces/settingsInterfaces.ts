import { ISearchColumn } from "../searchView"
import { IJiraAutocompleteDataField, IJiraFieldSchema } from "./issueInterfaces"

export enum EAuthenticationTypes {
    OPEN = 'OPEN',
    BASIC = 'BASIC',
    CLOUD = 'CLOUD',
    BEARER_TOKEN = 'BEARER_TOKEN',
}

export const COMPACT_SYMBOL = '-'
export const COMMENT_REGEX = /^\s*#/

export interface IJiraIssueSettings {
    accounts: IJiraIssueAccountSettings[]
    apiBasePath: string
    cacheTime: string
    searchResultsLimit: number
    cache: {
        columns: string[]
    }
    darkMode: boolean
    inlineIssueUrlToTag: boolean
    inlineIssuePrefix: string
    searchColumns: ISearchColumn[]
    logRequestsResponses: boolean
    showColorBand: boolean

    // Legacy credentials
    host?: string
    authenticationType?: EAuthenticationTypes
    username?: string
    password?: string
    bareToken?: string
}

export interface IJiraIssueAccountSettings {
    alias: string
    host: string
    authenticationType: EAuthenticationTypes
    username?: string
    password?: string
    bareToken?: string
    priority: number
    color: string
    cache: {
        statusColor: Record<string, string>
        customFieldsIdToName: Record<string, string>
        customFieldsNameToId: Record<string, string>
        customFieldsType: Record<string, IJiraFieldSchema>
        jqlAutocomplete: {
            fields: IJiraAutocompleteDataField[]
            functions: {
                [key: string]: [string]
            }
        }
    }
}