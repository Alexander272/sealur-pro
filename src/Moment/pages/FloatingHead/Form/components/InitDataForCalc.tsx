import React, { FC, memo } from "react"
import { Control, Controller, UseFormRegister } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import { IFormFloatingHead } from "../../../../types/floatingHead"
import classes from "../../../styles/page.module.scss"

const { Option } = Select

type Props = {
    register: UseFormRegister<IFormFloatingHead>
    control: Control<IFormFloatingHead, any>
    errors: any
}

const Calc: FC<Props> = ({ register, control, errors }) => {
    return (
        <Container title='Исходные данные для расчета'>
            <div className={classes.line}>
                <p>Максимальный перепад давления</p>
                <div className={classes["line-field"]}>
                    <Input
                        name='pressure'
                        id='pressure'
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='МПа'
                        rule={{ required: true }}
                        error={errors.pressure}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Условия работы</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='isWork'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                <Option value={true}>Рабочие условия</Option>
                                <Option value={false}>Условия испытаний</Option>
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Шип на привалочной поверхности</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='hasThorn'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                <Option value={true}>Да</Option>
                                <Option value={false}>Нет</Option>
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Тип соединения</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='type'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                <Option value='bolt'>Болт</Option>
                                <Option value='pin'>Шпилька</Option>
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Условие затяжки</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='condition'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                <Option value='uncontrollable'>Неконтролируемая затяжка</Option>
                                <Option value='controllable'>Контроль по крутящему моменту</Option>
                                <Option value='controllablePin'>Контроль по вытяжке шпилек</Option>
                            </Select>
                        )}
                    />
                </div>
            </div>
        </Container>
    )
}

export const InitDataForCalc = memo(Calc)
