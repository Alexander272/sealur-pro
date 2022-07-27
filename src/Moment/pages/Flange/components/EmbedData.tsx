import React, { FC, memo, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { Input } from "../../../../components/UI/Input/Input"
import { Select } from "../../../../components/UI/Select/Select"
import { Container } from "../../../components/Container/Container"
import { IFormCalculate, IMaterial } from "../../../types/flange"
import classes from "../../styles/page.module.scss"

const { Option } = Select

type Props = {
    materials: IMaterial[]
    register: UseFormRegister<IFormCalculate>
    control: Control<IFormCalculate, any>
    setValue: UseFormSetValue<IFormCalculate>
}

const Embed: FC<Props> = ({ materials, register, control, setValue }) => {
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
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>
        </Container>
    )
}

export const EmbedData = memo(Embed)