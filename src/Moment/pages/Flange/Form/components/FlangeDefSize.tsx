import React, { FC, memo, useEffect, useMemo, useState } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { IFormFlangeCalc, IStandart } from "../../../../types/flange"
import classes from "../../../styles/page.module.scss"

const { Option } = Select

type Props = {
    id: "first" | "second"
    standarts: IStandart[]
    register: UseFormRegister<IFormFlangeCalc>
    control: Control<IFormFlangeCalc, any>
    setValue: UseFormSetValue<IFormFlangeCalc>
}

const rows = {
    0: "sizeRow1" as "sizeRow1",
    1: "sizeRow2" as "sizeRow2",
}

const Size: FC<Props> = ({ id, standarts, register, control, setValue }) => {
    const standartId = useWatch({
        control,
        name: `flangesData.${id}.standartId`,
    })
    const dn = useWatch({
        control,
        name: `flangesData.${id}.dy`,
    })
    const pn = useWatch({
        control,
        name: `flangesData.${id}.py`,
    })
    const row = useWatch({
        control,
        name: `flangesData.${id}.row`,
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
                setValue(`flangesData.${id}.dy`, curSt.sizes[rows[row]]![0].dn)
                setValue(`flangesData.${id}.py`, curSt.sizes[rows[row]]![0].pn[0].pn)
            } else if (curDn) {
                setValue(`flangesData.${id}.py`, curDn.pn[0].pn)
            } else {
                setValue(`flangesData.${id}.dy`, 0)
                setValue(`flangesData.${id}.py`, 0)
            }
        }
    }, [setValue, id, curSt, curDn, row])

    useEffect(() => {
        const curPn = curDn?.pn.find(p => p.pn === pn)
        setIsEmptyD(curPn?.isEmptyD || false)
    }, [curDn, pn])

    if (!curSt?.sizes[rows[row]]) return null

    return (
        <>
            <div className={classes.line}>
                <p>{curSt?.titleDn}</p>
                <p className={classes.designation}>
                    <i>D</i>
                </p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`flangesData.${id}.dy`}
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {curSt?.sizes.sizeRow1.map(s => (
                                    <Option key={s.dn} value={s.dn}>
                                        {s.dn.toLocaleString("ru-RU")}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>{curSt?.titlePn}</p>
                <p className={classes.designation}>
                    <i>
                        P<sub>у</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`flangesData.${id}.py`}
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

            <div className={classes.line}>
                <p>Внутренний диаметр</p>
                <p className={classes.designation}>
                    <i>B</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangesData.${id}.b`}
                        id={`flangesData.${id}.b`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                    />
                </div>
            </div>

            {curSt.isNeedRow && (
                <div className={classes.line}>
                    <p>Размеры фланца</p>
                    <div className={classes["line-field"]}>
                        <Controller
                            name={`flangesData.${id}.row`}
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
