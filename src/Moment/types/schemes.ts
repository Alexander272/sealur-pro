type FieldInput = {
    // component: "input"
    name: string
    type: "number" | "text"
    suffix: string
}

type FieldSelect = {
    // component: "select"
    name: string
    options: { value: any; title: string }[]
}

export interface IDataSchema {
    fieldInput?: FieldInput
    fieldSelect?: FieldSelect
    title: string
}
