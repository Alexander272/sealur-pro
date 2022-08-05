import React, { FC, memo, useEffect } from "react"
import useSWR from "swr"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import { IBolt, IFormFlangeCalc, IMaterial } from "../../../../types/flange"
import { MaterialData } from "./MaterialData"
import { Temp } from "./Temp"
import { BoltData } from "./BoltData"
import ReadService from "../../../../service/read"
import classes from "../../../styles/page.module.scss"

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
    register: UseFormRegister<IFormFlangeCalc>
    control: Control<IFormFlangeCalc, any>
    setValue: UseFormSetValue<IFormFlangeCalc>
    errors: any
}

const Bolt: FC<Props> = ({ isFull, materials, register, control, setValue, errors }) => {
    const markId = useWatch({
        control,
        name: `bolts.markId`,
    })
    const name = useWatch({
        control,
        name: `bolts.name`,
    })

    useEffect(() => {
        setValue("bolts.markId", materials[0].id)
    }, [setValue, materials])

    const { data } = useSWR<{ data: IBolt[] }>(
        isFull ? "/sealur-moment/bolts" : null,
        ReadService.getData
    )

    useEffect(() => {
        if (data) setValue("bolts.name", data.data[0].title)
    }, [setValue, data])

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

            <Temp
                register={register}
                control={control}
                errors={errors}
                title='болта (шпильки)'
                letter='б'
                path='bolts'
            />

            {isFull && data ? (
                <>
                    <div className={classes.line}>
                        <p>Наружный диаметр болта (шпильки)</p>
                        <div className={classes["line-field"]}>
                            <Controller
                                name='bolts.name'
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onChange={field.onChange}>
                                        {data?.data.map(b => (
                                            <Option key={b.id} value={b.title}>
                                                {b.diameter}
                                            </Option>
                                        ))}
                                        <Option value={"another"}>Другое ...</Option>
                                    </Select>
                                )}
                            />
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
                                rule={{ required: true }}
                                error={errors.bolts?.count}
                            />
                        </div>
                    </div>

                    {name === "another" && <BoltData register={register} />}
                </>
            ) : null}

            {markId === "another" && (
                <MaterialData
                    path='bolts.material'
                    register={register}
                    titles={boltTitles}
                    designation={boltDesignation}
                    errors={errors}
                />
            )}
        </Container>
    )
}

export const InitDataForBolt = memo(Bolt)
