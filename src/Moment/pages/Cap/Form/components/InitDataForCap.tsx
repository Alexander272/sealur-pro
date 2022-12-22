import React, { FC, lazy, memo, Suspense, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import { IMaterial } from "../../../../types/flange"
import { IFormCapCalc } from "../../../../types/cap"
import classes from "../../../styles/page.module.scss"

const MaterialData = lazy(() => import("../../../../components/MaterialData/MaterialData"))

const { Option } = Select

const matTitles = {
    name: "материала крышки",
    alpha: "материала крышки",
    epsilonAt20: "материала крышки",
    epsilon: "материала крышки",
}

const matDesignation = {
    alpha: (
        <i>
            &alpha;<sub>ф</sub>
        </i>
    ),
    epsilonAt20: (
        <i>
            E<sup>20</sup>
        </i>
    ),
    epsilon: <i>E</i>,
}

type Props = {
    materials: IMaterial[]
    register: UseFormRegister<IFormCapCalc>
    control: Control<IFormCapCalc, any>
    setValue: UseFormSetValue<IFormCapCalc>
    errors: any
}

const Cap: FC<Props> = ({ materials, register, control, setValue, errors }) => {
    const markId = useWatch({ control, name: `capData.markId` })
    const type = useWatch({ control, name: `capData.type` })

    useEffect(() => {
        if (!markId) {
            setValue(`capData.markId`, materials[0].id)
        }
    }, [setValue, materials, markId])

    return (
        <Container title={`Исходные данные для крышки`}>
            <div className={classes.line}>
                <p>Тип крышки</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`capData.type`}
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                <Option value='flat'>Плоская крышка</Option>
                                <Option value='sphere'>Сферическая неотбортованная крышка</Option>
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Материал фланца</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`capData.markId`}
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
                        path={`capData.material`}
                        register={register}
                        titles={matTitles}
                        designation={matDesignation}
                        errors={errors}
                    />
                </Suspense>
            )}

            <div className={classes.line}>
                <p>Толщина крышки</p>
                <p className={classes.designation}>
                    <i>
                        h<sub>кр</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`capData.h`}
                        id={`capData.h`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>

            {type === "flat" ? (
                <div className={classes.line}>
                    <p>Толщина фланцевой части крышки</p>
                    <p className={classes.designation}>
                        <i>
                            &delta;<sub>кр</sub>
                        </i>
                    </p>
                    <div className={classes["line-field"]}>
                        <Input
                            name={`capData.delta`}
                            id={`capData.delta`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='мм'
                        />
                    </div>
                </div>
            ) : (
                <div className={classes.line}>
                    <p>Радиус кривизны днища сферической неотбортованной крышки</p>
                    <p className={classes.designation}>
                        <i>
                            R<sub>кр</sub>
                        </i>
                    </p>
                    <div className={classes["line-field"]}>
                        <Input
                            name={`capData.radius`}
                            id={`capData.radius`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='мм'
                        />
                    </div>
                </div>
            )}
        </Container>
    )
}

export const InitDataForCap = memo(Cap)
