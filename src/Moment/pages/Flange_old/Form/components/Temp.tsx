import React, { FC } from "react"
import { Control, UseFormRegister, useWatch } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { IFormFlangeCalc } from "../../../../types/flange"
import classes from "../../../styles/page.module.scss"

type Props = {
    register: UseFormRegister<IFormFlangeCalc>
    control: Control<IFormFlangeCalc, any>
    errors: any
    title: string
    letter: string
    path: string
}

export const Temp: FC<Props> = ({ register, control, errors, title, letter, path }) => {
    const flanges = useWatch({
        control,
        name: "flanges",
    })

    if (flanges !== "manually") return null

    return (
        <div className={classes.line}>
            <p>Расчетная температура {title}</p>
            <p className={classes.designation}>
                <i>
                    t<sub>{letter}</sub>
                </i>
            </p>
            <div className={classes["line-field"]}>
                <Input
                    name={`${path}.temp`}
                    id={`${path}.temp`}
                    type='number'
                    step={0.001}
                    register={register}
                    suffix='&#8451;'
                    rule={{ required: true }}
                    error={errors[`${path}?.temp`]}
                />
            </div>
        </div>
    )
}
