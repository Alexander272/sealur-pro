export interface IAddit {
    id: string
    materials: IMat[]
    mod: IMod[]
    temperature: ITemp[]
    mounting: IMoun[]
    graphite: IGrap[]

    fillers: IFiller[]
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
