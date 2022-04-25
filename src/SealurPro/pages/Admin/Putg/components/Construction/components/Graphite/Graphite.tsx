import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IConstr } from "../../../../../../../types/putg"
import classes from "../graphite.module.scss"

type Props = {}

export const Graphite: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const grap = useSelector((state: ProState) => state.putg.grap)

    const dispatch = useDispatch<Dispatch>()

    const changeGrap = (grap: string) => {
        let graps = [...(putg?.graphite || [])]
        let construction: IConstr[] = JSON.parse(JSON.stringify(putg?.construction))
        let tmp = putg?.graphite.find(g => g === grap)
        if (tmp) {
            graps = graps.filter(g => g !== grap)
            construction = construction.filter(c => c.grap !== grap)
        } else {
            graps.push(grap)
            construction.push({ grap, temperatures: [] })
        }

        return { graps, construction }
    }

    const changeGrapHandler = (gr: string) => () => {
        const { graps, construction } = changeGrap(gr)
        if (gr === grap) dispatch.putg.setGrap("")
        if (putg) dispatch.putg.setPutg({ ...putg, graphite: graps, construction })
    }

    const chooseGrapHandler = (grap: string) => () => {
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
        let tmp = putg?.graphite.find(g => g === grap)
        if (!tmp) {
            const { graps, construction } = changeGrap(grap)
            if (putg) dispatch.putg.setPutg({ ...putg, graphite: graps, construction })
        }
        dispatch.putg.setGrap(grap)
        const constr = putg?.construction.find(c => c.grap === grap)
        dispatch.putg.setTemp(constr?.temperatures[0].temp || "")
    }

    const renderGrap = () => {
        return addit?.graphite.map(g => {
            let idx = putg?.graphite.findIndex(gr => gr === g.short)
            if (idx === undefined) idx = -1

            return (
                <div key={g.short} className={classes.listItem}>
                    <Checkbox
                        name={g.title}
                        id={g.title}
                        checked={idx > -1}
                        onChange={changeGrapHandler(g.short)}
                    />
                    <p
                        className={`${classes.filItem} ${grap === g.short ? classes.active : ""}`}
                        onClick={chooseGrapHandler(g.short)}
                    >
                        {g.title}
                        {idx > -1 ? <span className={classes.count}>({idx + 1})</span> : null}
                    </p>
                </div>
            )
        })
    }

    return <>{addit?.graphite && <div className={`${classes.list} scroll`}>{renderGrap()}</div>}</>
}
