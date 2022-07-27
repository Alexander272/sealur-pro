import React, { FC, memo, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../components/UI/Input/Input"
import { Select } from "../../../../components/UI/Select/Select"
import { Container } from "../../../components/Container/Container"
import { IEnv, IFormCalculate, IGasket } from "../../../types/flange"
import classes from "../../styles/page.module.scss"

const { Option } = Select

type Props = {
    gasket: IGasket[]
    env: IEnv[]
    register: UseFormRegister<IFormCalculate>
    control: Control<IFormCalculate, any>
    setValue: UseFormSetValue<IFormCalculate>
}

const Gasket: FC<Props> = ({ gasket, env, control, register, setValue }) => {
    //TODO gasketId. нужно проверить все ли правильно работает
    const gasketId = useWatch({ control, name: "gasket.gasketId" })

    useEffect(() => {
        setValue("gasket.gasketId", gasket[0].id)
        setValue("gasket.envId", env[0].id)
        setValue("gasket.thickness", gasket[0].thickness[0])
    }, [setValue, gasket, env])

    useEffect(() => {
        setValue("gasket.thickness", gasket.find(g => g.id === gasketId)?.thickness[0] || 1)
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
                    <Controller
                        name='gasket.thickness'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {gasket
                                    .find(g => g.id === gasketId)
                                    ?.thickness.map(t => (
                                        <Option key={t} value={t}>
                                            {t.toLocaleString("ru-RU")}
                                        </Option>
                                    ))}
                            </Select>
                        )}
                    />
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
                        register={register}
                        suffix='мм'
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
                    />
                </div>
            </div>
        </Container>
    )
}

export const InitDataForGasket = memo(Gasket)
