import { IGasketData, IBoltData } from "./exCircle"
import { IDetail, IPersonData } from "./flange"

export interface IGasCoolingForm {
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

export interface IGasketFullData {}
