import { FC, lazy, memo, Suspense, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Container } from "../../../../components/Container/Container"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import { IFormDevCooling } from "../../../../types/devCooling"
import { IMaterial } from "../../../../types/flange"
import classes from "../../../styles/page.module.scss"

const MaterialData = lazy(() => import("../../../../components/MaterialData/MaterialData"))

const { Option } = Select

const matTitles = {
    name: "материала труб",
    epsilon: "материала труб",
    sigmaAt20: "материала труб при температуре 20 ℃",
    sigma: "материала труб при расчетной температуре",
}

const matDesignation = {
    epsilon: (
        <i>
            E<sub>Т</sub>
        </i>
    ),
    sigmaAt20: (
        <>
            [<i>&sigma;</i>]<sup>20</sup>
            <sub>Т</sub>
        </>
    ),
    sigma: (
        <>
            [<i>&sigma;</i>]<sub>Т</sub>
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

const Tube: FC<Props> = ({ materials, register, control, setValue, errors }) => {
    const markId = useWatch({ control, name: `tube.markId` })
    const mounting = useWatch({ control, name: `mounting` })

    useEffect(() => {
        if (!markId) {
            setValue(`tube.markId`, materials[0].id)
        }
    }, [setValue, materials, markId])

    return (
        <Container title='Исходные данные для труб'>
            <div className={classes.line}>
                <p>Длина труб</p>
                <p className={classes.designation}>
                    <i>L</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='tube.length'
                        id='tube.length'
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`tube?.length`]}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Приведенная длина труб при продольном изгибе</p>
                <p className={classes.designation}>
                    <i>
                        L<sub>к</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`tube.reducedLength`}
                        id={`tube.reducedLength`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`tube?.reducedLength`]}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Наружный диаметр трубы</p>
                <p className={classes.designation}>
                    <i>
                        d<sub>Т</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`tube.diameter`}
                        id={`tube.diameter`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`tube?.diameter`]}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Толщина стенки трубы</p>
                <p className={classes.designation}>
                    <i>
                        s<sub>T</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`tube.thickness`}
                        id={`tube.thickness`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`tube?.thickness`]}
                    />
                </div>
            </div>

            {mounting !== "welding" && (
                <div className={classes.line}>
                    <p>Глубина развальцовки</p>
                    <p className={classes.designation}>
                        <i>
                            l<sub>0</sub>
                        </i>
                    </p>
                    <div className={classes["line-field"]}>
                        <Input
                            name={`tube.depth`}
                            id={`tube.depth`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='мм'
                            rule={{ required: true }}
                            error={errors[`tube?.depth`]}
                        />
                    </div>
                </div>
            )}

            {mounting !== "flaring" && (
                <div className={classes.line}>
                    <p>Размер сварного шва приварки труб</p>
                    <p className={classes.designation}>
                        <i>
                            a<sub>T</sub>
                        </i>
                    </p>
                    <div className={classes["line-field"]}>
                        <Input
                            name={`tube.size`}
                            id={`tube.size`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='мм'
                            rule={{ required: true }}
                            error={errors[`tube?.size`]}
                        />
                    </div>
                </div>
            )}

            <div className={classes.line}>
                <p>Прибавка на коррозию</p>
                <p className={classes.designation}>
                    <i>
                        c<sub>T</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`tube.corrosion`}
                        id={`tube.corrosion`}
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                        rule={{ required: true }}
                        error={errors[`tube?.corrosion`]}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Материал фланца</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name={`tube.markId`}
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
                        path={`tube.material`}
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

export const InitDataForTube = memo(Tube)
