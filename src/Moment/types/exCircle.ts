import { IDetail, IPersonData, TypeGasket } from "./flange"

export interface IFormExCircle {
    pressure: string
    type: "bolt" | "pin"
    condition: "uncontrollable" | "controllable" | "controllablePin"
    bolts: IBoltData
    gasket: IGasketFullData

    isNeedFormulas: boolean

    personData?: IPersonData
    detailData?: IDetail
}

export interface IMaterialData {
    title: string
    epsilonAt20: string
    sigmaAt20: string
}

export interface IBoltData {
    count: string
    boltId: string
    markId: string
    title?: string
    diameter?: string
    area?: string
    material?: IMaterialData
}

export interface IGasketFullData {
    gasketId: string
    envId: string
    thickness: string
    dOut: string
    dIn: string
    data?: GasketData
}

export interface GasketData {
    title: string
    type: TypeGasket
    qo: string
    m: string
    compression: string
    epsilon: string
    permissiblePres: string
}
