import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Materials } from "../../../../../components/Materials/Materials"
import { Dispatch, ProState } from "../../../../../store/store"
import { IPUTG } from "../../../../../types/putg"
import { AdminMat } from "../../../components/AdminMat/AdminMat"
import MultiSelect from "./components/MultiSelect/MultiSelect"
import classes from "../../../pages.module.scss"

type Props = {}

export const Material: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putg = useSelector((state: ProState) => state.putg.putg)

    const dispatch = useDispatch<Dispatch>()

    // измение материалов по умолчанию
    const defMatHandler = (name: string) => (value: string) => {
        if (!putg) return

        let newPutg: IPUTG = JSON.parse(JSON.stringify(putg))
        newPutg[name as "reinforce"].default = value
        dispatch.putg.setPutg(newPutg)
    }

    // измение материалов
    const matHandler = (values: string[], name: string) => {
        if (!putg) return

        let newPutg: IPUTG = JSON.parse(JSON.stringify(putg))
        newPutg[name as "reinforce"].values = values

        if (!values.length) newPutg[name as "reinforce"].default = ""
        else {
            if (values[0] !== "*" && !values.includes(newPutg[name as "reinforce"].default))
                newPutg[name as "reinforce"].default = values[0]
            if (values[0] === "*" && !newPutg[name as "reinforce"].default)
                newPutg[name as "reinforce"].default = addit?.materials[0].short || ""
        }

        dispatch.putg.setPutg(newPutg)
    }

    const changeObturatorHandler = (name: string) => (obts: string[]) => {
        let newPutg: IPUTG = JSON.parse(JSON.stringify(putg))
        newPutg[name as "reinforce"].obturators = obts

        dispatch.putg.setPutg(newPutg)
    }

    return (
        <div className={classes.line}>
            {/* <div className={classes.fil}>
                <p className={classes.titleGroup}>Армирующий элемент</p>
                <MultiSelect
                    selectedObts={putg?.reinforce.obturators || []}
                    obturators={addit?.obturator || []}
                    changeObturator={changeObturatorHandler("reinforce")}
                />
                <Materials
                    className={classes.def}
                    classTitle={classes.defTitle}
                    value={putg?.reinforce.default || "Значение не выбрано"}
                    mater={putg?.reinforce.values || []}
                    onChange={defMatHandler("reinforce")}
                    disabled={!putg?.reinforce.default}
                    title='Значение по умолчанию'
                />
                <p className={classes.defTitle}>Доступные значения</p>
                {addit?.materials && (
                    <AdminMat
                        className={classes.list}
                        classItem={classes.listItem}
                        name='reinforce'
                        mat={putg?.reinforce.values || []}
                        onChange={matHandler}
                    />
                )}
            </div> */}
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Обтюраторы</p>
                <MultiSelect
                    selectedObts={putg?.obturator.obturators || []}
                    obturators={addit?.obturator || []}
                    changeObturator={changeObturatorHandler("obturator")}
                />
                <Materials
                    className={classes.def}
                    classTitle={classes.defTitle}
                    value={putg?.obturator.default || "Значение не выбрано"}
                    mater={putg?.obturator.values || []}
                    onChange={defMatHandler("obturator")}
                    disabled={!putg?.obturator.default}
                    title='Значение по умолчанию'
                />
                <p className={classes.defTitle}>Доступные значения</p>
                {addit?.materials && (
                    <AdminMat
                        className={classes.list}
                        classItem={classes.listItem}
                        name='obturator'
                        mat={putg?.obturator.values || []}
                        onChange={matHandler}
                    />
                )}
            </div>

            <div className={classes.fil}>
                <p className={classes.titleGroup}>Ограничитель внутренний</p>
                <MultiSelect
                    selectedObts={putg?.iLimiter.obturators || []}
                    obturators={addit?.obturator || []}
                    changeObturator={changeObturatorHandler("iLimiter")}
                />
                <Materials
                    className={classes.def}
                    classTitle={classes.defTitle}
                    value={putg?.iLimiter.default || "Значение не выбрано"}
                    mater={putg?.iLimiter.values || []}
                    onChange={defMatHandler("iLimiter")}
                    disabled={!putg?.iLimiter.default}
                    title='Значение по умолчанию'
                />
                <p className={classes.defTitle}>Доступные значения</p>
                {addit?.materials && (
                    <AdminMat
                        className={classes.list}
                        classItem={classes.listItem}
                        name='iLimiter'
                        mat={putg?.iLimiter.values || []}
                        onChange={matHandler}
                    />
                )}
            </div>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Ограничитель внешний</p>
                <MultiSelect
                    selectedObts={putg?.oLimiter.obturators || []}
                    obturators={addit?.obturator || []}
                    changeObturator={changeObturatorHandler("oLimiter")}
                />
                <Materials
                    className={classes.def}
                    classTitle={classes.defTitle}
                    value={putg?.oLimiter.default || "Значение не выбрано"}
                    mater={putg?.oLimiter.values || []}
                    onChange={defMatHandler("oLimiter")}
                    disabled={!putg?.oLimiter.default}
                    title='Значение по умолчанию'
                />
                <p className={classes.defTitle}>Доступные значения</p>
                {addit?.materials && (
                    <AdminMat
                        className={classes.list}
                        classItem={classes.listItem}
                        name='oLimiter'
                        mat={putg?.oLimiter.values || []}
                        onChange={matHandler}
                    />
                )}
            </div>
        </div>
    )
}
