import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IConstruction } from "../../../../../../../types/putgm"
import classes from "../graphite.module.scss"

type Props = {}

export const Graphite: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const grap = useSelector((state: ProState) => state.putgm.grap)

    const dispatch = useDispatch<Dispatch>()

    const changeGrap = (grap: string) => {
        let graps = [...(putgm?.graphite || [])]
        let construction: IConstruction[] = JSON.parse(JSON.stringify(putgm?.construction))
        let tmp = putgm?.graphite.find(g => g === grap)
        if (tmp) {
            graps = graps.filter(g => g !== grap)
            construction = construction.filter(c => c.grap !== grap)
        } else {
            graps.push(grap)
            construction.push({ grap, basis: [] })
        }

        return { graps, construction }
    }

    const changeGrapHandler = (gr: string) => () => {
        const { graps, construction } = changeGrap(gr)
        if (gr === grap) {
            dispatch.putgm.setGrap("")
            dispatch.putgm.setTemp("")
            dispatch.putgm.setConstruction("")
            dispatch.putgm.setConstructions([])
        }
        if (putgm) dispatch.putgm.setPutgm({ ...putgm, graphite: graps, construction })
    }

    const chooseGrapHandler = (grap: string) => () => {
        let tmp = putgm?.graphite.find(g => g === grap)
        if (!tmp) {
            const { graps, construction } = changeGrap(grap)
            if (putgm) dispatch.putgm.setPutgm({ ...putgm, graphite: graps, construction })
            dispatch.putgm.setGrap(grap)
            const constr = construction.find(c => c.grap === grap)
            // dispatch.putgm.setTemp(constr?.temperatures[0].temp || "")
            const constrs = constr?.basis || []
            dispatch.putgm.setConstructions(constrs)
            dispatch.putgm.setConstruction(constrs[0]?.basis || "")
            return
        }
        dispatch.putgm.setGrap(grap)
        const constr = putgm?.construction.find(c => c.grap === grap)
        // dispatch.putgm.setTemp(constr?.temperatures[0]?.temp || "")
        const constrs = constr?.basis || []
        dispatch.putgm.setConstructions(constrs)
        dispatch.putgm.setConstruction(constrs[0]?.basis || "")
    }

    const renderGrap = () => {
        return addit?.graphite.map(g => {
            let idx = putgm?.graphite.findIndex(gr => gr === g.short)
            if (idx === undefined) idx = -1

            return (
                <div key={g.short} className={classes.listItem}>
                    <Checkbox
                        name={`grap-${g.short}`}
                        id={`grap-${g.short}`}
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
