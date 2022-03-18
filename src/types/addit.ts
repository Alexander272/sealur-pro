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
    id: string
    title: string
}

export interface IMod {
    id: string
    short: string
    title: string
    description: string
}

export interface IMoun {
    id: string
    title: string
}

export interface IGrap {
    short: string
    title: string
    description: string
}

export interface IFiller {
    short: string
    title: string
    description: string
}
