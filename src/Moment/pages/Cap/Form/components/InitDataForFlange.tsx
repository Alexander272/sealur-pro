import React, { FC, lazy, memo, Suspense, useEffect, useState } from "react"
import useSWR from "swr"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import { IMaterial, IStandart, ITypeFlange } from "../../../../types/flange"
import { IFormCapCalc } from "../../../../types/cap"
import { Temp } from "./Temp"
import { FlangeDefSize } from "./FlangeDefSize"
import ReadService from "../../../../service/read"
import classes from "../../../styles/page.module.scss"

const FlangeSize = lazy(() => import("./FlangeSize"))
const MaterialData = lazy(() => import("./MaterialData"))

const { Option } = Select

const matTitles = {
    name: "материала фланца",
    alpha: "материала фланца",
    epsilonAt20: "материала фланца",
    epsilon: "материала фланца",
    sigmaAt20: "материала фланца или бурта свободного фланца при температуре 20 ℃",
    sigma: "материала фланца или бурта свободного фланца при расчетной температуре",
}

const ringMatTitles = {
    name: "материала кольца свободного фланца",
    alpha: "материала свободного кольца",
    epsilonAt20: "материала свободного кольца",
    epsilon: "материала свободного кольца",
    sigmaAt20: "материала кольца свободного фланца при температуре 20 ℃",
    sigma: "материала кольца свободного фланца при расчетной температуре",
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

const ringMatDesignation = {
    alpha: (
        <i>
            &alpha;<sub>к</sub>
        </i>
    ),
    epsilonAt20: (
        <i>
            E<sup>20</sup>
            <sub>к</sub>
        </i>
    ),
    epsilon: (
        <i>
            E<sub>к</sub>
        </i>
    ),
    sigmaAt20: (
        <>
            [<i>&sigma;</i>]<sup>20</sup>
            <sub>к</sub>
        </>
    ),
    sigma: (
        <>
            [<i>&sigma;</i>]<sub>к</sub>
        </>
    ),
}

type Props = {
    typeFlange: ITypeFlange[]
    standarts: IStandart[]
    materials: IMaterial[]
    register: UseFormRegister<IFormCapCalc>
    control: Control<IFormCapCalc, any>
    setValue: UseFormSetValue<IFormCapCalc>
    errors: any
}

const Flange: FC<Props> = ({
    typeFlange,
    standarts,
    materials,
    register,
    control,
    setValue,
    errors,
}) => {
    const type = useWatch({
        control,
        name: `flangeData.type`,
    })
    const standartId = useWatch({
        control,
        name: `flangeData.standartId`,
    })

    const markId = useWatch({
        control,
        name: `flangeData.markId`,
    })
    const ringMarkId = useWatch({
        control,
        name: `flangeData.ringMarkId`,
    })

    const [stands, setStands] = useState(standarts)

    useEffect(() => {
        if (!standartId) {
            setValue(`flangeData.type`, "welded")
            setValue(`flangeData.standartId`, standarts[0].id)
            setValue(`flangeData.markId`, materials[0].id)
            setValue(`flangeData.dy`, standarts[0].sizes.sizeRow1[0].dn)
            setValue(`flangeData.py`, standarts[0].sizes.sizeRow1[0].pn[0].pn)
            setValue(`flangeData.corrosion`, "2")
            setValue(`flangeData.row`, 0)
        }
    }, [setValue, standartId, standarts, materials])

    const condition = typeFlange.find(tf => tf.id === stands[0]?.typeId)?.label !== type && type
    // условная выборка
    const { data } = useSWR<{ data: IStandart[] }>(
        condition
            ? `/sealur-moment/standarts/size?typeId=${typeFlange.find(tf => tf.label === type)?.id}`
            : null,
        ReadService.getData
    )

    useEffect(() => {
        if (condition) {
            if (data && data.data) {
                setStands(data.data)
                setValue(`flangeData.standartId`, data.data[0].id)
            } else if (data && !data.data) {
                setStands([])
                setValue(`flangeData.standartId`, "another")
            } else {
                setValue(`flangeData.standartId`, "another")
            }
        }
    }, [data, setValue, condition])

    if (!typeFlange || !standarts || !materials) return null

    return (
        <Container title={`Исходные данные для фланца`}>
            <div className={classes.line}>
                <p>Тип фланца</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`flangeData.type`}
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {typeFlange.map(tf => (
                                    <Option key={tf.id} value={tf.label}>
                                        {tf.title}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Параметры фланца</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`flangeData.standartId`}
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {stands.map(s => (
                                    <Option key={s.id} value={s.id}>
                                        {s.title}
                                    </Option>
                                ))}
                                <Option value={"another"}>Другое ...</Option>
                            </Select>
                        )}
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

            <Temp
                register={register}
                control={control}
                errors={errors}
                title='фланца'
                letter='ф'
                path={`flangeData`}
            />

            {standartId === "another" ? (
                <Suspense fallback={<Loader background='fill' />}>
                    <FlangeSize
                        type={type}
                        materials={materials}
                        register={register}
                        control={control}
                        setValue={setValue}
                        errors={errors}
                    />
                </Suspense>
            ) : (
                <FlangeDefSize
                    standarts={stands}
                    control={control}
                    register={register}
                    setValue={setValue}
                />
            )}

            <div className={classes.line}>
                <p>Прибавка на коррозию</p>
                <p className={classes.designation}>
                    <i>c</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangeData.corrosion`}
                        id={`flangeData.corrosion`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
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
            {ringMarkId === "another" && (
                <Suspense fallback={<Loader background='fill' />}>
                    <MaterialData
                        path={`flangeData.ringMaterial`}
                        register={register}
                        titles={ringMatTitles}
                        designation={ringMatDesignation}
                        errors={errors}
                    />
                </Suspense>
            )}
        </Container>
    )
}

export const InitDataForFlange = memo(Flange)
