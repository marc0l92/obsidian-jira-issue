export interface IJiraIssue {
    //TODO: complete
}

export interface IJiraSearchResults {
    //TODO: complete
}

export function createProxy<T extends object>(obj: T): T {
    const proxy = new Proxy<T>(obj, {
        get: (target: T, p: string, receiver: any) => {
            if (p in target) {
                const value = Reflect.get(target, p, receiver)
                console.log('Got:', value)
                if (value) {
                    console.log(`Key ${p} found in:`, target, value)
                    if (value instanceof Object) {
                        return createProxy(value)
                    } else {
                        return value
                    }
                }
            }
            console.log(`Key ${p} not found in:`, target)
            return ''
        },
    })
    return proxy
}