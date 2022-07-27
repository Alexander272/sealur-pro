import React, { FC, memo, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { Input } from "../../../../components/UI/Input/Input"
import { Select } from "../../../../components/UI/Select/Select"
import { Container } from "../../../components/Container/Container"
import { IFormCalculate, IMaterial } from "../../../types/flange"
import classes from "../../styles/page.module.scss"

const { Option } = Select

type Props = {
    isFull?: boolean
    materials: IMaterial[]
    register: UseFormRegister<IFormCalculate>
    control: Control<IFormCalculate, any>
    setValue: UseFormSetValue<IFormCalculate>
}

const Bolt: FC<Props> = ({ isFull, materials, register, control, setValue }) => {
    useEffect(() => {
        setValue("bolts.markId", materials[0].id)
    }, [setValue, materials])

    return (
        <Container title='Исходные данные для болт/шпилька'>
            <div className={classes.line}>
                <p>Материал болта (шпильки)</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='bolts.markId'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {materials.map(m => (
                                    <Option key={m.id} value={m.id}>
                                        {m.title}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            {isFull && (
                <>
                    <div className={classes.line}>
                        <p>Наружный диаметр болта (шпильки)</p>
                        <div className={classes["line-field"]}>
                            <Select value='true' onChange={() => {}}>
                                <Option value='true'>Рабочие условия</Option>
                                <Option value='false'>Условия испытаний</Option>
                            </Select>
                        </div>
                    </div>

                    <div className={classes.line}>
                        <p>Число болтов (шпилек)</p>
                        <p className={classes.designation}>
                            <i>n</i>
                        </p>
                        <div className={classes["line-field"]}>
                            <Input
                                name='bolts.count'
                                id='bolts.count'
                                type='number'
                                register={register}
                            />
                        </div>
                    </div>
                </>
            )}
        </Container>
    )
}

export const InitDataForBolt = memo(Bolt)
