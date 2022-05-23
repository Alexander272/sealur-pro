export interface IAddit {
    id: string
    materials: IMat[]
    mod: IMod[]
    temperature: ITemp[]
    mounting: IMoun[]
    graphite: IGrap[]

    fillers: IFiller[]

    coating: ICoating[]
    construction: IConstruction[]
    obturator: IObturator[]
    basis: IBasis[]
    pObturator: IObturator[]
    sealant: ISealant[]
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

export interface IConstruction {
    short: string
    title: string
    description: string
}

export interface IObturator {
    short: string
    title: string
    description: string
    forDescr: string
}

export interface ICoating {
    id: string
    short: string
    title: string
    description: string
}

export interface IBasis {
    short: string
    title: string
    description: string
}

export interface ISealant {
    id: string
    short: string
    title: string
    description: string
    forDescr: string
}
