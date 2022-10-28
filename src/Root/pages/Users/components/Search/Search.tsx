import { ChangeEvent, FC, useState } from "react"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../../components/UI/Input/Input"
import { FieldType } from "../../../../types/search"
import classes from "./search.module.scss"

type Props = {
    search: string
    fields: FieldType[]
    changeSearch: (event: string) => void
    changeFields: (fields: FieldType[]) => void
}

const variants: { title: string; name: FieldType }[] = [
    { title: "Предприятие", name: "organization" },
    { title: "Город", name: "city" },
    { title: "Login", name: "login" },
    { title: "Ф.И.О.", name: "name" },
    { title: "Email", name: "email" },
]

export const Search: FC<Props> = ({ search, changeSearch, fields, changeFields }) => {
    const [open, setOpen] = useState(false)

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeSearch(event.target.value)
    }

    const toggleFieldsHandler = (field: FieldType) => () => {
        if (fields.includes(field)) {
            changeFields(fields.filter(f => f !== field))
        } else {
            changeFields([...fields, field])
        }
    }

    const toggleHandler = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className={classes.search}>
            <div className={classes.header}>
                <div className={classes.input}>
                    <Input
                        id='search'
                        name='search'
                        rounded='round'
                        placeholder='Поиск...'
                        value={search}
                        onChange={searchHandler}
                    />
                    {search && (
                        <p className={classes.icon} onClick={() => changeSearch("")}>
                            &times;
                        </p>
                    )}
                </div>
                <p className={classes.icon} onClick={toggleHandler}>
                    &#9881;
                </p>
            </div>

            <div className={`${classes.fields} ${open ? classes.open : ""}`}>
                {variants.map(v => (
                    <Checkbox
                        key={v.name}
                        id={v.name}
                        name={v.name}
                        label={v.title}
                        checked={fields.includes(v.name)}
                        onChange={toggleFieldsHandler(v.name)}
                    />
                ))}
            </div>
        </div>
    )
}
