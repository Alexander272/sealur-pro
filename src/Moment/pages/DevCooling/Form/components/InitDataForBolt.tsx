import React, { FC, lazy, memo, Suspense, useEffect } from "react"
import useSWR from "swr"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import { IBolt, IMaterial } from "../../../../types/flange"
import ReadService from "../../../../service/read"
import classes from "../../../styles/page.module.scss"
import { IFormDevCooling } from "../../../../types/devCooling"

const MaterialData = lazy(() => import("../../../../components/MaterialData/MaterialData"))
const BoltData = lazy(() => import("../../../../components/BoltData/BoltData"))

const { Option } = Select

const boltTitles = {
    name: "материала болта (шпильки)",
    epsilon: "материала болта (шпильки)",
    sigmaAt20: "болтов (шпилек) при температуре 20 ℃",
    sigma: "болтов (шпилек) при расчетной температуре",
}

const boltDesignation = {
    epsilon: (
        <i>
            E<sub>б</sub>
        </i>
    ),
    sigmaAt20: (
        <>
            [<i>&sigma;</i>]<sup>20</sup>
            <sub>б</sub>
        </>
    ),
    sigma: (
        <>
            [<i>&sigma;</i>]<sub>б</sub>
        </>
    ),
}

type Props = {
    materials: IMaterial[]
    register: UseFormRegister<IFormDevCooling>
    control: Control<IFormDevCooling, any>
    setValue: UseFormSetValue<IFormDevCooling>
    errors: any
}

const Bolt: FC<Props> = ({ materials, register, control, setValue, errors }) => {
    const markId = useWatch({
        control,
        name: `bolts.markId`,
    })
    const boltId = useWatch({
        control,
        name: `bolts.boltId`,
    })

    useEffect(() => {
        if (!markId) setValue("bolts.markId", materials[0].id)
    }, [setValue, markId, materials])

    const { data, isValidating } = useSWR<{ data: IBolt[] }>(
        "/sealur-moment/bolts/all",
        ReadService.getData
    )

    useEffect(() => {
        if (!boltId && data) setValue("bolts.boltId", data.data[0].id)
    }, [setValue, data, boltId])

    if (isValidating) return null

    return (
        <Container title='Исходные данные для болт/шпилька'>
            <div className={classes.line}>
                <p>Наружный диаметр болта (шпильки)</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='bolts.boltId'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {data?.data.map(b => (
                                    <Option key={b.id} value={b.id}>
                                        {b.title}
                                    </Option>
                                ))}
                                <Option value={"another"}>Другое ...</Option>
                            </Select>
                        )}
                    />
                </div>
            </div>
            {boltId === "another" && (
                <Suspense fallback={<Loader background='fill' />}>
                    <BoltData register={register} />
                </Suspense>
            )}

            <div className={classes.line}>
                <p>Число болтов (шпилек)</p>
                <p className={classes.designation}>
                    <i>n</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='bolts.count'
                        id='bolts.count'
                        type='number'
                        register={register}
                        rule={{ required: true }}
                        error={errors.bolts?.count}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Расстояние между осями болтов/шпилек в поперечном направлении</p>
                <p className={classes.designation}>
                    <i>
                        B<sub>3</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`bolts.distance`}
                        id={`bolts.distance`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors.bolts?.distance}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Длина болта/шпильки между опорными поверхностями</p>
                <p className={classes.designation}>
                    <i>
                        l<sub>б</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`bolts.lenght`}
                        id={`bolts.lenght`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм;'
                        rule={{ required: true }}
                        error={errors.bolts?.lenght}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Материал болта (шпильки)</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='bolts.markId'
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
                        path='bolts.material'
                        register={register}
                        titles={boltTitles}
                        designation={boltDesignation}
                        errors={errors}
                    />
                </Suspense>
            )}
        </Container>
    )
}

export const InitDataForBolt = memo(Bolt)
