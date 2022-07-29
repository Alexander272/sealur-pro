import React, { FC, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue } from "react-hook-form"
import useSWR from "swr"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import ReadService from "../../../../service/read"
import { IFormFlangeCalc, ITypeGasket } from "../../../../types/flange"
import classes from "../../../styles/page.module.scss"

const { Option } = Select

type Props = {
    register: UseFormRegister<IFormFlangeCalc>
    control: Control<IFormFlangeCalc, any>
    setValue: UseFormSetValue<IFormFlangeCalc>
}

export const GasketData: FC<Props> = ({ register, control, setValue }) => {
    const { data } = useSWR<{ data: ITypeGasket[] }>(
        "/sealur-moment/type-gasket",
        ReadService.getData
    )

    useEffect(() => {
        if (data) setValue("gasket.data.type", data.data[0].label)
    }, [setValue, data])

    return (
        <>
            <div className={classes.line}>
                <p>Тип прокладки</p>
                <div className={classes["line-field"]}>
                    <Input name='gasket.data.title' id='gasket.data.title' register={register} />
                </div>
            </div>

            <div className={classes.line}>
                <p>Материал прокладки</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='gasket.data.type'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {data?.data.map(t => (
                                    <Option key={t.id} value={t.label}>
                                        {t.title}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Удельное давление обжатия прокладки</p>
                <p className={classes.designation}>
                    <i>
                        q<sub>обж</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='gasket.data.qo'
                        id='gasket.data.qo'
                        type='number'
                        register={register}
                        suffix='МПа'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Прокладочный коэффициент</p>
                <p className={classes.designation}>
                    <i>m</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='gasket.data.m'
                        id='gasket.data.m'
                        type='number'
                        register={register}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Коэффициент обжатия</p>
                <p className={classes.designation}>
                    <i>
                        K<sub>обж</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='gasket.data.compression'
                        id='gasket.data.compression'
                        type='number'
                        register={register}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Условный модуль сжатия прокладки</p>
                <p className={classes.designation}>
                    <i>
                        E<sub>п</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='gasket.data.epsilon'
                        id='gasket.data.epsilon'
                        type='number'
                        register={register}
                        suffix='МПа'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Допускаемое удельное давление</p>
                <p className={classes.designation}>
                    [<i>q</i>]
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='gasket.data.permissiblePres'
                        id='gasket.data.permissiblePres'
                        type='number'
                        register={register}
                        suffix='МПа'
                    />
                </div>
            </div>
        </>
    )
}
