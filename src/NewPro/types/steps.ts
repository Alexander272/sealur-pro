import { ElementVariant } from "./elements"

export interface IStep {
    id: string
    title: string
    elements: ElementVariant[]
    navigation: IStepNavigation[]
}

//TODO type возможно надо заменить на перечисление возможный элементов
// export interface IElement {
//     id: string
//     type: string
//     label: string
//     defaultValue?: string
//     data: any[]
// }

export type StepNavigationType = "prev" | "next" | "finish"
export interface IStepNavigation {
    id: string
    type: StepNavigationType
    text: string
    options: IStepNavOption[]
}

export interface IStepNavOption {
    condition?: IStepCondition[]
    stepId: string
}

export interface IStepCondition {
    fieldName: string
    fieldValue: string
}

export interface IStepTitle {
    id: string
    title: string
}
