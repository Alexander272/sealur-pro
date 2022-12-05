import { IEnv, IGasket, IMaterial } from "./flange"

export interface IDeviceMod {
    id: string
    title: string
}

export interface IPressure {
    id: string
    value: number
}

export interface ITubeCount {
    id: string
    value: number
}

export interface IFinningFactor {
    id: string
    devId: string
    value: string
}

export interface ISectionExecution {
    id: string
    devId: string
    value: string
}

export interface ITubeLength {
    id: string
    devId: string
    value: string
}

export interface INumberOfMoves {
    id: string
    devId: string
    countId: string
    value: string
}

export interface INameGasket {
    id: string
    findId: string
    numId: string
    presId: string
    title: string
    sizeLong: number
    sizeTrans: number
    width: number
    thick1: number
    thick2: number
    thick3: number
    thick4: number
}

export interface IAVOData {
    gaskets: IGasket[]
    materials: IMaterial[]
    env: IEnv[]
    devices: IDeviceMod[]
    pressure: IPressure[]
    tubeCount: ITubeCount[]
    finningFactor: IFinningFactor[]
    sectionExecution: ISectionExecution[]
    tubeLength: ITubeLength[]
    numberOfMoves: INumberOfMoves[]
}
