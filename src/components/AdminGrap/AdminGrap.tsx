import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Checkbox } from "../UI/Checkbox/Checkbox"

type Props = {
    className: string
    classItem: string
    graphite: string
    onChange: (value: string) => void
}

export const AdminGrap: FC<Props> = ({ className, classItem, graphite, onChange }) => {
    const addit = useSelector((state: RootState) => state.addit.addit)

    const grapHandler = (value: string) => () => {
        if (value === "all") {
            if (graphite === "*") onChange("")
            else onChange("*")
            return
        }

        let tmp: string[] = []
        if (graphite === "*") {
            addit?.graphite.split(";").forEach((_, idx) => {
                if (idx.toString() !== value) tmp.push(idx.toString())
            })
            onChange(tmp.join(";"))
        } else {
            tmp = graphite.split(";")
            if (tmp[0] === "") tmp = []

            if (tmp.includes(value)) {
                onChange(tmp.filter(t => t !== value).join(";"))
            } else {
                tmp.push(value)
                if (tmp.length === addit?.graphite.split(";").length) {
                    onChange("*")
                    return
                }
                tmp.sort((a, b) => +a - +b)
                onChange(tmp.join(";"))
            }
        }
    }

    const renderGrap = () => {
        return addit?.graphite.split(";").map((g, idx) => {
            let isAdded = false
            if (graphite === "*") isAdded = true
            else if (graphite.split(";").includes(idx.toString())) isAdded = true

            const parts = g.split("@")
            return (
                <div key={parts[0]} className={classItem}>
                    <Checkbox
                        name={parts[0]}
                        id={parts[0]}
                        checked={isAdded}
                        onChange={grapHandler(idx.toString())}
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
                    name='all-grap'
                    id='all-grap'
                    checked={graphite === "*"}
                    onChange={grapHandler("all")}
                    label={graphite === "*" ? "Удалить все" : "Добавить все"}
                />
            </div>
            {renderGrap()}
        </div>
    )
}
