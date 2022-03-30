import { FC } from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../../../store/store"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"

type Props = {
    className: string
    classItem: string
    mat: string
    name: string
    onChange: (value: string, name: string) => void
}

export const AdminMat: FC<Props> = ({ className, classItem, mat, name, onChange }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    // TODO исправить
    // const matHandler = (value: string) => () => {
    //     if (value === "all") {
    //         if (mat === "*") onChange("", name)
    //         else onChange("*", name)
    //         return
    //     }

    //     let tmp: string[] = []
    //     if (mat === "*") {
    //         addit?.materials.split(";").forEach(m => {
    //             let id = m.split("@")[0]
    //             if (id !== value) tmp.push(id)
    //         })
    //         onChange(tmp.join(";"), name)
    //     } else {
    //         tmp = mat.split(";")
    //         if (tmp[0] === "") tmp = []

    //         if (tmp.includes(value)) {
    //             onChange(tmp.filter(t => t !== value).join(";"), name)
    //         } else {
    //             tmp.push(value)
    //             if (tmp.length === addit?.materials.split(";").length) {
    //                 onChange("*", name)
    //                 return
    //             }
    //             onChange(tmp.join(";"), name)
    //         }
    //     }
    // }

    // const renderMat = (curMat: string) => {
    //     return addit?.materials.split(";").map(m => {
    //         const parts = m.split("@")
    //         let isAdded = false
    //         if (curMat === "*") isAdded = true
    //         else if (curMat.split(";").includes(parts[0])) isAdded = true

    //         return (
    //             <div key={parts[0]} className={classItem}>
    //                 <Checkbox
    //                     name={`${parts[0]}-${name}`}
    //                     id={`${parts[0]}-${name}`}
    //                     checked={isAdded}
    //                     onChange={matHandler(parts[0])}
    //                     label={`${parts[0]} ${parts[1]}`}
    //                 />
    //             </div>
    //         )
    //     })
    // }

    return (
        <div className={`${className} scroll`}>
            {/* <div className={classItem}>
                <Checkbox
                    name={`all-${name}`}
                    id={`all-${name}`}
                    checked={mat === "*"}
                    onChange={matHandler("all")}
                    label={mat === "*" ? "Удалить все" : "Добавить все"}
                />
            </div>
            {renderMat(mat)} */}
        </div>
    )
}
