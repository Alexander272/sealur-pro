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
