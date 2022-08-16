import React, { FC, lazy, memo, Suspense, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import { IFormFlangeCalc, IMaterial } from "../../../../types/flange"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import classes from "../../../styles/page.module.scss"

const MaterialData = lazy(() => import("./MaterialData"))

const { Option } = Select

const embedTitles = {
    name: "материала трубной решетки или иной закладной детали, зажатой между фланцами",
    alpha: "материала трубной решетки или иной закладной детали, зажатой между фланцами",
}

const embedDesignation = {
    alpha: (
        <i>
            &alpha;<sub>р</sub>
        </i>
    ),
}

type Props = {
    materials: IMaterial[]
    register: UseFormRegister<IFormFlangeCalc>
    control: Control<IFormFlangeCalc, any>
    setValue: UseFormSetValue<IFormFlangeCalc>
    errors: any
}

const Embed: FC<Props> = ({ materials, register, control, setValue, errors }) => {
    const markId = useWatch({
        control,
        name: `embed.markId`,
    })

    useEffect(() => {
        setValue("embed.markId", materials[0].id)
    }, [setValue, materials])

    return (
        <Container title='Исходные данные для закладной детали'>
            <div className={classes.line}>
                <p>Материал закладной детали</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='embed.markId'
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
                <p>Толщина трубной решетки или закладной детали между прокладками</p>
                <p className={classes.designation}>
                    <i>
                        h<sub>р</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='embed.thickness'
                        id='embed.thickness'
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors.embed?.thickness}
                    />
                </div>
            </div>

            {markId === "another" && (
                <Suspense fallback={<Loader />}>
                    <MaterialData
                        path='embed.material'
                        register={register}
                        titles={embedTitles}
                        designation={embedDesignation}
                        errors={errors}
                    />
                </Suspense>
            )}
        </Container>
    )
}

export default memo(Embed)
