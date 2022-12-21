export const addIcon = jest.fn()
export const PluginSettingTab = jest.fn()
export const requestUrl = jest.fn(() => {
    return { status: 200, json: {} }
})