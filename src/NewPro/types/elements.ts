export type ElementType = "Select" | "Input" | "Checkbox"

export interface IElement {
    id: string
    type: ElementType
    label: string
    defaultValue?: string
    data: any[]
}

export type ElementBase<ExtraProps> = {
    id: string
    type: ElementType
    name: string
} & ExtraProps

interface IElementSelect {
    label?: string
    defaultValue?: string
    data: any[]
}

interface IElementInput {
    label?: string
    placeholder?: string
    units?: string
}

interface IElementCheckbox {
    label?: string
}

export type ElementSelect = ElementBase<IElementSelect>
export type ElementInput = ElementBase<IElementInput>
export type ElementCheckbox = ElementBase<IElementCheckbox>

export type ElementVariant = ElementSelect | ElementInput | ElementCheckbox
