import { FC } from "react"
import { useSelector } from "react-redux"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { ProState } from "../../../../../../../store/store"
import classes from "../graphite.module.scss"

type Props = {}

export const Temperature: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const temp = useSelector((state: ProState) => state.putg.temp)
    const grap = useSelector((state: ProState) => state.putg.grap)

    const changeTemp = (temp: string) => {
        // let tmp = temps.find(t => t.id === temp)
        // if (tmp) {
        //     temps = temps.filter(t => t.id !== temp)
        // } else {
        //     temps.push({ id: temp, mods: [] })
        // }
        // return temps
    }

    const changeTempHandler = (t: string) => () => {
        // if (!filler) {
        //     toast.error("Наполнитель не выбран")
        //     return
        // }
        // const temps = changeTemp(t)
        // changeHandler(temps, t === temp)
    }

    const chooseTempHandler = (temp: string) => () => {
        // if (!filler) {
        //     toast.error("Наполнитель не выбран")
        //     return
        // }
        // let tmp = temps.find(t => t.id === temp)
        // let newTemps: ITemperature[] = []
        // if (!tmp) {
        //     newTemps = changeTemp(temp)
        //     tmp = newTemps[newTemps.length - 1]
        // }
        // clickHandler(tmp, newTemps)
    }

    const renderTemp = () => {
        return addit?.temperature.map(t => {
            const constr = putg?.construction.find(c => c.grap === grap)
            let idx = constr?.temperatures.findIndex(temp => temp.temp === t.id)
            if (idx === undefined) idx = -1

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
                        onClick={chooseTempHandler(t.id)}
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
