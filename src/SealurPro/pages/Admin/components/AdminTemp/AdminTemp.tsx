import { FC } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { ProState } from "../../../../store/store"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"
import { ITemperature } from "../../../../types/snp"
import classes from "./temp.module.scss"

type Props = {
    temps: ITemperature[]
    temp: string
    filler: string
    clickHandler: (temp: ITemperature, temps: ITemperature[]) => void
    changeHandler: (temp: ITemperature[], selected: boolean) => void
}

export const AdminTemp: FC<Props> = ({ temp, temps, filler, clickHandler, changeHandler }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    const changeTemp = (temp: string) => {
        let tmp = temps.find(t => t.id === temp)

        if (tmp) {
            temps = temps.filter(t => t.id !== temp)
        } else {
            temps.push({ id: temp, mods: [] })
        }
        return temps
    }

    const changeTempHandler = (t: string) => () => {
        if (!filler) {
            toast.error("Наполнитель не выбран")
            return
        }
        const temps = changeTemp(t)
        changeHandler(temps, t === temp)
    }

    const tempHandler = (temp: string) => () => {
        if (!filler) {
            toast.error("Наполнитель не выбран")
            return
        }

        let tmp = temps.find(t => t.id === temp)
        let newTemps: ITemperature[] = []

        if (!tmp) {
            newTemps = changeTemp(temp)
            tmp = newTemps[newTemps.length - 1]
        }
        clickHandler(tmp, newTemps)
    }

    const renderTemp = () => {
        return addit?.temperature.map(t => {
            let idx = temps.findIndex(temp => temp.id === t.id)

            return (
                <div key={t.id} className={classes.listItem}>
                    <Checkbox
                        name={t.title}
                        id={t.title}
                        checked={idx > -1}
                        onChange={changeTempHandler(t.id)}
                    />
                    <p
                        className={`${classes.filItem} ${temp === t.id ? classes.active : ""}`}
                        onClick={tempHandler(t.id)}
                    >
                        {t.title}
                        {idx > -1 ? <span className={classes.count}>({idx + 1})</span> : null}
                    </p>
                </div>
            )
        })
    }

    return (
        <>{addit?.temperature && <div className={`${classes.list} scroll`}>{renderTemp()}</div>}</>
    )
}
