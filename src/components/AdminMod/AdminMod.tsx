import { FC } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { RootState } from "../../store/store"
import { Checkbox } from "../UI/Checkbox/Checkbox"
import classes from "./mod.module.scss"

type Props = {
    tm: string
    temp: string
    clickHandler: (tm: string) => void
}

export const AdminMod: FC<Props> = ({ tm, temp, clickHandler }) => {
    const addit = useSelector((state: RootState) => state.addit.addit)

    const addModHandler = (mod: string) => () => {
        if (tm === "") {
            toast.error("Наполнитель не выбран")
            return
        }
        let orig = ""
        tm.split("@").forEach(t => {
            if (t.split(">")[0] === temp) orig = t
            return ""
        })

        if (orig === "") {
            toast.error("Температура не выбрана")
            return
        }

        let tmp = orig.split(">")[1].split(",")
        if (tmp.length === 1 && tmp[0] === "") tmp = []

        if (tmp.includes(mod)) {
            tmp = tmp.filter(t => t !== mod)
        } else {
            tmp.push(mod)
        }

        const newTm = tm.replace(orig, `${temp}>${tmp.join(",")}`)
        clickHandler(newTm)
    }

    const renderMod = () => {
        return addit?.mod.split(";").map(m => {
            let isAdded = false
            const parts = m.split("@")
            tm.split("@").forEach(t => {
                if (t !== "") {
                    if (t.split(">")[0] === temp) {
                        if (t.split(">")[1].includes(parts[0])) isAdded = true
                    }
                }
            })

            return (
                <div key={parts[0]} className={classes.listItem}>
                    <Checkbox
                        name={parts[1]}
                        id={parts[1]}
                        checked={isAdded}
                        onChange={addModHandler(parts[0])}
                        label={parts[1]}
                    />
                </div>
            )
        })
    }

    return <>{addit?.mod && <div className={`${classes.list} scroll`}>{renderMod()}</div>}</>
}
