import { FC } from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../../../store/store"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"

type Props = {
    className: string
    classItem: string
    coating: string[]
    onChange: (values: string[]) => void
}

export const AdminCoating: FC<Props> = ({ className, classItem, coating, onChange }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    const coatingHandler = (value: string) => () => {
        if (value === "all") {
            if (coating[0] === "*") onChange([])
            else onChange(["*"])
            return
        }
        let tmp: string[] = []
        if (coating[0] === "*") {
            addit?.coating.forEach(m => {
                if (m.id !== value) tmp.push(m.id)
            })
            onChange(tmp)
        } else {
            tmp = [...coating]
            if (tmp.includes(value)) {
                onChange(tmp.filter(t => t !== value))
            } else {
                tmp.push(value)
                if (tmp.length === addit?.coating.length) {
                    onChange(["*"])
                    return
                }
                onChange(tmp)
            }
        }
    }

    const renderCoating = () => {
        return addit?.coating.map(m => {
            let isAdded = false
            if (coating[0] === "*") isAdded = true
            else if (coating.includes(m.id)) isAdded = true

            return (
                <div key={m.id} className={classItem}>
                    <Checkbox
                        id={`coating-${m.id}`}
                        name={m.id}
                        checked={isAdded}
                        onChange={coatingHandler(m.id)}
                        label={m.title}
                    />
                </div>
            )
        })
    }

    return (
        <div className={`${className} scroll`}>
            <div className={classItem}>
                <Checkbox
                    name='all-coating'
                    id='all-coating'
                    checked={coating[0] === "*"}
                    onChange={coatingHandler("all")}
                    label={
                        coating[0] === "*" || coating.length === addit?.coating.length
                            ? "Удалить все"
                            : "Добавить все"
                    }
                />
            </div>
            {renderCoating()}
        </div>
    )
}
