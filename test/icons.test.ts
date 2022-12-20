import { addIcon } from "../__mocks__/obsidian"
import { setupIcons } from "../src/icons/icons"

jest.mock('obsidian')

describe('Icons', () => {
    test('Icons setup', () => {
        setupIcons()
        expect(addIcon.mock.calls.length).toBe(6)
    })
})

export { }