export interface IStep {
    id: string
    title: string
    navigation: IStepNavigation[]
}

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
