import React, { FC, lazy, memo, Suspense, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import { IMaterial } from "../../../../types/flange"
import { IFormFloatingHead } from "../../../../types/floatingHead"
import classes from "../../../styles/page.module.scss"

const MaterialData = lazy(() => import("./MaterialData"))

const { Option } = Select

const matTitles = {
    name: "материала фланца",
    epsilonAt20: "материала фланца",
    epsilon: "материала фланца",
    sigmaAt20: "материала фланца или бурта свободного фланца при температуре 20 ℃",
    sigma: "материала фланца или бурта свободного фланца при расчетной температуре",
}

const matDesignation = {
    epsilonAt20: (
        <i>
            E<sup>20</sup>
        </i>
    ),
    epsilon: <i>E</i>,
    sigmaAt20: (
        <>
            [<i>&sigma;</i>]<sup>20</sup>
        </>
    ),
    sigma: (
        <>
            [<i>&sigma;</i>]
        </>
    ),
}

type Props = {
    materials: IMaterial[]
    register: UseFormRegister<IFormFloatingHead>
    control: Control<IFormFloatingHead, any>
    setValue: UseFormSetValue<IFormFloatingHead>
    errors: any
}

const Flange: FC<Props> = ({ materials, register, control, setValue, errors }) => {
    const markId = useWatch({
        control,
        name: `flangeData.markId`,
    })

    useEffect(() => {
        if (!markId) setValue("flangeData.markId", materials[0].id)
    }, [setValue, markId, materials])

    if (!materials) return null

    return (
        <Container title='Исходные данные для фланца плавающей головки'>
            <div className={classes.line}>
                <p>Наружный диаметр фланца</p>
                <p className={classes.designation}>
                    <i>
                        D<sub>н</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangeData.dOut`}
                        id={`flangeData.dOut`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`flangesData?.dOut`]}
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
                        name={"flangeData.d"}
                        id={`flangeData.d`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`flangeData?.d`]}
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
                        name={`flangeData.d6`}
                        id={`flangeData.d6`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`flangeData?.d6`]}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Температура фланца</p>
                <p className={classes.designation}>
                    <i>
                        t<sub>ф</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangeData.t`}
                        id={`flangeData.t`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='&#8451;'
                        rule={{ required: true }}
                        error={errors[`flangeData?.t`]}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Материал фланца</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`flangeData.markId`}
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
                        path={`flangeData.material`}
                        register={register}
                        titles={matTitles}
                        designation={matDesignation}
                        errors={errors}
                    />
                </Suspense>
            )}
        </Container>
    )
}

export const InitDataForFlange = memo(Flange)
