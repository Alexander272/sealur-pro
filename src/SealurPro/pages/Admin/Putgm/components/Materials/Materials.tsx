import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Materials } from "../../../../../components/Materials/Materials"
import { Dispatch, ProState } from "../../../../../store/store"
import { IPUTGM } from "../../../../../types/putgm"
import { AdminMat } from "../../../components/AdminMat/AdminMat"
import MultiSelect from "./components/MultiSelect/MultiSelect"
import classes from "../../../pages.module.scss"

type Props = {}

export const Material: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)

    const dispatch = useDispatch<Dispatch>()

    // измение материалов по умолчанию
    const defMatHandler = (name: string) => (value: string) => {
        if (!putgm) return

        let newPutgm: IPUTGM = JSON.parse(JSON.stringify(putgm))
        newPutgm[name as "basis"].default = value
        dispatch.putgm.setPutgm(newPutgm)
    }

    // измение материалов
    const matHandler = (values: string[], name: string) => {
        if (!putgm) return

        let newPutgm: IPUTGM = JSON.parse(JSON.stringify(putgm))
        newPutgm[name as "basis"].values = values

        if (!values.length) newPutgm[name as "basis"].default = ""
        else {
            if (values[0] !== "*" && !values.includes(newPutgm[name as "basis"].default))
                newPutgm[name as "basis"].default = values[0]
            if (values[0] === "*" && !newPutgm[name as "basis"].default)
                newPutgm[name as "basis"].default = addit?.materials[0].short || ""
        }

        dispatch.putgm.setPutgm(newPutgm)
    }

    const changeObturatorHandler = (name: string) => (obts: string[]) => {
        let newPutgm: IPUTGM = JSON.parse(JSON.stringify(putgm))
        newPutgm[name as "basis"].obturators = obts

        dispatch.putgm.setPutgm(newPutgm)
    }

    return (
        <div className={classes.line}>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Основание</p>
                <MultiSelect
                    selectedObts={putgm?.basis.obturators || []}
                    obturators={addit?.pObturator || []}
                    changeObturator={changeObturatorHandler("basis")}
                />
                <Materials
                    className={classes.def}
                    classTitle={classes.defTitle}
                    value={putgm?.basis.default || "Значение не выбрано"}
                    mater={putgm?.basis.values || []}
                    onChange={defMatHandler("basis")}
                    disabled={!putgm?.basis.default}
                    title='Значение по умолчанию'
                />
                <p className={classes.defTitle}>Доступные значения</p>
                {addit?.materials && (
                    <AdminMat
                        className={classes.list}
                        classItem={classes.listItem}
                        name='basis'
                        mat={putgm?.basis.values || []}
                        onChange={matHandler}
                    />
                )}
            </div>

            <div className={classes.fil}>
                <p className={classes.titleGroup}>Обтюраторы</p>
                <MultiSelect
                    selectedObts={putgm?.obturator.obturators || []}
                    obturators={addit?.pObturator || []}
                    changeObturator={changeObturatorHandler("obturator")}
                />
                <Materials
                    className={classes.def}
                    classTitle={classes.defTitle}
                    value={putgm?.obturator.default || "Значение не выбрано"}
                    mater={putgm?.obturator.values || []}
                    onChange={defMatHandler("obturator")}
                    disabled={!putgm?.obturator.default}
                    title='Значение по умолчанию'
                />
                <p className={classes.defTitle}>Доступные значения</p>
                {addit?.materials && (
                    <AdminMat
                        className={classes.list}
                        classItem={classes.listItem}
                        name='obturator'
                        mat={putgm?.obturator.values || []}
                        onChange={matHandler}
                    />
                )}
            </div>
        </div>
    )
}
