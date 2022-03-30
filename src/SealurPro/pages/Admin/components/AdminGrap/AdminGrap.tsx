import { FC } from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../../../store/store"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"

type Props = {
    className: string
    classItem: string
    graphite: string[]
    onChange: (values: string[]) => void
}

export const AdminGrap: FC<Props> = ({ className, classItem, graphite, onChange }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    const grapHandler = (value: string) => () => {
        if (value === "all") {
            if (graphite[0] === "*") onChange([])
            else onChange(["*"])
            return
        }
        let tmp: string[] = []
        if (graphite[0] === "*") {
            addit?.graphite.forEach(g => {
                if (g.short !== value) tmp.push(g.short)
            })
        } else {
            tmp = [...graphite]
            if (tmp[0] === "") tmp = []
            if (tmp.includes(value)) {
                tmp = tmp.filter(t => t !== value)
            } else {
                tmp.push(value)
                if (tmp.length === addit?.graphite.length) {
                    onChange(["*"])
                    return
                }
            }
        }
        onChange(tmp)
    }

    const renderGrap = () => {
        return addit?.graphite.map(g => {
            let isAdded = false
            if (graphite[0] === "*") isAdded = true
            else if (graphite.includes(g.short)) isAdded = true

            return (
                <div key={g.short} className={classItem}>
                    <Checkbox
                        id={`grap-${g.short}`}
                        name={g.short}
                        checked={isAdded}
                        onChange={grapHandler(g.short)}
                        label={g.title}
                    />
                </div>
            )
        })
    }

    return (
        <div className={`${className} scroll`}>
            <div className={classItem}>
                <Checkbox
                    name='all-grap'
                    id='all-grap'
                    checked={graphite[0] === "*"}
                    onChange={grapHandler("all")}
                    label={
                        graphite[0] === "*" || graphite.length === addit?.graphite.length
                            ? "Удалить все"
                            : "Добавить все"
                    }
                />
            </div>
            {renderGrap()}
        </div>
    )
}
