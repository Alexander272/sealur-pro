import React, { FC, memo } from "react"
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form"
import useSWR from "swr"
import { IFloatData, IFormFloatingHead } from "../../../types/floatingHead"
import { Button } from "../../../../components/UI/Button/Button"
import { Checkbox } from "../../../../components/UI/Checkbox/Checkbox"
import { Detail } from "../../../components/Detail/Detail"
import { Person } from "../../../components/Person/Person"
import { InitDataForBolt } from "./components/InitDataForBolt"
import { InitDataForCalc } from "./components/InitDataForCalc"
import { InitDataForCap } from "./components/InitDataForCap"
import { InitDataForFlange } from "./components/InitDataForFlange"
import { InitDataForGasket } from "./components/InitDataForGasket"
import { Loader } from "../../../../components/UI/Loader/Loader"
import ReadService from "../../../service/read"
import ServerError from "../../../../Error/ServerError"
import classes from "../../styles/page.module.scss"
import { toast } from "react-toastify"

type Props = {
    // data: IFloatData
    register: UseFormRegister<IFormFloatingHead>
    control: Control<IFormFloatingHead, any>
    setValue: UseFormSetValue<IFormFloatingHead>
    errors: any
}

const FormFields: FC<Props> = ({ register, control, setValue, errors }) => {
    const { data: res, error } = useSWR<{ data: IFloatData }>(
        "/sealur-moment/data/float",
        ReadService.getData
    )

    if (!res)
        return (
            <div className={classes.wrapper}>
                <Loader isFull />
            </div>
        )

    if (error) {
        console.log(error)
        toast.error(error.response.message)
        return <ServerError />
    }

    return (
        <>
            <InitDataForCalc register={register} control={control} errors={errors} />
            <InitDataForFlange
                materials={res.data.materials}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />
            <InitDataForCap
                materials={res.data.materials}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />

            <InitDataForBolt
                materials={res.data.materials}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />
            <InitDataForGasket
                gasket={res.data.gaskets}
                env={res.data.env}
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
