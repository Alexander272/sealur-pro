import { IDetail, IFlanges, IMaterialData, IPersonData } from "./flange"

type TypeFlange = "welded" | "flat" | "free"
type TypeGasket = "Soft" | "Oval" | "Metal"

export interface IFormCapCalc {
    pressure: string
    axialForce: string
    temp: string
    isWork: boolean
    flanges: "isolated" | "nonIsolated" | "manually"
    isEmbedded: boolean
    type: "bolt" | "pin"
    condition: "uncontrollable" | "controllable" | "controllablePin"
    calculation: "basis" | "strength"
    gasket: {
        gasketId: string
        envId: string
        thickness: string
        d_out: string
        d_in: string
        data: {
            title: string
            type: TypeGasket
            qo: string
            m: string
            compression: string
            epsilon: string
            permissiblePres: string
        }
    }
    bolts: {
        markId: string
        title: string
        name: string
        diameter: string
        area: string
        count: string
        temp: string
        material: IMaterialData
    }
    embed: {
        markId: string
        thickness: string
        material: IMaterialData
    }
    flangesData: IFlanges

    isNeedFormulas: boolean

    personData: IPersonData
    detailData: IDetail
}
