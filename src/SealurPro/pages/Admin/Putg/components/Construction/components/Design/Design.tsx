import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IConstruction } from "../../../../../../../types/addit"
import { IConstr, IConstruction as IConstructions } from "../../../../../../../types/putg"
import classes from "../graphite.module.scss"

type Props = {}

export const Design: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const construction = useSelector((state: ProState) => state.putg.construction)
    const constructions = useSelector((state: ProState) => state.putg.constructions)
    const grap = useSelector((state: ProState) => state.putg.grap)
    const temp = useSelector((state: ProState) => state.putg.temp)

    const dispatch = useDispatch<Dispatch>()

    const changeDesign = (short: string) => {
        let constrs: IConstructions[] = JSON.parse(JSON.stringify(constructions))
        const cur = constrs.find(c => c.short === short)
        if (cur) {
            constrs = constrs.filter(c => c.short !== short)
        } else {
            constrs.push({ short, obturators: [] })
        }

        return constrs
    }

    const changeDesignHandler = (short: string) => () => {
        const constr = changeDesign(short)
        dispatch.putg.setConstructions(constr)
        if (short === construction) dispatch.putg.setConstruction("")

        const con: IConstr[] = JSON.parse(JSON.stringify(putg?.construction))
        const cIdx = con.findIndex(c => c.grap === grap)
        const tIdx = con[cIdx].temperatures.findIndex(t => t.temp === temp)
        con[cIdx].temperatures[tIdx].constructions = constr

        if (putg) dispatch.putg.setPutg({ ...putg, construction: con })
    }

    const chooseDesignHandler = (short: string) => () => {
        dispatch.putg.setConstruction(short)
        const cur = constructions.find(c => c.short === short)
        if (!cur) {
            changeDesignHandler(short)()
            return
        }
    }

    const updateDesignHandler = (con: IConstruction) => () => {}

    const openDesignHandler = () => {}

    return (
        <>
            <p className={classes.add} onClick={openDesignHandler}>
                Добавить
            </p>
            <div className={`${classes.list} scroll`}>
                {addit?.construction.map(con => {
                    const idx = constructions.findIndex(c => c.short === con.short)

                    return (
                        <div key={con.short} className={classes.listItem}>
                            <Checkbox
                                name={con.short}
                                id={con.short}
                                checked={idx > -1}
                                onChange={changeDesignHandler(con.short)}
                            />
                            <p
                                className={`${classes.filItem} ${
                                    con.short === construction ? classes.active : ""
                                }`}
                                onClick={chooseDesignHandler(con.short)}
                            >
                                {con.short} {con.title}
                                {idx > -1 ? (
                                    <span className={classes.count}>({idx + 1})</span>
                                ) : null}
                            </p>

                            <p className={classes.icon} onClick={updateDesignHandler(con)}>
                                &#9998;
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
