import React, { FC, lazy, memo, Suspense, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../../components/UI/Input/Input"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import { IFormCapCalc } from "../../../../types/cap"
import { IMaterial } from "../../../../types/flange"
import classes from "../../../styles/page.module.scss"

const MaterialData = lazy(() => import("../../../../components/MaterialData/MaterialData"))

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
    register: UseFormRegister<IFormCapCalc>
    control: Control<IFormCapCalc, any>
    setValue: UseFormSetValue<IFormCapCalc>
    errors: any
}

const Washer: FC<Props> = ({ materials, register, control, setValue, errors }) => {
    const isUseWasher = useWatch({ control, name: "isUseWasher" })
    const markId1 = useWatch({
        control,
        name: `washer.first.markId`,
    })
    const markId2 = useWatch({
        control,
        name: `washer.second.markId`,
    })

    useEffect(() => {
        if (!markId1 || !markId2) {
            setValue("washer.first.markId", materials[0].id)
            setValue("washer.second.markId", materials[0].id)
        }
    }, [setValue, materials, markId1, markId2])

    const renderMaterial = (id: "first" | "second", markId: string) => {
        return (
            <>
                <div className={classes.line}>
                    <p>Материал {id === "first" ? "первой шайбы" : "второй шайбы"}</p>
                    <div className={classes["line-field"]}>
                        <Controller
                            name={`washer.${id}.markId`}
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
                {markId === "another" && (
                    <Suspense fallback={<Loader background='fill' />}>
                        <MaterialData
                            path={`washer.${id}.material`}
                            register={register}
                            titles={washerTitles}
                            designation={washerDesignation}
                            errors={errors}
                        />
                    </Suspense>
                )}
            </>
        )
    }

    return (
        <Container title='Исходные данные для шайбы'>
            <div className={classes["line-checkbox"]}>
                <Checkbox
                    id='isUseWasher'
                    name='isUseWasher'
                    register={register}
                    label={"Использовать данные для шайбы при расчете"}
                />
            </div>

            {isUseWasher && (
                <>
                    {renderMaterial("first", markId1)}
                    {renderMaterial("second", markId2)}

                    <div className={classes.line}>
                        <p>Толщина шайб</p>
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
                                step={0.001}
                                register={register}
                                suffix='мм'
                                rule={{ required: true }}
                                error={errors.washer?.thickness}
                            />
                        </div>
                    </div>
                </>
            )}
        </Container>
    )
}

export const InitDataForWasher = memo(Washer)
