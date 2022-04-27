import { IMaterial, ITemperature } from "./snp"

export interface IPUTG {
    id: string
    typeFlId: string
    typePr: string
    form: "Round" | "Oval" | "Rectangular"
    construction: IConstr[]
    temperatures: IGrap[]
    reinforce: IMaterial
    obturator: IMaterial
    iLimiter: IMaterial
    oLimiter: IMaterial
    coating: string[]
    mounting: string[]
    graphite: string[]
}

export interface IConstr {
    grap: string
    temperatures: ITemp[]
}

export interface ITemp {
    temp: string
    constructions: IConstruction[]
}

export interface IConstruction {
    short: string
    obturators: IObturator[]
}

export interface IObturator {
    short: string
    imageUrl: string
}

export interface IGrap {
    grap: string
    temps: ITemperature[]
}
