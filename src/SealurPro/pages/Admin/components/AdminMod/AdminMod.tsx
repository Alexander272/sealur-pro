import { FC } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { ProState } from "../../../../store/store"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"
import classes from "./mod.module.scss"

type Props = {
    mods: string[]
    temp: string
    filler: string
    clickHandler: (mods: string[]) => void
}

export const AdminMod: FC<Props> = ({ mods, temp, filler, clickHandler }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    const addModHandler = (mod: string) => () => {
        if (filler === "") {
            toast.error("Наполнитель не выбран")
            return
        }
        if (temp === "") {
            toast.error("Температура не выбрана")
            return
        }

        if (mods.includes(mod)) {
            mods = mods.filter(m => m !== mod)
        } else {
            mods.push(mod)
        }

        clickHandler(mods)
    }

    const renderMod = () => {
        return addit?.mod.map(m => {
            let isAdded = mods.includes(m.id)

            return (
                <div key={m.id} className={classes.listItem}>
                    <Checkbox
                        name={m.short}
                        id={m.short}
                        checked={isAdded}
                        onChange={addModHandler(m.id)}
                        label={m.title}
                    />
                </div>
            )
        })
    }

    return <>{addit?.mod && <div className={`${classes.list} scroll`}>{renderMod()}</div>}</>
}
