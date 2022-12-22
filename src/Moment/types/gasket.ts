import { IEnvData, IEnvType } from "./env"

export interface IGasketData {
    id: string
    gasketId: string
    compression: number
    epsilon: number
    permissiblePres: number
    thickness: number
    typeId: string
}

export interface IGasketType {
    id: string
    label: string
    title: string
}

export type FullData = {
    gasketData: IGasketData[]
    gasketType: IGasketType[]
    envData: IEnvData[]
    envType: IEnvType[]
}
