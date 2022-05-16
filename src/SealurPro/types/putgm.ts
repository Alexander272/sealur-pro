import { IGrap, IMaterial } from "./putg"
import { IMaterial as ISnpMaterial } from "./snp"

export interface IPUTGM {
    id: string
    typeFlId: string
    typePr: string
    form: "Round" | "Oval" | "Rectangular"
    // construction: IConstr[]

    temperatures: IGrap[]
    basis: IMaterial
    obturator: IMaterial
    seal: ISnpMaterial
    coating: string[]
    mounting: string[]
    graphite: string[]
}

export interface IPutgDTO {
    flangeId: string
    typeFlId: string
    typePr: string
    form: "Round" | "Oval" | "Rectangular"
    // construction: IConstr[]
    temperatures: IGrap[]
    basis: IMaterial
    obturator: IMaterial
    coating: string[]
    mounting: string[]
    graphite: string[]
}
