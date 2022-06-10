export type UserFields = "organization" | "name" | "email" | "city" | "position" | "phone"
export type EquipFields =
    | "techprocess"
    | "equipment"
    | "seal"
    | "consumer"
    | "factory"
    | "developer"
export type TempFields = "diffFrom" | "diffTo" | "presWork" | "presTest" | "pressure" | "environ"
export type HeatFields =
    | "tempWorkPipe"
    | "presWorkPipe"
    | "environPipe"
    | "tempWork"
    | "presWork"
    | "environ"
export type MediumBoolFields = "abrasive" | "crystallized" | "penetrating"
export type MediumFields = "condition" | "period"
export type TypeFields = "flange" | "typeFl" | "type"

export interface IMaterial {
    id: string
    title: string
    typeMat: string
}

export interface IBoltMaterial {
    id: string
    title: string
}

export interface ISizeIntReq {
    flange: string
    typeFl: string
    row: number
}
export interface ISizeInt {
    id: string
    dy: string
    py: string
    dUp: string
    d1: string
    d2: string
    d: string
    h1: string
    h2: string
    bolt: string
    countBolt: number
}

export interface IEquipment {
    techprocess: string
    equipment: string
    seal: string
    consumer: string
    factory: string
    developer: string
}

export interface ITemperature {
    diffFrom: string
    diffTo: string
    presWork: string
    presTest: string
    pressure: string
    environ: string
}

export interface IHeat {
    tempWorkPipe: string
    presWorkPipe: string
    environPipe: string
    tempWork: string
    presWork: string
    environ: string
}

export interface IMedium {
    abrasive: boolean
    crystallized: boolean
    penetrating: boolean
    condition: string
    period: string
}

export interface IType {
    flange: string
    typeFl: string
    type: string
}
