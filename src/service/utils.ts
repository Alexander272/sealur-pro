export function splitString(str: string, arr: string, sep: string): string[] {
    const res = arr.split(sep)
    if (str !== "*") {
        return str.split(sep).map(s => res[+s])
    }

    return res
}
