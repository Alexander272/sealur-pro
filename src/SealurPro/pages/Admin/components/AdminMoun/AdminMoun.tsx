import { FC } from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../../../store/store"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"

type Props = {
    className: string
    classItem: string
    moun: string[]
    onChange: (values: string[]) => void
}

export const AdminMoun: FC<Props> = ({ className, classItem, moun, onChange }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    const mounHandler = (value: string) => () => {
        if (value === "all") {
            if (moun[0] === "*") onChange([])
            else onChange(["*"])
            return
        }
        let tmp: string[] = []
        if (moun[0] === "*") {
            addit?.mounting.forEach(m => {
                if (m.id !== value) tmp.push(m.id)
            })
            onChange(tmp)
        } else {
            tmp = [...moun]
            if (tmp.includes(value)) {
                onChange(tmp.filter(t => t !== value))
            } else {
                tmp.push(value)
                if (tmp.length === addit?.mounting.length) {
                    onChange(["*"])
                    return
                }
                onChange(tmp)
            }
        }
    }

    const renderMoun = () => {
        return addit?.mounting.map(m => {
            let isAdded = false
            if (moun[0] === "*") isAdded = true
            else if (moun.includes(m.id)) isAdded = true

            return (
                <div key={m.id} className={classItem}>
                    <Checkbox
                        id={`moun-${m.id}`}
                        name={m.id}
                        checked={isAdded}
                        onChange={mounHandler(m.id)}
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
                    name='all-moun'
                    id='all-moun'
                    checked={moun[0] === "*"}
                    onChange={mounHandler("all")}
                    label={
                        moun[0] === "*" || moun.length === addit?.mounting.length
                            ? "Удалить все"
                            : "Добавить все"
                    }
                />
            </div>
            {renderMoun()}
        </div>
    )
}
