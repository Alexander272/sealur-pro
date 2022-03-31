export interface ISNP {
    id: string
    typeFlId: string
    typePr: string
    fillers: IFiller[]
    frame: IMaterial
    ir: IMaterial
    or: IMaterial
    mounting: string[]
    graphite: string[]
}

export interface IMaterial {
    values: string[]
    default: string
}

export interface IFiller {
    id: string
    temps: ITemperature[]
}

export interface ITemperature {
    id: string
    mods: string[]
}

export interface ISNPReq {
    standId: string
    flangeId: string
}

export interface ISNPDTO {
    standId: string
    flangeId: string
    typeFlId: string
    typePr: string
    fillers: IFiller[]
    frame: IMaterial
    ir: IMaterial
    or: IMaterial
    mounting: string[]
    graphite: string[]
}

export interface ISnpForm {
    st: string
    typeFl: string
    typePr: string

    dn: string
    d4: number
    d3: number
    d2: number
    d1: number
    s2: string
    s3: string
    pn: string
    h: string
    oh: string

    grap: string
    filler: string
    temp: string
    mod: string

    isJumper: boolean
    jumper: string
    jumWidth: string
    isHole: boolean
    isMoun: boolean
    moun: string

    ir: string
    or: string
    fr: string

    count: number
}
