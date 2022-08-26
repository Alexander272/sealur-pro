import React, { useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { IFormCapCalc } from "../../../../types/cap"
import { IMaterial } from "../../../../types/flange"
import classes from "../../../styles/page.module.scss"

const { Option } = Select

const imgs = {
    welded: "/image/moment/flange/welded.webp",
    flat: "/image/moment/flange/flat.webp",
    free: "/image/moment/flange/free.webp",
}

type Props = {
    type: "welded" | "flat" | "free"
    materials: IMaterial[]
    register: UseFormRegister<IFormCapCalc>
    control: Control<IFormCapCalc, any>
    setValue: UseFormSetValue<IFormCapCalc>
    errors: any
}

export default function FlangeSize({
    type,
    materials,
    register,
    control,
    setValue,
    errors,
}: Props) {
    useEffect(() => {
        setValue(`flangesData.ringMarkId`, materials[0].id)
    }, [setValue, materials])

    return (
        <>
            <div className={classes.line}>
                <p>Материал кольца свободного фланца</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`flangesData.ringMarkId`}
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
                        name={`flangesData.size.dOut`}
                        id={`flangesData.size.dOut`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`flangesData?.size?.dOut`]}
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
                        name={`flangesData.size.d`}
                        id={`flangesData.size.d`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`flangesData?.size?.d`]}
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
                                name={`flangesData.size.dnk`}
                                id={`flangesData.size.dnk`}
                                type='number'
                                step={0.001}
                                register={register}
                                suffix='мм'
                                rule={{ required: true }}
                                error={errors[`flangesData?.size?.dnk`]}
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
                                name={`flangesData.size.dk`}
                                id={`flangesData.size.dk`}
                                type='number'
                                step={0.001}
                                register={register}
                                suffix='мм'
                                rule={{ required: true }}
                                error={errors[`flangesData?.size?.dk`]}
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
                                name={`flangesData.size.ds`}
                                id={`flangesData.size.ds`}
                                type='number'
                                step={0.001}
                                register={register}
                                suffix='мм'
                                rule={{ required: true }}
                                error={errors[`flangesData?.size?.ds`]}
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
                        name={`flangesData.size.h`}
                        id={`flangesData.size.h`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`flangesData?.size?.h`]}
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
                                name={`flangesData.size.h0`}
                                id={`flangesData.size.h0`}
                                type='number'
                                step={0.001}
                                register={register}
                                suffix='мм'
                                rule={{ required: true }}
                                error={errors[`flangesData?.size?.h0`]}
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
                                name={`flangesData.size.hk`}
                                id={`flangesData.size.hk`}
                                type='number'
                                step={0.001}
                                register={register}
                                suffix='мм'
                                rule={{ required: true }}
                                error={errors[`flangesData?.size?.hk`]}
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
                            name={`flangesData.size.s1`}
                            id={`flangesData.size.s1`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='мм'
                            rule={{ required: true }}
                            error={errors[`flangesData?.size?.s1`]}
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
                        name={`flangesData.size.s0`}
                        id={`flangesData.size.s0`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`flangesData?.size?.s0`]}
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
                            name={`flangesData.size.l`}
                            id={`flangesData.size.l`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='мм'
                            rule={{ required: true }}
                            error={errors[`flangesData?.size?.l`]}
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
                        name={`flangesData.size.d6`}
                        id={`flangesData.size.d6`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`flangesData?.size?.d6`]}
                    />
                </div>
            </div>
        </>
    )
}
