import React, { FC, memo } from "react"
import { Control, Controller, UseFormRegister } from "react-hook-form"
import { Input } from "../../../../components/UI/Input/Input"
import { Select } from "../../../../components/UI/Select/Select"
import { Container } from "../../../components/Container/Container"
import { IFormCalculate } from "../../../types/flange"
import classes from "../../styles/page.module.scss"

const { Option } = Select

type Props = {
    register: UseFormRegister<IFormCalculate>
    control: Control<IFormCalculate, any>
}

const Calc: FC<Props> = ({ register, control }) => {
    return (
        <Container title='Исходные данные для расчета'>
            <div className={classes.line}>
                <p>Расчетное давление (внутреннее - положительное, наружное отрицательное)</p>
                <div className={classes["line-field"]}>
                    <Input
                        name='pressure'
                        id='pressure'
                        type='number'
                        register={register}
                        suffix='МПа'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>
                    Внешняя осевая сила (растягивающая - положительная, сжимающая - отрицательная)
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='axialForce'
                        id='axialForce'
                        type='number'
                        register={register}
                        suffix='Н'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Внешний изгибающий момент</p>
                <div className={classes["line-field"]}>
                    <Input
                        name='bendingMoment'
                        id='bendingMoment'
                        type='number'
                        register={register}
                        suffix='Н*мм'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Расчетная температура</p>
                <div className={classes["line-field"]}>
                    <Input
                        name='temp'
                        id='temp'
                        type='number'
                        register={register}
                        suffix='&#8451;'
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
                <p>Температура элементов фланцевого соединения</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='flanges'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                <Option value='isolated'>Изолированные фланцы</Option>
                                <Option value='nonIsolated'>Неизолированные фланцы</Option>
                                {/*//TODO сервер это еще не обрабатывает <Option value='manually'>Задается вручную</Option> */}
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Одинаковые фланца</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='isSameFlange'
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
                <p>Закладная деталь</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='isEmbedded'
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

            <div className={classes.line}>
                <p>Расчет</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='calculation'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                <Option value='basis'>Расчет основных величин</Option>
                                <Option value='strength'>Прочностной</Option>
                            </Select>
                        )}
                    />
                </div>
            </div>
        </Container>
    )
}

export const InitDataForCalc = memo(Calc)
