import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IConstr } from "../../../../../../../types/putg"
import { ITemperature } from "../../../../../../../types/snp"
import classes from "../graphite.module.scss"

type Props = {}

export const Temperature: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const temp = useSelector((state: ProState) => state.putg.temp)
    const grap = useSelector((state: ProState) => state.putg.grap)

    const dispatch = useDispatch<Dispatch>()

    const changeTemp = (temp: string) => {
        let constructions: IConstr[] = JSON.parse(JSON.stringify(putg?.construction)) || []
        let idx = constructions.findIndex(c => c.grap === grap)
        let temps: ITemperature[] = JSON.parse(JSON.stringify(putg?.temperatures)) || []
        let tmp = constructions[idx].temperatures.find(t => t.temp === temp)
        if (tmp) {
            const t = constructions[idx].temperatures.filter(t => t.temp !== temp)
            constructions[idx].temperatures = t || []
            temps = temps?.filter(t => t.id !== temp)
        } else {
            constructions[idx].temperatures.push({ temp, constructions: [] })
            temps?.push({ id: temp, mods: [] })
        }
        // let tmp = temps.find(t => t.id === temp)
        // if (tmp) {
        //     temps = temps.filter(t => t.id !== temp)
        // } else {
        //     temps.push({ id: temp, mods: [] })
        // }
        // return temps
        return { temps, constructions }
    }

    const changeTempHandler = (t: string) => () => {
        // if (!filler) {
        //     toast.error("Наполнитель не выбран")
        //     return
        // }
        // const temps = changeTemp(t)
        // changeHandler(temps, t === temp)
        const { temps, constructions } = changeTemp(t)
        if (t === temp) dispatch.putg.setTemp("")
        if (putg)
            dispatch.putg.setPutg({ ...putg, temperatures: temps, construction: constructions })
    }

    //TODO temp не работает при смене графита
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
        let tmp = putg?.temperatures.find(t => t.id === temp)
        if (!tmp) {
            const { temps, constructions } = changeTemp(temp)
            if (putg)
                dispatch.putg.setPutg({ ...putg, temperatures: temps, construction: constructions })

            dispatch.putg.setTemp(temp)

            let constrs: IConstr[] = JSON.parse(JSON.stringify(constructions)) || []
            let idx = constrs.findIndex(c => c.grap === grap)
            let tmp = constrs[idx].temperatures.find(t => t.temp === temp)

            dispatch.putg.setConstructions(tmp?.constructions || [])
            dispatch.putg.setConstruction(tmp?.constructions[0]?.short || "")

            return
        }
        dispatch.putg.setTemp(temp)

        let constructions: IConstr[] = JSON.parse(JSON.stringify(putg?.construction)) || []
        let idx = constructions.findIndex(c => c.grap === grap)
        let temps = constructions[idx].temperatures.find(t => t.temp === temp)

        //  const constrs = constr?.temperatures[0].constructions || []
        dispatch.putg.setConstructions(temps?.constructions || [])
        dispatch.putg.setConstruction(temps?.constructions[0]?.short || "")
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
