import React, { FC, memo, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import { IEnv, IFormFlangeCalc, IGasket } from "../../../../types/flange"
import { GasketData } from "./GasketData"
import classes from "../../../styles/page.module.scss"

const { Option } = Select

type Props = {
    gasket: IGasket[]
    env: IEnv[]
    register: UseFormRegister<IFormFlangeCalc>
    control: Control<IFormFlangeCalc, any>
    setValue: UseFormSetValue<IFormFlangeCalc>
    errors: any
}

const Gasket: FC<Props> = ({ gasket, env, control, register, setValue, errors }) => {
    //TODO gasketId. нужно проверить все ли правильно работает
    const gasketId = useWatch({ control, name: "gasket.gasketId" })

    useEffect(() => {
        if (!gasketId) {
            setValue("gasket.gasketId", gasket[0].id)
            setValue("gasket.envId", env[0].id)
            setValue("gasket.thickness", gasket[0].thickness[0].toString())
        }
    }, [setValue, gasket, gasketId, env])

    useEffect(() => {
        setValue(
            "gasket.thickness",
            gasket.find(g => g.id === gasketId)?.thickness[0].toString() || "3"
        )
    }, [setValue, gasketId, gasket])

    return (
        <Container title='Исходные данные для прокладки'>
            <div className={classes.line}>
                <p>Тип прокладки</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='gasket.gasketId'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {gasket.map(g => (
                                    <Option key={g.id} value={g.id}>
                                        {g.title}
                                    </Option>
                                ))}
                                <Option value='another'>Другое ...</Option>
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Уплотняемая среда</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='gasket.envId'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {env.map(e => (
                                    <Option key={e.id} value={e.id}>
                                        {e.title}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Толщина прокладки</p>
                <div className={classes["line-field"]}>
                    {gasketId !== "another" ? (
                        <Controller
                            name='gasket.thickness'
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onChange={field.onChange}>
                                    {gasket
                                        .find(g => g.id === gasketId)
                                        ?.thickness.map(t => (
                                            <Option key={t} value={t.toString()}>
                                                {t.toLocaleString("ru-RU")}
                                            </Option>
                                        ))}
                                </Select>
                            )}
                        />
                    ) : (
                        <Input
                            name='gasket.thickness'
                            id='gasket.thickness'
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='мм'
                            rule={{ required: true }}
                            error={errors.gasket?.thickness}
                        />
                    )}
                </div>
            </div>

            <div className={classes.line}>
                <p>Наружный диаметр прокладки</p>
                <p className={classes.designation}>
                    <i>
                        D<sub>н.п</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='gasket.d_out'
                        id='gasket.d_out'
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors.gasket?.d_out}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Внутренний диаметр прокладки</p>
                <p className={classes.designation}>
                    <i>
                        D<sub>в.п</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='gasket.d_in'
                        id='gasket.d_in'
                        type='number'
                        register={register}
                        suffix='мм'
                        step={0.001}
                        rule={{ required: true }}
                        error={errors.gasket?.d_in}
                    />
                </div>
            </div>

            {gasketId === "another" && (
                <GasketData
                    register={register}
                    control={control}
                    setValue={setValue}
                    errors={errors}
                />
            )}
        </Container>
    )
}

export const InitDataForGasket = memo(Gasket)
