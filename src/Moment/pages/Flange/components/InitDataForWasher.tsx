import React, { FC, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Checkbox } from "../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../components/UI/Input/Input"
import { Select } from "../../../../components/UI/Select/Select"
import { Container } from "../../../components/Container/Container"
import { IFormCalculate, IMaterial } from "../../../types/flange"
import { MaterialData } from "./MaterialData"
import classes from "../../styles/page.module.scss"

const { Option } = Select

const washerTitles = {
    name: "материала шайбы",
    alpha: "материала шайбы",
}

const washerDesignation = {
    alpha: (
        <i>
            &alpha;<sub>ш</sub>
        </i>
    ),
}

type Props = {
    materials: IMaterial[]
    register: UseFormRegister<IFormCalculate>
    control: Control<IFormCalculate, any>
    setValue: UseFormSetValue<IFormCalculate>
}

export const InitDataForWasher: FC<Props> = ({ materials, register, control, setValue }) => {
    const isUseWasher = useWatch({ control, name: "isUseWasher" })
    const markId = useWatch({
        control,
        name: `washer.markId`,
    })

    useEffect(() => {
        setValue("washer.markId", materials[0].id)
    }, [setValue, materials])

    return (
        <Container title='Исходные данные для шайбы'>
            <div className={classes.line}>
                <Checkbox
                    id='isUseWasher'
                    name='isUseWasher'
                    register={register}
                    label={"Использовать данные для шайбы при расчете"}
                />
            </div>

            {isUseWasher && (
                <>
                    <div className={classes.line}>
                        <p>Материал шайбы</p>
                        <div className={classes["line-field"]}>
                            <Controller
                                name='washer.markId'
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

                    <div className={classes.line}>
                        <p>Толщина шайбы</p>
                        <p className={classes.designation}>
                            <i>
                                h<sub>ш</sub>
                            </i>
                        </p>
                        <div className={classes["line-field"]}>
                            <Input
                                name='washer.thickness'
                                id='washer.thickness'
                                type='number'
                                register={register}
                                suffix='мм'
                            />
                        </div>
                    </div>

                    {markId === "another" && (
                        <MaterialData
                            path='bolts'
                            register={register}
                            titles={washerTitles}
                            designation={washerDesignation}
                        />
                    )}
                </>
            )}
        </Container>
    )
}
