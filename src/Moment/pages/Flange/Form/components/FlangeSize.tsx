import React, { FC, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { IFormFlangeCalc, IMaterial } from "../../../../types/flange"
import classes from "../../../styles/page.module.scss"

const { Option } = Select

const imgs = {
    welded: "/image/moment/flange/welded.webp",
    flat: "/image/moment/flange/flat.webp",
    free: "/image/moment/flange/free.webp",
}

type Props = {
    id: "first" | "second"
    type: "welded" | "flat" | "free"
    materials: IMaterial[]
    register: UseFormRegister<IFormFlangeCalc>
    control: Control<IFormFlangeCalc, any>
    setValue: UseFormSetValue<IFormFlangeCalc>
}

export const FlangeSize: FC<Props> = ({ id, type, materials, register, control, setValue }) => {
    useEffect(() => {
        setValue(`flangesData.${id}.ringMarkId`, materials[0].id)
    }, [setValue, materials, id])

    return (
        <>
            <div className={classes.line}>
                <p>Материал кольца свободного фланца</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`flangesData.${id}.ringMarkId`}
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

            {type === "free" && (
                <>
                    <div className={classes.line}>
                        <p>Наружный диаметр кольца свободного фланца</p>
                        <p className={classes.designation}>
                            <i>
                                D<sub>н.к</sub>
                            </i>
                        </p>
                        <div className={classes["line-field"]}>
                            <Input
                                name={`flangesData.${id}.size.dnk`}
                                id={`flangesData.${id}.size.dnk`}
                                type='number'
                                register={register}
                                suffix='мм'
                            />
                        </div>
                    </div>
                    <div className={classes.line}>
                        <p>Внутренний диаметр кольца свободного фланца</p>
                        <p className={classes.designation}>
                            <i>
                                D<sub>к</sub>
                            </i>
                        </p>
                        <div className={classes["line-field"]}>
                            <Input
                                name={`flangesData.${id}.size.dk`}
                                id={`flangesData.${id}.size.dk`}
                                type='number'
                                register={register}
                                suffix='мм'
                            />
                        </div>
                    </div>
                    <div className={classes.line}>
                        <p>Наружный диаметр контакта бурта и кольца свободного фланца</p>
                        <p className={classes.designation}>
                            <i>
                                D<sub>s</sub>
                            </i>
                        </p>
                        <div className={classes["line-field"]}>
                            <Input
                                name={`flangesData.${id}.size.ds`}
                                id={`flangesData.${id}.size.ds`}
                                type='number'
                                register={register}
                                suffix='мм'
                            />
                        </div>
                    </div>
                </>
            )}

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
            {type === "free" && (
                <>
                    <div className={classes.line}>
                        <p>
                            Расстояние от наружной поверхности обечайки до внутренней окружности
                            контакта бурта и кольца свободного фланца
                        </p>
                        <p className={classes.designation}>
                            <i>
                                h<sub>0</sub>
                            </i>
                        </p>
                        <div className={classes["line-field"]}>
                            <Input
                                name={`flangesData.${id}.size.h0`}
                                id={`flangesData.${id}.size.h0`}
                                type='number'
                                register={register}
                                suffix='мм'
                            />
                        </div>
                    </div>
                    <div className={classes.line}>
                        <p>Толщина кольца свободного фланца</p>
                        <p className={classes.designation}>
                            <i>
                                h<sub>к</sub>
                            </i>
                        </p>
                        <div className={classes["line-field"]}>
                            <Input
                                name={`flangesData.${id}.size.hk`}
                                id={`flangesData.${id}.size.hk`}
                                type='number'
                                register={register}
                                suffix='мм'
                            />
                        </div>
                    </div>
                </>
            )}

            {type === "welded" && (
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
            )}

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

            {type === "welded" && (
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
            )}

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
