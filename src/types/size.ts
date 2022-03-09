export interface ISize {
    id: string
    dn: string
    pn: string
    typePr: string
    typeFlId: string
    d4?: string
    d3: string
    d2: string
    d1?: string
    h: string
    s2?: string
    s3?: string
}

export interface ISizeReq {
    flShort: string
    typePr: string
    typeFlId: string
    standId: string
}
