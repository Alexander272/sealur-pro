import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IConstr, IGrap } from "../../../../../../../types/putg"
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
        let temps: IGrap[] = JSON.parse(JSON.stringify(putg?.temperatures)) || []
        let tmp = constructions[idx].temperatures.find(t => t.temp === temp)
        if (tmp) {
            const t = constructions[idx].temperatures.filter(t => t.temp !== temp)
            constructions[idx].temperatures = t || []
            const tIdx = temps.findIndex(t => t.grap === grap)
            temps[tIdx].temps = temps[tIdx].temps?.filter(t => t.id !== temp)
        } else {
            constructions[idx].temperatures.push({ temp, constructions: [] })
            const tIdx = temps.findIndex(t => t.grap === grap)
            temps[tIdx].temps.push({ id: temp, mods: [] })
        }

        return { temps, constructions }
    }

    const changeTempHandler = (t: string) => () => {
        if (!grap) {
            toast.error("Степень чистоты графита не выбрана")
            return
        }

        const { temps, constructions } = changeTemp(t)
        if (t === temp) {
            dispatch.putg.setTemp("")
            dispatch.putg.setConstruction("")
            dispatch.putg.setConstructions([])
        }

        if (putg)
            dispatch.putg.setPutg({ ...putg, temperatures: temps, construction: constructions })
    }

    const chooseTempHandler = (temp: string) => () => {
        const t = putg?.temperatures.find(t => t.grap === grap)
        let tmp = t?.temps.find(t => t.id === temp)
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
                        name={`temp-${t.id}`}
                        id={`temp-${t.id}`}
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
