import { ObjectsCache } from '../src/objectsCache'

const kKey1 = 'key1'
const kKey2 = 'key2'
const kVal1 = 'val1'
const kVal2 = 'val2'
const kFakeDateNow = new Date('2000-01-01')
const kFakeDateAfterExpiration = new Date('2000-01-02')

jest.mock('../src/settings', () => {
    const { TestSettingsDataBasic } = jest.requireActual('./testCommon')
    return { SettingsData: TestSettingsDataBasic }
})

describe('ObjectsCache', () => {
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(kFakeDateNow)
        ObjectsCache.clear()
    })

    test('Item add, get, delete', () => {
        expect(ObjectsCache.get(kKey1)).toBeNull()
        expect(ObjectsCache.get(kKey2)).toBeNull()

        ObjectsCache.add(kKey1, kVal1)

        expect(ObjectsCache.get(kKey1).data).toEqual(kVal1)
        expect(ObjectsCache.get(kKey2)).toBeNull()

        ObjectsCache.delete(kKey1)
        ObjectsCache.delete(kKey2)

        expect(ObjectsCache.get(kKey1)).toBeNull()
        expect(ObjectsCache.get(kKey2)).toBeNull()
    })

    test('Cache clear', () => {
        ObjectsCache.add(kKey1, kVal1)
        ObjectsCache.add(kKey2, kVal2)

        expect(ObjectsCache.get(kKey1).data).toEqual(kVal1)
        expect(ObjectsCache.get(kKey2).data).toEqual(kVal2)

        ObjectsCache.clear()

        expect(ObjectsCache.get(kKey1)).toBeNull()
        expect(ObjectsCache.get(kKey2)).toBeNull()
    })

    test('Item updateTime', () => {
        const cacheItem = {
            data: kVal1,
            isError: false,
            updateTime: kFakeDateNow.getTime(),
        }
        expect(ObjectsCache.add(kKey1, kVal1)).toEqual(cacheItem)
        expect(ObjectsCache.get(kKey1)).toEqual(cacheItem)
    })

    test('Item error', () => {
        const cacheItem = {
            data: kVal1,
            isError: true,
            updateTime: kFakeDateNow.getTime(),
        }
        expect(ObjectsCache.add(kKey1, kVal1, true)).toEqual(cacheItem)
        expect(ObjectsCache.get(kKey1)).toEqual(cacheItem)
    })

    test('Item getTime', () => {
        expect(ObjectsCache.getTime(kKey1)).toBeNull()
        ObjectsCache.add(kKey1, kVal1)
        expect(ObjectsCache.getTime(kKey1)).toEqual('Sat, Jan 1, 2000 1:00 AM')
    })

    test('Item get item after expiration', () => {
        expect(ObjectsCache.get(kKey1)).toBeNull()
        ObjectsCache.add(kKey1, kVal1)
        expect(ObjectsCache.get(kKey1)).not.toBeNull()
        jest.useFakeTimers().setSystemTime(kFakeDateAfterExpiration)
        expect(ObjectsCache.get(kKey1)).toBeNull()
    })
})

export { }