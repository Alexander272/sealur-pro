import React, { useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue } from "react-hook-form"
import useSWR from "swr"
import { Select } from "../../../components/UI/Select/Select"
import { Input } from "../../../components/UI/Input/Input"
import ReadService from "../../service/read"
import { ITypeGasket, TypeGasket } from "../../types/flange"
import classes from "../../pages/styles/page.module.scss"

const { Option } = Select

type Props = {
    register: UseFormRegister<any>
    control: Control<any, any>
    setValue: UseFormSetValue<any>
    type?: TypeGasket[] | ["All"]
    errors: any
}

export default function GasketData({ register, control, setValue, errors, type = ["All"] }: Props) {
    const { data } = useSWR<{ data: ITypeGasket[] }>(
        ["/sealur-moment/type-gasket", type.map(t => ({ name: "types", value: t }))],
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
                    <Input
                        name='gasket.data.title'
                        id='gasket.data.title'
                        register={register}
                        rule={{ required: true }}
                        error={errors.gasket?.d_in}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Материал прокладки</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='gasket.data.type'
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onChange={field.onChange}
                                disabled={(data?.data.length || 0) <= 1}
                            >
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
                        step={0.001}
                        register={register}
                        suffix='МПа'
                        rule={{ required: true }}
                        error={errors.gasket?.data?.qo}
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
                        step={0.001}
                        register={register}
                        rule={{ required: true }}
                        error={errors.gasket?.data?.m}
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
                        step={0.001}
                        register={register}
                        rule={{ required: true }}
                        error={errors.gasket?.data?.compression}
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
                        step={0.001}
                        rule={{ required: true }}
                        error={errors.gasket?.data?.epsilon}
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
                        step={0.001}
                        rule={{ required: true }}
                        error={errors.gasket?.data?.permissiblePres}
                    />
                </div>
            </div>
        </>
    )
}
