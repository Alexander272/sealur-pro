import { ISignUp } from "../../types/user"
import { IDrawing } from "./drawing"

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
    | "tempWorkAnn"
    | "presWorkAnn"
    | "environAnn"
export type MediumBoolFields = "abrasive" | "crystallized" | "penetrating"
export type MediumFields = "condition" | "period"
export type TypeFields = "flange" | "typeFl" | "type"
export type MaterFields = "material" | "boltMaterial"
export type DefFields = "along" | "across" | "nonFlatness" | "drawingNumber"

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
    row?: number
}
export interface IPadSize {
    dIn: string
    dOut: string
    h: string
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
    tempWorkAnn: string
    presWorkAnn: string
    environAnn: string
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

export interface IMater {
    material: string
    boltMaterial: string
    lubricant: boolean
}

export interface IDefects {
    along: string
    across: string
    nonFlatness: string
    mounting: boolean
    drawingNumber: string
}

export interface ISurveyDTO
    extends ISignUp,
        IEquipment,
        ITemperature,
        IHeat,
        IMedium,
        IType,
        IMater,
        IDefects {
    size: (IPadSize & ISizeInt) | ISizeInt
    drawing: IDrawing | null
    info: string
}

export interface ISizeIntDTO {
    flange: string
    typeFl: string
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
    row?: number
}
