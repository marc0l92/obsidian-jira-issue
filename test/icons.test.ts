import * as obsidian from 'obsidian'
import { setupIcons } from "../src/icons/icons"

describe('Icons', () => {
    test('Icons setup', () => {
        const addIconMock = jest.spyOn(obsidian, 'addIcon')
        setupIcons()
        expect(addIconMock).toBeCalledTimes(6)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})

export { }