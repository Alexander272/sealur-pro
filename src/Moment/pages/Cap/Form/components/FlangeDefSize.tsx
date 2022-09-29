import React, { FC, memo, useEffect, useState } from "react"
import { Control, Controller, UseFormSetValue, useWatch } from "react-hook-form"
import { Select } from "../../../../../components/UI/Select/Select"
import { IFormCapCalc } from "../../../../types/cap"
import { IStandart } from "../../../../types/flange"
import classes from "../../../styles/page.module.scss"

const { Option } = Select

type Props = {
    standarts: IStandart[]
    control: Control<IFormCapCalc, any>
    setValue: UseFormSetValue<IFormCapCalc>
}

const Size: FC<Props> = ({ standarts, control, setValue }) => {
    const standartId = useWatch({
        control,
        name: `flangeData.standartId`,
    })
    const dn = useWatch({
        control,
        name: `flangeData.dy`,
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
                setValue(`flangeData.dy`, curSt.sizes.sizeRow1[0].dn)
                setValue(`flangeData.py`, curSt.sizes.sizeRow1[0].pn[0].pn)
            } else if (curDn) {
                setValue(`flangeData.py`, curDn.pn[0].pn)
            } else {
                setValue(`flangeData.dy`, 0)
                setValue(`flangeData.py`, 0)
            }
        }
    }, [setValue, curSt, standarts, dn])

    if (!curSt?.sizes?.sizeRow1) return null

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
        </>
    )
}

export const FlangeDefSize = memo(Size)
