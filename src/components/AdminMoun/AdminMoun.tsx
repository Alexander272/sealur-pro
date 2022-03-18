import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Checkbox } from "../UI/Checkbox/Checkbox"

type Props = {
    className: string
    classItem: string
    moun: string
    onChange: (value: string) => void
}

export const AdminMoun: FC<Props> = ({ className, classItem, moun, onChange }) => {
    const addit = useSelector((state: RootState) => state.addit.addit)

    const mounHandler = (value: string) => () => {
        if (value === "all") {
            if (moun === "*") onChange("")
            else onChange("*")
            return
        }

        let tmp: string[] = []
        if (moun === "*") {
            addit?.mounting.split(";").forEach(m => {
                let id = m.split("@")[0]
                if (id !== value) tmp.push(id)
            })
            onChange(tmp.join(";"))
        } else {
            tmp = moun.split(";")
            if (tmp[0] === "") tmp = []

            if (tmp.includes(value)) {
                onChange(tmp.filter(t => t !== value).join(";"))
            } else {
                tmp.push(value)
                if (tmp.length === addit?.mounting.split(";").length) {
                    onChange("*")
                    return
                }
                // tmp.sort((a, b) => +a - +b)
                onChange(tmp.join(";"))
            }
        }
    }

    const renderMoun = () => {
        return addit?.mounting.split(";").map(m => {
            let isAdded = false
            const parts = m.split("@")
            if (moun === "*") isAdded = true
            else if (moun.split(";").includes(parts[0])) isAdded = true

            return (
                <div key={m} className={classItem}>
                    <Checkbox
                        name={m}
                        id={m}
                        checked={isAdded}
                        onChange={mounHandler(parts[0])}
                        label={parts[1]}
                    />
                </div>
            )
        })
    }

    return (
        <div className={`${className} scroll`}>
            <div className={classItem}>
                <Checkbox
                    name='all-moun'
                    id='all-moun'
                    checked={moun === "*"}
                    onChange={mounHandler("all")}
                    label={moun === "*" ? "Удалить все" : "Добавить все"}
                />
            </div>
            {renderMoun()}
        </div>
    )
}
