export interface ISNP {
    id: string
    typeFlId: string
    typeFlUrl: string
    typePr: string
    typeUrl: string
    fillers: string
    materials: string
    defMat: string
    mod: string
    temperature: string
    mounting: string
    graphite: string
}

export interface ISNPCopy {
    id: string
    typeFlId: string
    typeFlUrl: string
    typePr: string
    typeUrl: string
    fillers: string
    materials: string
    defMat: string
    mounting: string
    graphite: string
}

export interface ISNPReq {
    standId: string
    flangeId: string
}
