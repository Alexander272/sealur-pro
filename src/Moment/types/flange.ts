type TypeFlange = "welded" | "flat" | "free"
type TypeGasket = "Soft" | "Oval" | "Metal"

export interface IFormFlangeCalc {
    pressure: string
    axialForce: string
    bendingMoment: string
    temp: string
    isWork: boolean
    flanges: "isolated" | "nonIsolated" | "manually"
    isSameFlange: boolean
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
    flangesData: {
        first: IFlanges
        second: IFlanges
    }
    isUseWasher: boolean
    washer: {
        first: {
            markId: string
            material: IMaterialData
        }
        second: {
            markId: string
            material: IMaterialData
        }
        thickness: string
    }

    isNeedFormulas: boolean
}

interface IFlanges {
    type: TypeFlange
    standartId: string
    markId: string
    dy: number
    py: number
    corrosion: string
    temp: string
    size: IFlangeSize
    material: IMaterialData
    ringMarkId: string
    ringMaterial: IMaterialData
}

interface IFlangeSize {
    dOut: string
    d: string
    h: string
    s0: string
    s1: string
    l: string
    d6: string
}

interface IMaterialData {
    title: string
    alphaF: string
    epsilonAt20: string
    epsilon: string
    sigmaAt20: string
    sigma: string
}

export interface IFlangeData {
    typeFlange: ITypeFlange[]
    standarts: IStandart[]
    gaskets: IGasket[]
    env: IEnv[]
    materials: IMaterial[]
}

export interface ITypeFlange {
    id: string
    title: string
    label: TypeFlange
}

export interface IStandart {
    id: string
    title: string
    typeId: string
    titleDn: string
    titlePn: string
    isNeedRow: boolean
    rows: string[]
    sizes: {
        sizeRow1: ISize[]
        sizeRow2?: ISize[]
    }
}

export interface IMaterial {
    id: string
    title: string
}

export interface IGasket {
    id: string
    title: string
    thickness: number[]
}

export interface IEnv {
    id: string
    title: string
}

export interface ISize {
    dn: number
    pn: number[]
}

export interface ITypeGasket {
    id: string
    title: string
    label: TypeGasket
}

export interface IBolt {
    id: string
    title: string
    diameter: number
    area: number
}
