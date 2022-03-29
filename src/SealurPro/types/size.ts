export interface ISize {
    id: string
    dn: string
    pn: string
    typePr: string
    typeFlId: string
    d4?: number
    d3: number
    d2: number
    d1?: number
    h: string
    s2?: string
    s3?: string
}

export interface IDn {
    dn: string
}

export interface ISizeReq {
    flShort: string
    typePr: string
    typeFlId: string
    standId: string
}

export interface ISizeDTO {
    flange: string
    standId: string
    dn: string
    pn: string
    typePr: string
    typeFlId: string
    d4?: number
    d3: number
    d2: number
    d1?: number
    h: string
    s2?: string
    s3?: string
}
