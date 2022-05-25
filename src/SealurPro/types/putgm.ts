import { IGrap, IMaterial } from "./putg"
import { IMaterial as ISnpMaterial } from "./snp"

export interface IPUTGM {
    id: string
    typeFlId: string
    typePr: string
    form: "Round" | "Oval" | "Rectangular"
    construction: IConstruction[]
    temperatures: IGrap[]
    basis: IMaterial
    obturator: IMaterial
    // seal: ISnpMaterial
    coating: string[]
    mounting: string[]
    graphite: string[]
}

export interface IPutgmDTO {
    flangeId: string
    typeFlId: string
    typePr: string
    form: "Round" | "Oval" | "Rectangular"
    construction: IConstruction[]
    temperatures: IGrap[]
    basis: IMaterial
    obturator: IMaterial
    coating: string[]
    mounting: string[]
    graphite: string[]
}

export interface IConstruction {
    grap: string
    basis: IBasis[]
}

export interface IBasis {
    basis: string
    obturator: IObturator[]
}

export interface IObturator {
    obturator: string
    sealant: ISeal[]
}

export interface ISeal {
    seal: string
    imageUrl: string
}

export interface IPutgmImage {
    id: string
    form: "Round" | "Oval" | "Rectangular"
    gasket: string
    url: string
}

export interface IPutgmReq {
    form: "Round" | "Oval" | "Rectangular"
    flangeId: string
}
