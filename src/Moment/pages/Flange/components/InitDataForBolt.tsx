import React, { FC, memo, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../components/UI/Input/Input"
import { Select } from "../../../../components/UI/Select/Select"
import { Container } from "../../../components/Container/Container"
import { IFormCalculate, IMaterial } from "../../../types/flange"
import classes from "../../styles/page.module.scss"
import { MaterialData } from "./MaterialData"

const { Option } = Select

const boltTitles = {
    name: "материала болта (шпильки)",
    alpha: "материала болта (шпильки)",
    epsilonAt20: "материала болта (шпильки)",
    epsilon: "материала болта (шпильки)",
    sigmaAt20: "болтов (шпилек) при затяжке",
    sigma: "болтов (шпилек) в рабочих условиях и при расчете на условия испытания",
}

const boltDesignation = {
    alpha: (
        <i>
            &alpha;<sub>б</sub>
        </i>
    ),
    epsilonAt20: (
        <i>
            E<sup>20</sup>
            <sub>б</sub>
        </i>
    ),
    epsilon: (
        <i>
            E<sub>б</sub>
        </i>
    ),
    sigmaAt20: (
        <>
            [<i>&sigma;</i>]<sup>б</sup>
            <sub>м</sub>
        </>
    ),
    sigma: (
        <>
            [<i>&sigma;</i>]<sup>б</sup>
            <sub>р</sub>
        </>
    ),
}

type Props = {
    isFull?: boolean
    materials: IMaterial[]
    register: UseFormRegister<IFormCalculate>
    control: Control<IFormCalculate, any>
    setValue: UseFormSetValue<IFormCalculate>
}

const Bolt: FC<Props> = ({ isFull, materials, register, control, setValue }) => {
    const markId = useWatch({
        control,
        name: `bolts.markId`,
    })

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
                                <Option value={"another"}>Другое ...</Option>
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

            {markId === "another" && (
                <MaterialData
                    path='bolts'
                    register={register}
                    titles={boltTitles}
                    designation={boltDesignation}
                />
            )}
        </Container>
    )
}

export const InitDataForBolt = memo(Bolt)
