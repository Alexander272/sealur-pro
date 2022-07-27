import React, { FC } from "react"
import { UseFormRegister } from "react-hook-form"
import { Input } from "../../../../components/UI/Input/Input"
import { IFormCalculate } from "../../../types/flange"
import classes from "../../styles/page.module.scss"

const imgs = {
    welded: "/image/moment/flange/welded.webp",
    flat: "/image/moment/flange/flat.webp",
    free: "/image/moment/flange/free.webp",
}

type Props = {
    id: "first" | "second"
    type: "welded" | "flat" | "free"
    register: UseFormRegister<IFormCalculate>
}

export const FlangeSize: FC<Props> = ({ id, type, register }) => {
    return (
        <>
            <div className={classes["line-image"]}>
                <img src={imgs[type]} alt={type} />
            </div>

            <div className={classes.line}>
                <p>Наружный диаметр фланца</p>
                <p className={classes.designation}>
                    <i>
                        D<sub>н</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangesData.${id}.size.dOut`}
                        id={`flangesData.${id}.size.dOut`}
                        type='number'
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Внутренний диаметр фланца</p>
                <p className={classes.designation}>
                    <i>D</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangesData.${id}.size.d`}
                        id={`flangesData.${id}.size.d`}
                        type='number'
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Толщина тарелки фланца</p>
                <p className={classes.designation}>
                    <i>h</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangesData.${id}.size.h`}
                        id={`flangesData.${id}.size.h`}
                        type='number'
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Толщина втулки приварного встык фланца в месте присоединения к тарелке</p>
                <p className={classes.designation}>
                    <i>
                        S<sub>1</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangesData.${id}.size.s1`}
                        id={`flangesData.${id}.size.s1`}
                        type='number'
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>
                    Толщина втулки приварного встык фланца в месте приварки к обечайке (трубе),
                    толщина обечайки (трубы) плоского фланца или бурта свободного фланца
                </p>
                <p className={classes.designation}>
                    <i>
                        S<sub>0</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangesData.${id}.size.s0`}
                        id={`flangesData.${id}.size.s0`}
                        type='number'
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Длина конической втулки приварного встык фланца</p>
                <p className={classes.designation}>
                    <i>l</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangesData.${id}.size.l`}
                        id={`flangesData.${id}.size.l`}
                        type='number'
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Диаметр окружности расположения болтов (шпилек)</p>
                <p className={classes.designation}>
                    <i>
                        D<sub>6</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangesData.${id}.size.d6`}
                        id={`flangesData.${id}.size.d6`}
                        type='number'
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>
        </>
    )
}
