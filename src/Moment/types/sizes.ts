export interface ISizeResponse {
    sizeRow1: IFullSize[]
    sizeRow2?: IFullSize[]
}

export interface IFullSize {
    id: string
    standId: string
    d: number
    dn?: string
    dmm?: number
    d6: number
    dOut: number
    x?: number
    a?: number
    h: number
    length: number
    pn: number
    s0: number
    s1: number
    count: number
    boltId: string
    row: number
}
