import { useCallback, useState } from "react"
import { FieldType } from "../../../../types/search"

export const useSearch = () => {
    const [search, setSearch] = useState("")
    const [fields, setFields] = useState<FieldType[]>([
        "city",
        "email",
        "login",
        "name",
        "organization",
    ])

    const changeSearch = useCallback(
        (value: string) => {
            setSearch(value)
        },
        [setSearch]
    )

    const changeFields = useCallback(
        (fields: FieldType[]) => {
            setFields(fields)
        },
        [setFields]
    )

    return { search, fields, changeSearch, changeFields }
}
