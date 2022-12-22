import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Materials } from "../../../../../components/Materials/Materials"
import { Dispatch, ProState } from "../../../../../store/store"
import { ISNP } from "../../../../../types/snp"
import { AdminMat } from "../../../components/AdminMat/AdminMat"
import classes from "../../../pages.module.scss"

type Props = {}

export const Material: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const snp = useSelector((state: ProState) => state.snp.snp)

    const dispatch = useDispatch<Dispatch>()

    // измение материалов по умолчанию
    const defMatHandler = (name: string) => (value: string) => {
        if (!snp) return

        let newSnp: ISNP = JSON.parse(JSON.stringify(snp))
        newSnp[name as "frame"].default = value
        dispatch.snp.setSnp(newSnp)
    }

    // измение материалов
    const matHandler = (values: string[], name: string) => {
        if (!snp) return

        let newSnp: ISNP = JSON.parse(JSON.stringify(snp))
        newSnp[name as "frame"].values = values

        if (!values.length) newSnp[name as "frame"].default = ""
        else {
            if (values[0] !== "*" && !values.includes(newSnp[name as "frame"].default))
                newSnp[name as "frame"].default = values[0]
            if (values[0] === "*" && !newSnp[name as "frame"].default)
                newSnp[name as "frame"].default = addit?.materials[0].short || ""
        }

        dispatch.snp.setSnp(newSnp)
    }

    return (
        <div className={classes.line}>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Внутреннее кольцо</p>
                <Materials
                    className={classes.def}
                    classTitle={classes.defTitle}
                    value={snp?.ir.default || "Значение не выбрано"}
                    mater={snp?.ir.values || []}
                    onChange={defMatHandler("ir")}
                    disabled={!snp?.ir.default}
                    title='Значение по умолчанию'
                />
                <p className={classes.defTitle}>Доступные значения</p>
                {addit?.materials && (
                    <AdminMat
                        className={classes.list}
                        classItem={classes.listItem}
                        name='ir'
                        mat={snp?.ir.values || []}
                        onChange={matHandler}
                    />
                )}
            </div>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Каркас</p>
                <Materials
                    className={classes.def}
                    classTitle={classes.defTitle}
                    value={snp?.frame.default || "Значение не выбрано"}
                    mater={snp?.frame.values || []}
                    onChange={defMatHandler("frame")}
                    disabled={!snp?.frame.default}
                    title='Значение по умолчанию'
                />
                <p className={classes.defTitle}>Доступные значения</p>
                {addit?.materials && (
                    <AdminMat
                        className={classes.list}
                        classItem={classes.listItem}
                        name='frame'
                        mat={snp?.frame.values || []}
                        onChange={matHandler}
                    />
                )}
            </div>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Наружное кольцо</p>
                <Materials
                    className={classes.def}
                    classTitle={classes.defTitle}
                    value={snp?.or.default || "Значение не выбрано"}
                    mater={snp?.or?.values || []}
                    onChange={defMatHandler("or")}
                    disabled={!snp?.or.default}
                    title='Значение по умолчанию'
                />
                <p className={classes.defTitle}>Доступные значения</p>
                {addit?.materials && (
                    <AdminMat
                        className={classes.list}
                        classItem={classes.listItem}
                        name='or'
                        mat={snp?.or.values || []}
                        onChange={matHandler}
                    />
                )}
            </div>
        </div>
    )
}
