jest.mock('../src/settings', () => {
    return { SettingsData: { accounts: [] } }
})

import { SettingsData } from '../src/settings'
import { getAccountByAlias, getAccountByHost, getRandomHexColor, getRandomRGBColor, resetRandomGenerator } from '../src/utils'
import { TestAccountBasic, TestAccountOpen } from './testData'

const kAccountNotFound = 'NotExistingAlias'

SettingsData.accounts = [TestAccountOpen, TestAccountBasic]

describe('Utils', () => {
    describe('accounts', () => {
        test('getAccountByAlias ok', () => {
            expect(getAccountByAlias(TestAccountOpen.alias)).toEqual(TestAccountOpen)
            expect(getAccountByAlias(TestAccountBasic.alias)).toEqual(TestAccountBasic)
        })
        test('getAccountByAlias not found', () => {
            expect(() => getAccountByAlias(kAccountNotFound)).toThrow(new Error(`No accounts found with alias: ${kAccountNotFound}`))
        })
        test('getAccountByAlias invalid input', () => {
            expect(getAccountByAlias(null)).toBeNull()
        })

        test('getAccountByHost ok', () => {
            expect(getAccountByHost(TestAccountOpen.host)).toEqual(TestAccountOpen)
            expect(getAccountByHost(TestAccountBasic.host)).toEqual(TestAccountBasic)
        })
        test('getAccountByHost not found', () => {
            expect(getAccountByHost(kAccountNotFound)).toBeNull()
        })
        test('getAccountByHost invalid input', () => {
            expect(getAccountByHost(null)).toBeNull()
        })
    })
    describe('colors', () => {
        beforeEach(() => {
            resetRandomGenerator()
        })

        test('getRandomHexColor', () => {
            expect(getRandomHexColor()).toEqual('#ec097a')
            expect(getRandomHexColor()).toEqual('#dc84b7')
            expect(getRandomHexColor()).toEqual('#cc60fb')
        })
        test('getRandomRGBColor', () => {
            expect(getRandomRGBColor()).toEqual({ r: 236, g: 9, b: 122 })
            expect(getRandomRGBColor()).toEqual({ r: 220, g: 132, b: 183 })
            expect(getRandomRGBColor()).toEqual({ r: 204, g: 96, b: 251 })
        })
    })
})

export { }