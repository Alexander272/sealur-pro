import React, { FC, memo, useEffect, useMemo, useState } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { IFormCapCalc } from "../../../../types/cap"
import { IStandart } from "../../../../types/flange"
import classes from "../../../styles/page.module.scss"

const { Option } = Select

const rows = {
    0: "sizeRow1" as "sizeRow1",
    1: "sizeRow2" as "sizeRow2",
}

type Props = {
    standarts: IStandart[]
    control: Control<IFormCapCalc, any>
    register: UseFormRegister<IFormCapCalc>
    setValue: UseFormSetValue<IFormCapCalc>
}

const Size: FC<Props> = ({ standarts, control, register, setValue }) => {
    const standartId = useWatch({
        control,
        name: `flangeData.standartId`,
    })
    const dn = useWatch({
        control,
        name: `flangeData.dy`,
    })
    const pn = useWatch({
        control,
        name: `flangeData.py`,
    })
    const row = useWatch({
        control,
        name: `flangeData.row`,
    })

    const [curSt, setCurSt] = useState<IStandart>()
    const [isEmptyD, setIsEmptyD] = useState(false)

    useEffect(() => {
        const curSt = standarts.find(s => s.id === standartId)
        if (curSt) setCurSt(curSt)
    }, [standartId, standarts])

    const curDn = useMemo(() => curSt?.sizes[rows[row]]?.find(s => s.dn === dn), [curSt, dn, row])

    useEffect(() => {
        if (Object.keys(curSt?.sizes || {}).length) {
            if (curSt && !curDn) {
                setValue(`flangeData.dy`, curSt.sizes[rows[row]]![0].dn)
                setValue(`flangeData.py`, curSt.sizes[rows[row]]![0].pn[0].pn)
            } else if (curDn) {
                setValue(`flangeData.py`, curDn.pn[0].pn)
            } else {
                setValue(`flangeData.dy`, "0")
                setValue(`flangeData.py`, 0)
            }
        }
    }, [setValue, curSt, standarts, curDn, row])

    useEffect(() => {
        const curPn = curDn?.pn.find(p => p.pn === pn)
        setIsEmptyD(curPn?.isEmptyD || false)
    }, [curDn, pn])

    if (!curSt?.sizes[rows[row]]) return null

    return (
        <>
            <div className={classes.line}>
                <p>{curSt?.titleDn}</p>
                {curSt.hasDesignation && (
                    <p className={classes.designation}>
                        <i>D</i>
                    </p>
                )}

                <div className={classes["line-field"]}>
                    <Controller
                        name={`flangeData.dy`}
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {curSt?.sizes.sizeRow1.map(s => (
                                    <Option key={s.dn} value={s.dn}>
                                        {isNaN(+s.dn) ? s.dn : (+s.dn).toLocaleString("ru-RU")}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>{curSt?.titlePn}</p>
                {curSt.hasDesignation && (
                    <p className={classes.designation}>
                        <i>
                            P<sub>у</sub>
                        </i>
                    </p>
                )}
                <div className={classes["line-field"]}>
                    <Controller
                        name={`flangeData.py`}
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {curSt?.sizes.sizeRow1
                                    .find(s => s.dn === dn)
                                    ?.pn.map(s => (
                                        <Option key={s.pn} value={s.pn}>
                                            {s.pn.toLocaleString("ru-RU")}
                                        </Option>
                                    ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            {isEmptyD && (
                <div className={classes.line}>
                    <p>Внутренний диаметр</p>
                    <p className={classes.designation}>
                        <i>B</i>
                    </p>
                    <div className={classes["line-field"]}>
                        <Input
                            name={`flangeData.b`}
                            id={`flangeData.b`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='мм'
                            rule={{ required: true }}
                        />
                    </div>
                </div>
            )}

            {curSt.isNeedRow && (
                <div className={classes.line}>
                    <p>Размеры фланца</p>
                    <div className={classes["line-field"]}>
                        <Controller
                            name={`flangeData.row`}
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onChange={field.onChange}>
                                    {curSt?.rows.map((r, i) => (
                                        <Option key={r} value={i}>
                                            {r}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export const FlangeDefSize = memo(Size)
