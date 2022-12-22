import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IGrap } from "../../../../../../../types/putg"
import classes from "../graphite.module.scss"

type Props = {}

export const Temperature: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const temp = useSelector((state: ProState) => state.putgm.temp)
    const grap = useSelector((state: ProState) => state.putgm.grap)

    const dispatch = useDispatch<Dispatch>()

    const changeTemp = (temp: string) => {
        let temps: IGrap[] = JSON.parse(JSON.stringify(putgm?.temperatures)) || []
        const idx = temps.findIndex(t => t.grap === grap)
        let tmp = temps[idx].temps.find(t => t.id === temp)
        if (tmp) {
            const tIdx = temps.findIndex(t => t.grap === grap)
            temps[tIdx].temps = temps[tIdx].temps?.filter(t => t.id !== temp)
        } else {
            const tIdx = temps.findIndex(t => t.grap === grap)
            temps[tIdx].temps.push({ id: temp, mods: [] })
        }

        return { temps }
    }

    const changeTempHandler = (t: string) => () => {
        if (!grap) {
            toast.error("Степень чистоты графита не выбрана")
            return
        }

        const { temps } = changeTemp(t)
        if (t === temp) {
            dispatch.putgm.setTemp("")
        }

        if (putgm) dispatch.putgm.setPutgm({ ...putgm, temperatures: temps })
    }

    const chooseTempHandler = (temp: string) => () => {
        if (!grap) {
            toast.error("Степень чистоты графита не выбрана")
            return
        }

        const t = putgm?.temperatures.find(t => t.grap === grap)
        let tmp = t?.temps.find(t => t.id === temp)
        if (!tmp) {
            const { temps } = changeTemp(temp)
            if (putgm)
                dispatch.putgm.setPutgm({
                    ...putgm,
                    temperatures: temps,
                })
        }

        dispatch.putgm.setTemp(temp)
    }

    const renderTemp = () => {
        return addit?.temperature.map(t => {
            const temps = putgm?.temperatures.find(c => c.grap === grap)
            let idx = temps?.temps.findIndex(temp => temp.id === t.id)
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
