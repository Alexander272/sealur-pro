export function splitString(str: string, arr: string): string[] {
    if (str === "") return []
    const res = arr.split(";")

    if (str !== "*") {
        return str.split(";").map(s => {
            const tmp = res.find(r => r.split("@")[0] === s)
            if (tmp) return tmp
            return ""
        })
    }

    return res
}

export function replaceArray(orig: string[], arr: any[], field: string): any[] {
    if (!orig) return []

    if (orig[0] === "*") {
        return arr
    }

    return arr.filter(a => orig.includes(a[field]))
}
