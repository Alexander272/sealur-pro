import React, { FC, memo, Suspense } from "react"
import { Control, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { IFormCapCalc } from "../../../types/cap"
import { Button } from "../../../../components/UI/Button/Button"
import { Checkbox } from "../../../../components/UI/Checkbox/Checkbox"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { InitDataForCalc } from "./components/InitDataForCalc"
import { Person } from "../../../components/Person/Person"
import { Detail } from "../../../components/Detail/Detail"
import { IFlangeData } from "../../../types/flange"
import { InitDataForBolt } from "./components/InitDataForBolt"
import { InitDataForGasket } from "./components/InitDataForGasket"
import { InitDataForFlange } from "./components/InitDataForFlange"
import EmbedData from "./components/EmbedData"
import { InitDataForWasher } from "./components/InitDataForWasher"
import { InitDataForCap } from "./components/InitDataForCap"
import classes from "../../styles/page.module.scss"

type Props = {
    data: IFlangeData
    register: UseFormRegister<IFormCapCalc>
    control: Control<IFormCapCalc, any>
    setValue: UseFormSetValue<IFormCapCalc>
    errors: any
}

const FormFields: FC<Props> = ({ data, register, control, setValue, errors }) => {
    const isEmbedded = useWatch({ control, name: "isEmbedded" })
    const FStandId = useWatch({ control, name: "flangeData.standartId" })

    return (
        <>
            <InitDataForCalc register={register} control={control} errors={errors} />
            <InitDataForFlange
                typeFlange={data.typeFlange}
                standarts={data.standarts}
                materials={data.materials}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />
            <InitDataForCap
                materials={data.materials}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />

            <InitDataForBolt
                isFull={FStandId === "another"}
                materials={data.materials}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />
            <InitDataForWasher
                materials={data.materials}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />
            <InitDataForGasket
                gasket={data.gaskets}
                env={data.env}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />

            {isEmbedded && (
                <Suspense fallback={<Loader />}>
                    <EmbedData
                        materials={data.materials}
                        register={register}
                        control={control}
                        setValue={setValue}
                        errors={errors}
                    />
                </Suspense>
            )}

            <div className={classes.divider} />
            <Checkbox
                id='isNeedFormulas'
                name='isNeedFormulas'
                register={register}
                label={"Подставлять значения в формулы"}
            />
            <Person register={register} errors={errors} control={control} />
            <Detail register={register} errors={errors} control={control} />

            <div className={classes["form-button"]}>
                <Button fullWidth>Расчитать</Button>
            </div>
        </>
    )
}

export const Form = memo(FormFields)
