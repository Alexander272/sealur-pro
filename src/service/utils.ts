export function splitString(str: string, arr: string, sep: string): string[] {
    if (str === "") return []
    const res = arr.split(sep)
    if (str !== "*") {
        return str.split(sep).map(s => res[+s])
    }

    return res
}
