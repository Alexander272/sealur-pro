import React, { FC } from "react"
import { Control, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { Button } from "../../../../components/UI/Button/Button"
import { Checkbox } from "../../../../components/UI/Checkbox/Checkbox"
import { IFlangeData, IFormFlangeCalc } from "../../../types/flange"
import { EmbedData } from "./components/EmbedData"
import { InitDataForBolt } from "./components/InitDataForBolt"
import { InitDataForCalc } from "./components/InitDataForCalc"
import { InitDataForFlange } from "./components/InitDataForFlange"
import { InitDataForGasket } from "./components/InitDataForGasket"
import { InitDataForWasher } from "./components/InitDataForWasher"
import classes from "../../styles/page.module.scss"

type Props = {
    data: IFlangeData
    register: UseFormRegister<IFormFlangeCalc>
    control: Control<IFormFlangeCalc, any>
    setValue: UseFormSetValue<IFormFlangeCalc>
    errors: any
}

export const Form: FC<Props> = ({ data, register, control, setValue, errors }) => {
    const isSameFlange = useWatch({ control, name: "isSameFlange" })
    const isEmbedded = useWatch({ control, name: "isEmbedded" })

    const FStnadId1 = useWatch({ control, name: "flangesData.first.standartId" })
    const FStnadId2 = useWatch({ control, name: "flangesData.second.standartId" })

    return (
        <>
            <InitDataForCalc register={register} control={control} errors={errors} />
            <InitDataForFlange
                id='first'
                typeFlange={data.typeFlange}
                standarts={data.standarts}
                materials={data.materials}
                register={register}
                control={control}
                setValue={setValue}
            />
            {!isSameFlange && (
                <InitDataForFlange
                    id='second'
                    typeFlange={data.typeFlange}
                    standarts={data.standarts}
                    materials={data.materials}
                    register={register}
                    control={control}
                    setValue={setValue}
                />
            )}

            <InitDataForBolt
                isFull={
                    (isSameFlange && FStnadId1 === "another") ||
                    (!isSameFlange && FStnadId1 === "another" && FStnadId2 === "another")
                }
                materials={data.materials}
                register={register}
                control={control}
                setValue={setValue}
            />
            <InitDataForWasher
                materials={data.materials}
                register={register}
                control={control}
                setValue={setValue}
            />
            <InitDataForGasket
                gasket={data.gaskets}
                env={data.env}
                register={register}
                control={control}
                setValue={setValue}
            />

            {isEmbedded && (
                <EmbedData
                    materials={data.materials}
                    register={register}
                    control={control}
                    setValue={setValue}
                />
            )}

            <div className={classes.divider} />

            <Checkbox
                id='isNeedFormulas'
                name='isNeedFormulas'
                register={register}
                label={"Поставлять значения в формулы"}
            />

            <div className={classes["form-button"]}>
                <Button fullWidth>Расчитать</Button>
            </div>
        </>
    )
}
