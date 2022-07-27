import React, { FC, memo, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../components/UI/Input/Input"
import { Select } from "../../../../components/UI/Select/Select"
import { Container } from "../../../components/Container/Container"
import { IFormCalculate, IMaterial, IStandart, ITypeFlange } from "../../../types/flange"
import { MaterialData } from "./MaterialData"
import { FlangeSize } from "./FlangeSize"
import classes from "../../styles/page.module.scss"
import useSWR from "swr"
import ReadService from "../../../service/read"

const { Option } = Select

const types = {
    "1": "welded",
    2: "flat",
    3: "free",
}
const typeIds = {
    welded: 1,
    flat: 2,
    free: 3,
}

const matTitles = {
    name: "материала фланца",
    alpha: "материала фланца",
    epsilonAt20: "материала фланца",
    epsilon: "материала фланца",
    sigmaAt20: "материала фланца или бурта свободного фланца при температуре 20 ℃",
    sigma: "материала фланца или бурта свободного фланца при расчетной температуре",
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

type Props = {
    id: "first" | "second"
    typeFlange: ITypeFlange[]
    standarts: IStandart[]
    materials: IMaterial[]
    register: UseFormRegister<IFormCalculate>
    control: Control<IFormCalculate, any>
    setValue: UseFormSetValue<IFormCalculate>
}

const Flange: FC<Props> = ({
    id,
    typeFlange,
    standarts,
    materials,
    register,
    control,
    setValue,
}) => {
    const type = useWatch({
        control,
        name: `flangesData.${id}.type`,
    })
    const standartId = useWatch({
        control,
        name: `flangesData.${id}.standartId`,
    })
    const dn = useWatch({
        control,
        name: `flangesData.${id}.dy`,
    })
    const markId = useWatch({
        control,
        name: `flangesData.${id}.markId`,
    })

    useEffect(() => {
        setValue(`flangesData.${id}.type`, "welded")
        setValue(`flangesData.${id}.standartId`, standarts[0].id)
        setValue(`flangesData.${id}.markId`, materials[0].id)
        setValue(`flangesData.${id}.dy`, standarts[0].sizes.sizeRow1[0].dn)
        setValue(`flangesData.${id}.py`, standarts[0].sizes.sizeRow1[0].pn[0])
        setValue(`flangesData.${id}.corrosion`, 2)
    }, [setValue, id, standarts, materials])

    useEffect(() => {
        const curSt = standarts.find(s => s.id === standartId)
        const curDn = curSt?.sizes.sizeRow1.find(s => s.dn === dn)
        if (curSt && !curDn) {
            setValue(`flangesData.${id}.dy`, curSt.sizes.sizeRow1[0].dn)
            setValue(`flangesData.${id}.py`, curSt.sizes.sizeRow1[0].pn[0])
        } else if (curDn) {
            setValue(`flangesData.${id}.py`, curDn.pn[0])
        } else {
            setValue(`flangesData.${id}.dy`, 0)
            setValue(`flangesData.${id}.py`, 0)
        }
    }, [setValue, id, standartId, standarts, dn])

    //TODO дописать получение данных на сервере
    // условная выборка
    const { data } = useSWR(
        types[standarts[0].typeId as "1"] !== type && type
            ? `/sealur-moment/standarts/size/?typeId=${typeIds[type]}`
            : null,
        ReadService.getStandarts
    )
    console.log(data)

    useEffect(() => {
        if (types[standarts[0].typeId as "1"] !== type && type) {
            if (data) {
            } else {
                setValue(`flangesData.${id}.standartId`, "another")
            }
        }
    }, [data, id, setValue, standarts, type])

    if (!typeFlange || !standarts || !materials) return null

    return (
        <Container title={`Исходные данные для ${id === "first" ? "первого" : "второго"} фланца`}>
            <div className={classes.line}>
                <p>Тип фланца</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`flangesData.${id}.type`}
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {typeFlange.map(tf => (
                                    <Option key={tf.id} value={types[tf.id as "1"]}>
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
                        name={`flangesData.${id}.standartId`}
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {standarts.map(s => (
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
                        name={`flangesData.${id}.markId`}
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

            {standartId === "another" ? (
                <FlangeSize id={id} type={type} register={register} />
            ) : (
                <>
                    <div className={classes.line}>
                        {/* //TODO заголовок тут меняется в зависимости от стандарта (и похоже не только заголовок меняется) 
                        Надо бы это в отделный компонент выкинуть
                        */}
                        <p>Внутренний диаметр аппарата</p>
                        <p className={classes.designation}>
                            <i>D</i>
                        </p>
                        <div className={classes["line-field"]}>
                            <Controller
                                name={`flangesData.${id}.dy`}
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onChange={field.onChange}>
                                        {standarts
                                            .find(s => s.id === standartId)
                                            ?.sizes.sizeRow1.map(s => (
                                                <Option key={s.dn} value={s.dn}>
                                                    {s.dn.toLocaleString("ru-RU")}
                                                </Option>
                                            ))}
                                    </Select>
                                )}
                            />
                        </div>
                    </div>

                    <div className={classes.line}>
                        <p>Давление условное (МПа)</p>
                        <p className={classes.designation}>
                            <i>
                                P<sub>у</sub>
                            </i>
                        </p>
                        <div className={classes["line-field"]}>
                            <Controller
                                name={`flangesData.${id}.py`}
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onChange={field.onChange}>
                                        {standarts
                                            .find(s => s.id === standartId)
                                            ?.sizes.sizeRow1.find(s => s.dn === dn)
                                            ?.pn.map(s => (
                                                <Option key={s} value={s}>
                                                    {s.toLocaleString("ru-RU")}
                                                </Option>
                                            ))}
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                </>
            )}

            <div className={classes.line}>
                <p>Прибавка на коррозию</p>
                <p className={classes.designation}>
                    <i>c</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`flangesData.${id}.corrosion`}
                        id={`flangesData.${id}.corrosion`}
                        type='number'
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>

            {markId === "another" && (
                <MaterialData
                    path={`flangesData.${id}.material`}
                    register={register}
                    titles={matTitles}
                    designation={matDesignation}
                />
            )}
        </Container>
    )
}

export const InitDataForFlange = memo(Flange)
