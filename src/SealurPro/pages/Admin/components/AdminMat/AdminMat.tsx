import { FC } from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../../../store/store"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"

type Props = {
    className: string
    classItem: string
    mat: string[]
    name: string
    onChange: (value: string[], name: string) => void
}

export const AdminMat: FC<Props> = ({ className, classItem, mat, name, onChange }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    const matHandler = (value: string) => () => {
        if (value === "all") {
            if (mat[0] === "*") onChange([], name)
            else onChange(["*"], name)
            return
        }
        let tmp: string[] = []
        if (mat[0] === "*") {
            addit?.materials.forEach(m => {
                if (m.short !== value) tmp.push(m.short)
            })
            onChange(tmp, name)
        } else {
            tmp = [...mat]
            if (tmp.includes(value)) {
                onChange(
                    tmp.filter(t => t !== value),
                    name
                )
            } else {
                tmp.push(value)
                if (tmp.length === addit?.materials.length) {
                    onChange(["*"], name)
                    return
                }
                onChange(tmp, name)
            }
        }
    }

    const renderMat = (curMat: string[]) => {
        return addit?.materials.map(m => {
            let isAdded = false
            if (curMat[0] === "*") isAdded = true
            else if (curMat.includes(m.short)) isAdded = true

            return (
                <div key={m.short} className={classItem}>
                    <Checkbox
                        name={`${m.short}-${name}`}
                        id={`${m.short}-${name}`}
                        checked={isAdded}
                        onChange={matHandler(m.short)}
                        label={`${m.short} ${m.title}`}
                    />
                </div>
            )
        })
    }

    return (
        <div className={`${className} scroll`}>
            <div className={classItem}>
                <Checkbox
                    name={`all-${name}`}
                    id={`all-${name}`}
                    checked={mat[0] === "*"}
                    onChange={matHandler("all")}
                    label={
                        mat[0] === "*" || mat.length === addit?.materials.length
                            ? "Удалить все"
                            : "Добавить все"
                    }
                />
            </div>
            {renderMat(mat)}
        </div>
    )
}
