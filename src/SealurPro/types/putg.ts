import { ITemperature } from "./snp"

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

export interface IMaterial {
    values: string[]
    default: string
    obturators: string[]
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

export interface IPutgReq {
    form: "Round" | "Oval" | "Rectangular"
    flangeId: string
}

export interface IPutgImage {
    form: "Round" | "Oval" | "Rectangular"
    gasket: string
    url: string
}

export interface IPutgDTO {
    flangeId: string
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
