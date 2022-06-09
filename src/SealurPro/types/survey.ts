export type UserFields = "organization" | "name" | "email" | "city" | "position" | "phone"
export type EquipFileds =
    | "techprocess"
    | "equipment"
    | "seal"
    | "consumer"
    | "factory"
    | "developer"
export type TempFields = "diffFrom" | "diffTo" | "presWork" | "presTest" | "pressure" | "environ"
export type HeatFileds =
    | "tempWorkPipe"
    | "presWorkPipe"
    | "environPipe"
    | "tempWork"
    | "presWork"
    | "environ"

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
