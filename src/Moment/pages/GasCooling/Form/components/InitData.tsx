import React, { FC, memo, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import {
    IAVOData,
    IDeviceMod,
    IFinningFactor,
    INumberOfMoves,
    IPressure,
    ISectionExecution,
    ITubeCount,
    ITubeLength,
} from "../../../../types/device"
import { IGasCoolingForm } from "../../../../types/gasCooling"
import classes from "../../../styles/page.module.scss"

const { Option } = Select

type Props = {
    data: IAVOData
    register: UseFormRegister<IGasCoolingForm>
    control: Control<IGasCoolingForm, any>
    setValue: UseFormSetValue<IGasCoolingForm>
    errors: any
    tube: ITubeLength[]
    sec: ISectionExecution[]
    fin: IFinningFactor[]
    num: INumberOfMoves[]
}

const Data: FC<Props> = ({ data, register, control, setValue, errors, tube, sec, fin, num }) => {
    const hasTestPressure = useWatch({ control, name: "hasTestPressure" })
    const devId = useWatch({ control, name: "devId" })
    const factorId = useWatch({ control, name: "factorId" })
    const pressureId = useWatch({ control, name: "pressureId" })
    const sectionId = useWatch({ control, name: "sectionId" })
    const tubeCountId = useWatch({ control, name: "tubeCountId" })
    const numberOfMovesId = useWatch({ control, name: "numberOfMovesId" })
    const tubeLengthId = useWatch({ control, name: "tubeLengthId" })

    useEffect(() => {
        const dev = data.devices.find(d => d.id === devId) || ({} as IDeviceMod)
        setValue("device", dev)
    }, [devId, data, setValue])
    useEffect(() => {
        const count = data.tubeCount.find(c => c.id === tubeCountId) || ({} as ITubeCount)
        setValue("tubeCount", count)
    }, [tubeCountId, data, setValue])
    useEffect(() => {
        const pressure = data.pressure.find(p => p.id === pressureId) || ({} as IPressure)
        setValue("pressure", pressure)
    }, [pressureId, data, setValue])
    useEffect(() => {
        const factor = data.finningFactor.find(f => f.id === factorId) || ({} as IFinningFactor)
        setValue("factor", factor)
    }, [factorId, data, setValue])
    useEffect(() => {
        const section =
            data.sectionExecution.find(s => s.id === sectionId) || ({} as ISectionExecution)
        setValue("section", section)
    }, [sectionId, data, setValue])
    useEffect(() => {
        const numbers =
            data.numberOfMoves.find(n => n.id === numberOfMovesId) || ({} as INumberOfMoves)
        setValue("numberOfMoves", numbers)
    }, [numberOfMovesId, data, setValue])
    useEffect(() => {
        const length = data.tubeLength.find(t => t.id === tubeLengthId) || ({} as ITubeLength)
        setValue("tubeLength", length)
    }, [tubeLengthId, data, setValue])

    return (
        <Container title='Исходные данные для расчета'>
            <div className={classes.line}>
                <p>Модификация аппарата</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='devId'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {data.devices.map(d => (
                                    <Option key={d.id} value={d.id}>
                                        {d.title}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>
            <div className={classes.line}>
                <p>Коэффициент оребрения</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='factorId'
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onChange={field.onChange}
                                disabled={fin.length < 2}
                            >
                                {fin.map(d => (
                                    <Option key={d.id} value={d.id}>
                                        {d.value}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>
            <div className={classes.line}>
                <p>Условное давление</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='pressureId'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {data.pressure.map(d => (
                                    <Option key={d.id} value={d.id}>
                                        {d.value.toLocaleString("ru-RU")}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>
            <div className={classes.line}>
                <p>Материальное исполнение секции</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='sectionId'
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onChange={field.onChange}
                                disabled={sec.length < 2}
                            >
                                {sec.map(d => (
                                    <Option key={d.id} value={d.id}>
                                        {d.value}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>
            <div className={classes.line}>
                <p>Число рядов труб в секции</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='tubeCountId'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {data.tubeCount.map(d => (
                                    <Option key={d.id} value={d.id}>
                                        {d.value}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>
            <div className={classes.line}>
                <p>Число ходов по трубному пространству</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='numberOfMovesId'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {num.map(d => (
                                    <Option key={d.id} value={d.id}>
                                        {d.value}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>
            <div className={classes.line}>
                <p>Длина оребренных труб в секции</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='tubeLengthId'
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onChange={field.onChange}
                                disabled={tube.length < 2}
                            >
                                {tube.map(d => (
                                    <Option key={d.id} value={d.id}>
                                        {d.value}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <Checkbox
                    id='hasTestPressure'
                    name='hasTestPressure'
                    register={register}
                    label='Пробное давление'
                />
                <div className={classes["line-field"]}>
                    {hasTestPressure && (
                        <Input
                            name='testPressure'
                            id='testPressure'
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='МПа'
                            rule={{ required: true }}
                            error={errors.pressure}
                        />
                    )}
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

export const InitData = memo(Data)
