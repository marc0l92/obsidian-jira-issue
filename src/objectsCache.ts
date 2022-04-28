import { IJiraIssueSettings } from "./settings"
const ms = require('ms')
const moment = require('moment')

interface Cache {
    [key: string]: {
        updateTime: number,
        data: any,
    }
}

export class ObjectsCache {
    private _settings: IJiraIssueSettings
    private _cache: Cache

    constructor(settings: IJiraIssueSettings) {
        this._settings = settings
        this._cache = {}
    }

    add<T>(key: string, object: T): T {
        this._cache[key] = {
            updateTime: Date.now(),
            data: object,
        }
        return object
    }

    get(key: string) {
        if (key in this._cache && this._cache[key].updateTime + ms(this._settings.cacheTime) > Date.now()) {
            return this._cache[key].data
        }
        return null
    }

    getTime(key: string) {
        if (key in this._cache) {
            return moment(this._cache[key].updateTime).format('llll')
        }
        return null
    }

    clear() {
        this._cache = {}
    }
}
