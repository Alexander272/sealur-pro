export interface ISNP {
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

export interface ISNPUpdate extends ISNP {
    standId: string
    flangeId: string
}

export interface ISNPCreate {
    standId: string
    flangeId: string
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
