import { IJiraIssueAccountSettings } from "./interfaces/settingsInterfaces"
import { SettingsData } from "./settings"
const colorsys = require('colorsys')

const kSeed = 'TheSeed123'

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

function cyrb128(str: string) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}
function mulberry32(a: number) {
    return function () {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}
let random: () => number = mulberry32(cyrb128(kSeed)[0])
export function resetRandomGenerator() {
    random = mulberry32(cyrb128(kSeed)[0])
}

function randomBetween(min: number, max: number) {
    return Math.floor(random() * (max - min + 1)) + min
}

export function getRandomHexColor(): string {
    return colorsys.hslToHex(randomBetween(0, 359), randomBetween(40, 100), randomBetween(45, 75))
}

export function getRandomRGBColor(): { r: number, g: number, b: number } {
    return colorsys.hslToRgb(randomBetween(0, 359), randomBetween(40, 100), randomBetween(45, 75))
}
