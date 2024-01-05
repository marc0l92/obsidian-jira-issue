import { IJiraIssue, toDefaultedIssue } from "../src/interfaces/issueInterfaces"

const kVal1 = 'val1'
const kVal2 = 'val2'
const kVal3 = 'val3'

describe('IssueInterfaces', () => {
    test('toDefaultedIssue empty issue', () => {
        const issue = toDefaultedIssue({} as IJiraIssue)
        expect(issue.fields.creator.displayName).toEqual('')
        expect(issue.fields.status.statusCategory.colorName).toEqual('')
    })

    test('toDefaultedIssue partial issue', () => {
        const issue = toDefaultedIssue({
            key: kVal1,
            id: kVal2,
            account: null,
            fields: {
                creator: {
                    active: true,
                    avatarUrls: {
                        "16x16": kVal1
                    },
                    displayName: kVal2,
                    self: kVal3,
                },
                customfield_10000: kVal1,
                customfield_10001: { key: kVal1 },
            }
        } as any)
        expect(issue.key).toEqual(kVal1)
        expect(issue.id).toEqual(kVal2)
        expect(issue.fields.creator.active).toEqual(true)
        expect(issue.fields.creator.avatarUrls["16x16"]).toEqual(kVal1)
        expect(issue.fields.creator.avatarUrls["32x32"]).toEqual('')
        expect(issue.fields.creator.displayName).toEqual(kVal2)
        expect(issue.fields.creator.self).toEqual(kVal3)
        expect(issue.fields.status.statusCategory.colorName).toEqual('')
        expect(issue.fields.assignee.active).toEqual(false)
        expect(issue.fields.assignee.displayName).toEqual('')
        expect(issue.fields.customfield_10000).toEqual(kVal1)
        expect(issue.fields.customfield_10001.key).toEqual(kVal1)
    })

    test('toDefaultedIssue invalid', () => {
        expect(toDefaultedIssue(null)).toBeNull()
    })
})

export { }