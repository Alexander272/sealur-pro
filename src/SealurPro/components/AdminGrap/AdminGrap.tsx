import { FC } from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../store/store"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"

type Props = {
    className: string
    classItem: string
    graphite: string
    onChange: (value: string) => void
}

export const AdminGrap: FC<Props> = ({ className, classItem, graphite, onChange }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    // TODO исправить
    // const grapHandler = (value: string) => () => {
    //     if (value === "all") {
    //         if (graphite === "*") onChange("")
    //         else onChange("*")
    //         return
    //     }

    //     let tmp: string[] = []
    //     if (graphite === "*") {
    //         addit?.graphite.split(";").forEach(g => {
    //             let id = g.split("@")[0]
    //             if (id !== value) tmp.push(id)
    //         })
    //         onChange(tmp.join(";"))
    //     } else {
    //         tmp = graphite.split(";")
    //         if (tmp[0] === "") tmp = []

    //         if (tmp.includes(value)) {
    //             onChange(tmp.filter(t => t !== value).join(";"))
    //         } else {
    //             tmp.push(value)
    //             if (tmp.length === addit?.graphite.split(";").length) {
    //                 onChange("*")
    //                 return
    //             }
    //             // tmp.sort((a, b) => +a - +b)
    //             onChange(tmp.join(";"))
    //         }
    //     }
    // }

    // const renderGrap = () => {
    //     return addit?.graphite.split(";").map(g => {
    //         let isAdded = false
    //         const parts = g.split("@")
    //         if (graphite === "*") isAdded = true
    //         else if (graphite.split(";").includes(parts[0])) isAdded = true

    //         return (
    //             <div key={parts[0]} className={classItem}>
    //                 <Checkbox
    //                     name={parts[0]}
    //                     id={parts[0]}
    //                     checked={isAdded}
    //                     onChange={grapHandler(parts[0])}
    //                     label={parts[1]}
    //                 />
    //             </div>
    //         )
    //     })
    // }

    return (
        <div className={`${className} scroll`}>
            {/* <div className={classItem}>
                <Checkbox
                    name='all-grap'
                    id='all-grap'
                    checked={graphite === "*"}
                    onChange={grapHandler("all")}
                    label={graphite === "*" ? "Удалить все" : "Добавить все"}
                />
            </div>
            {renderGrap()} */}
        </div>
    )
}
