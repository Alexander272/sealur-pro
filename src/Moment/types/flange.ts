export interface IFormCalculate {
    pressure: number
    axialForce: number
    bendingMoment: number
    temp: number
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
        thickness: number
        d_out: number
        d_in: number
    }
    bolts: {
        markId: string
        diameter: number
        count: number
    }
    embed: {
        markId: string
        thickness: number
    }
    flangesData: {
        first: IFlanges
        second: IFlanges
    }

    isNeedFormulas: boolean
}

interface IFlanges {
    type: "welded" | "flat" | "free"
    standartId: string
    markId: string
    dy: number
    py: number
    corrosion: number
    size: IFlangeSize
    material: IFlangeMaterial
}

interface IFlangeSize {
    dOut: number
    d: number
    h: number
    s0: number
    s1: number
    l: number
    d6: number
}

interface IFlangeMaterial {
    title: string
    alphaF: number
    epsilonAt20: number
    epsilon: number
    sigmaAt20: number
    sigma: number
}

export interface IFlangeData {
    data: {
        typeFlange: ITypeFlange[]
        standarts: IStandart[]
        gaskets: IGasket[]
        env: IEnv[]
        materials: IMaterial[]
    }
}

export interface ITypeFlange {
    id: string
    title: string
}

export interface IStandart {
    id: string
    title: string
    typeId: string
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
