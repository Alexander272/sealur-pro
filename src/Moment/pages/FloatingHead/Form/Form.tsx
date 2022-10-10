import React, { FC, memo } from "react"
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { Button } from "../../../../components/UI/Button/Button"
import { Checkbox } from "../../../../components/UI/Checkbox/Checkbox"
import { Detail } from "../../../components/Detail/Detail"
import { Person } from "../../../components/Person/Person"
import { IFloatData, IFormFloatingHead } from "../../../types/floatingHead"
import { InitDataForBolt } from "./components/InitDataForBolt"
import { InitDataForCalc } from "./components/InitDataForCalc"
import { InitDataForCap } from "./components/InitDataForCap"
import { InitDataForFlange } from "./components/InitDataForFlange"
import { InitDataForGasket } from "./components/InitDataForGasket"
import classes from "../../styles/page.module.scss"

type Props = {
    data: IFloatData
    register: UseFormRegister<IFormFloatingHead>
    control: Control<IFormFloatingHead, any>
    setValue: UseFormSetValue<IFormFloatingHead>
    errors: any
}

const FormFields: FC<Props> = ({ data, register, control, setValue, errors }) => {
    return (
        <>
            <InitDataForCalc register={register} control={control} errors={errors} />
            <InitDataForFlange
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

            <div className={classes.divider} />
            <Checkbox
                id='isNeedFormulas'
                name='isNeedFormulas'
                register={register}
                label={"Поставлять значения в формулы"}
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
