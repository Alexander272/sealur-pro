import React, { FC, memo } from "react"
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { toast } from "react-toastify"
import useSWR from "swr"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { Checkbox } from "../../../../components/UI/Checkbox/Checkbox"
import { Button } from "../../../../components/UI/Button/Button"
import { Person } from "../../../components/Person/Person"
import { Detail } from "../../../components/Detail/Detail"
import ServerError from "../../../../Error/ServerError"
import ReadService from "../../../service/read"
import { IFormExRect } from "../../../types/exRect"
import { IFloatData } from "../../../types/floatingHead"
import { InitData } from "./components/InitData"
import { InitDataForBolt } from "./components/InitDataForBolt"
import { InitDataForGasket } from "./components/InitDataForGasket"
import classes from "../../styles/page.module.scss"

type Props = {
    register: UseFormRegister<IFormExRect>
    control: Control<IFormExRect, any>
    setValue: UseFormSetValue<IFormExRect>
    errors: any
}

const FormFields: FC<Props> = ({ register, control, setValue, errors }) => {
    const { data: res, error } = useSWR<{ data: IFloatData }>(
        "/sealur-moment/data/dev-cooling",
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
        toast.error(error.response)
        return <ServerError />
    }

    return (
        <>
            <InitData register={register} control={control} errors={errors} />
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
