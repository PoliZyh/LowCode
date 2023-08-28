

export function deepCopy<T>(obj: T): T {
    let newObj: { [key: string]: any } | any = null
    if (typeof obj === 'object' && obj !== null) {
        newObj = Array.isArray(obj) ? [] : {}
        for (let key in obj) {
            newObj[key] = deepCopy(obj[key])
        }
    } else {
        newObj = obj
    }
    return newObj
}


