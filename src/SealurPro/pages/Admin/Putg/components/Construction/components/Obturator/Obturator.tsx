import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IObturator } from "../../../../../../../types/addit"
import { IConstr, IConstruction } from "../../../../../../../types/putg"
import classes from "../graphite.module.scss"

type Props = {}

export const Obturator: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const constructions = useSelector((state: ProState) => state.putg.constructions)
    const construction = useSelector((state: ProState) => state.putg.construction)
    const grap = useSelector((state: ProState) => state.putg.grap)
    const temp = useSelector((state: ProState) => state.putg.temp)

    const dispatch = useDispatch<Dispatch>()

    const changeObturatorHandler = (short: string) => () => {
        const c: IConstruction[] = JSON.parse(JSON.stringify(constructions))
        let idx = c.findIndex(c => c.short === construction)

        const cur = c[idx]?.obturators.find(o => o.short === short)
        if (cur) {
            c[idx].obturators = c[idx].obturators.filter(o => o.short !== short)
        } else {
            c[idx].obturators.push({ short })
        }
        dispatch.putg.setConstructions(c)

        const constr: IConstr[] = JSON.parse(JSON.stringify(putg?.construction))
        const cIdx = constr.findIndex(c => c.grap === grap)
        const tIdx = constr[cIdx].temperatures.findIndex(t => t.temp === temp)
        constr[cIdx].temperatures[tIdx].constructions = c

        if (putg) dispatch.putg.setPutg({ ...putg, construction: constr })
    }

    const updateObturatorHandler = (ob: IObturator) => () => {}

    const openObturatorHandler = () => {}

    return (
        <>
            <p className={classes.add} onClick={openObturatorHandler}>
                Добавить
            </p>
            <div className={`${classes.list} scroll`}>
                {addit?.obturator.map(ob => {
                    let idx = constructions
                        .find(c => c.short === construction)
                        ?.obturators.findIndex(o => o.short === ob.short)
                    if (idx === undefined) idx = -1

                    return (
                        <div key={ob.short} className={classes.listItem}>
                            <Checkbox
                                name={ob.short}
                                id={ob.short}
                                checked={idx > -1}
                                onChange={changeObturatorHandler(ob.short)}
                                label={`${ob.short} ${ob.title}`}
                            />
                            <p className={classes.countItem}>
                                {idx > -1 ? (
                                    <span className={classes.count}>({idx + 1})</span>
                                ) : null}
                            </p>

                            <p className={classes.icon} onClick={updateObturatorHandler(ob)}>
                                &#9998;
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
