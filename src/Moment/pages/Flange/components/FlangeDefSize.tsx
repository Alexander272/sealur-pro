import React, { FC, useEffect, useState } from "react"
import { Control, Controller, UseFormSetValue, useWatch } from "react-hook-form"
import { Select } from "../../../../components/UI/Select/Select"
import { IFormCalculate, IStandart } from "../../../types/flange"
import classes from "../../styles/page.module.scss"

const { Option } = Select

type Props = {
    id: "first" | "second"
    standarts: IStandart[]
    control: Control<IFormCalculate, any>
    setValue: UseFormSetValue<IFormCalculate>
}

export const FlangeDefSize: FC<Props> = ({ id, standarts, control, setValue }) => {
    const standartId = useWatch({
        control,
        name: `flangesData.${id}.standartId`,
    })
    const dn = useWatch({
        control,
        name: `flangesData.${id}.dy`,
    })

    const [curSt, setCurSt] = useState<IStandart>()

    useEffect(() => {
        const curSt = standarts.find(s => s.id === standartId)
        if (curSt) setCurSt(curSt)
    }, [standartId, standarts])

    useEffect(() => {
        if (curSt?.sizes.sizeRow1) {
            const curDn = curSt?.sizes.sizeRow1.find(s => s.dn === dn)
            if (curSt && !curDn) {
                setValue(`flangesData.${id}.dy`, curSt.sizes.sizeRow1[0].dn)
                setValue(`flangesData.${id}.py`, curSt.sizes.sizeRow1[0].pn[0])
            } else if (curDn) {
                setValue(`flangesData.${id}.py`, curDn.pn[0])
            } else {
                setValue(`flangesData.${id}.dy`, 0)
                setValue(`flangesData.${id}.py`, 0)
            }
        }
    }, [setValue, id, curSt, standarts, dn])

    if (!curSt?.sizes?.sizeRow1) return null

    return (
        <>
            <div className={classes.line}>
                {/* //TODO заголовок тут меняется в зависимости от стандарта (и похоже не только заголовок меняется) */}
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
                                        <Option key={s} value={s}>
                                            {s.toLocaleString("ru-RU")}
                                        </Option>
                                    ))}
                            </Select>
                        )}
                    />
                </div>
            </div>
        </>
    )
}
