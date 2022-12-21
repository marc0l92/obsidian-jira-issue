import { IJiraIssueAccountSettings } from "./interfaces/settingsInterfaces"
import { SettingsData } from "./settings"

export function getAccountByAlias(alias: string): IJiraIssueAccountSettings {
    if (alias) {
        const account = SettingsData.accounts.find(account => account.alias.toUpperCase() === alias.toUpperCase())
        if (!account) {
            throw new Error(`No accounts found with alias: ${alias}`)
        }
        return account
    } else {
        return null
    }
}

export function getAccountByHost(host: string): IJiraIssueAccountSettings {
    if (host) {
        return SettingsData.accounts.find(account => account.host === host) || null
    } else {
        return null
    }
}
