jest.mock('../src/main', () => {
    return { ObsidianApp: { vault: { getConfig: jest.fn() } } }
})
jest.mock('../src/settings', () => jest.requireActual('./__mocks__/settings').default)

import { SettingsData } from '../src/settings'
import RC from '../src/rendering/renderingCommon'
import { EColorSchema } from '../src/interfaces/settingsInterfaces'
import * as main from '../src/main'

const kLightCSSClass = 'is-light'
const kDarkCSSClass = 'is-dark'


describe('RenderingCommon', () => {
    describe('getTheme', () => {
        test('Light', () => {
            SettingsData.colorSchema = EColorSchema.LIGHT
            expect(RC.getTheme()).toEqual(kLightCSSClass)
        })
        test('Dark', () => {
            SettingsData.colorSchema = EColorSchema.DARK
            expect(RC.getTheme()).toEqual(kDarkCSSClass)
        })
        test('Not Set', () => {
            SettingsData.colorSchema = null
            expect(RC.getTheme()).toEqual(kLightCSSClass)
        })
        test('Follow Obsidian - Light', () => {
            // @ts-ignore
            const getConfigMock = main.ObsidianApp.vault.getConfig
            getConfigMock.mockReturnValueOnce('moonstone')
            SettingsData.colorSchema = EColorSchema.FOLLOW_OBSIDIAN
            expect(RC.getTheme()).toEqual(kLightCSSClass)
        })
        test('Follow Obsidian - Dark', () => {
            // @ts-ignore
            const getConfigMock = main.ObsidianApp.vault.getConfig
            getConfigMock.mockReturnValueOnce('obsidian')
            SettingsData.colorSchema = EColorSchema.FOLLOW_OBSIDIAN
            expect(RC.getTheme()).toEqual(kDarkCSSClass)
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})

export { }
