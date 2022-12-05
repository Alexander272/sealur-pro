import { IGasketData, IBoltData } from "./exCircle"
import { IDetail, IPersonData } from "./flange"

export interface IFormExRect {
    pressure: string
    hasTestPressure: boolean
    testPressure: string
    type: "bolt" | "pin"
    condition: "uncontrollable" | "controllable" | "controllablePin"
    bolts: IBoltData
    gasket: IGasketFullData

    isNeedFormulas: boolean

    personData?: IPersonData
    detailData?: IDetail
}

export interface IGasketFullData {
    gasketId: string
    envId: string
    thickness: string
    // bp - Ширина прокладки
    width: string
    // L2 - Размер прокладки в продольном направлении
    sizeLong: string
    // B2 - Размер прокладки в поперечном направление
    sizeTrans: string
    data?: IGasketData
}
