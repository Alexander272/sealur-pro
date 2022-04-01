import { IMaterial, ITemperature } from "./snp"

export interface IPUTG {
    id: string
    typeFlId: string
    typePr: string
    construction: IConstruction[]
    temperatures: ITemperature[]
    reinforce: IMaterial
    obturator: IMaterial
    iLimiter: IMaterial
    oLimiter: IMaterial
    coating: string[]
    mounting: string[]
    graphite: string[]
}

export interface IConstruction {
    short: string
    title: string
    obturators: IObturator[]
}

export interface IObturator {
    short: string
    title: string
}
