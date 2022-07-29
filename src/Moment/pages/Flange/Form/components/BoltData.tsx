import React, { FC } from "react"
import { UseFormRegister } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { IFormFlangeCalc } from "../../../../types/flange"
import classes from "../../../styles/page.module.scss"

type Props = {
    register: UseFormRegister<IFormFlangeCalc>
}

export const BoltData: FC<Props> = ({ register }) => {
    return (
        <>
            <div className={classes.line}>
                <p>Наружный диаметр болта (шпильки)</p>
                <p className={classes.designation}>
                    <i>d</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='bolts.diamter'
                        id='bolts.diamter'
                        type='number'
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Площадь болта (шпильки)</p>
                <p className={classes.designation}>
                    <i>
                        f<sub>6</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='bolts.area'
                        id='bolts.area'
                        type='number'
                        register={register}
                        suffix='мм&#178;'
                    />
                </div>
            </div>
        </>
    )
}
