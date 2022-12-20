import { SettingsData } from "./settings"

const ms = require('ms')
const moment = require('moment')

interface CacheItem {
    updateTime: number,
    data: unknown,
    isError: boolean,
}
interface Cache {
    [key: string]: CacheItem
}

let cache: Cache = {}

export default {

    add<T>(key: string, object: T, isError = false): CacheItem {
        cache[key] = {
            updateTime: Date.now(),
            data: object,
            isError: isError,
        }
        return cache[key]
    },

    get(key: string) {
        if (key in cache && cache[key].updateTime + ms(SettingsData.cacheTime) > Date.now()) {
            return cache[key]
        }
        return null
    },

    getTime(key: string) {
        if (key in cache) {
            return moment(cache[key].updateTime).format('llll')
        }
        return null
    },

    delete(key: string) {
        if (key in cache) {
            delete cache[key]
        }
    },

    clear() {
        cache = {}
    },
}
