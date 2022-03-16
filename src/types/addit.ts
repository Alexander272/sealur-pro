export interface IAddit {
    id: string
    materials: string
    mod: string
    temperature: string
    mounting: string
    graphite: string

    fillers: string
}

export interface IMat {
    short: string
    title: string
}

export interface ITemp {
    index: string
    title: string
}

export interface IMod {
    index: string
    short: string
    title: string
    description: string
}

export interface IMoun {
    title: string
}

export interface IGrap {
    short: string
    title: string
    description: string
}
