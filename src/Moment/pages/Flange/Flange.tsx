import { useEffect } from "react"
import useSWR from "swr"
import { SubmitHandler, useForm } from "react-hook-form"
import { InitDataForCalc } from "./components/InitDataForCalc"
import { InitDataForFlange } from "./components/InitDataForFlange"
import { InitDataForBolt } from "./components/InitDataForBolt"
import { InitDataForGasket } from "./components/InitDataForGasket"
import { EmbedData } from "./components/EmbedData"
import { InitDataForWasher } from "./components/InitDataForWasher"
import { Button } from "../../../components/UI/Button/Button"
import { Loader } from "../../../components/UI/Loader/Loader"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"
import ServerError from "../../../Error/ServerError"
import ReadService from "../../service/read"
import { IFlangeData, IFormCalculate } from "../../types/flange"
import classes from "../styles/page.module.scss"

export default function Flange() {
    const { data, error } = useSWR<IFlangeData>(
        "/sealur-moment/default/flange",
        ReadService.getData
    )

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IFormCalculate>()

    useEffect(() => {
        setValue("isWork", true)
        setValue("isSameFlange", true)
        setValue("isEmbedded", false)
        setValue("flanges", "nonIsolated")
        setValue("type", "pin")
        setValue("condition", "controllable")
        setValue("calculation", "basis")
        setValue("isNeedFormulas", true)
    }, [setValue])

    const watchIsSameFlange = watch("isSameFlange", true)
    const watchIsEmbedded = watch("isEmbedded", false)

    const watchFType1 = watch("flangesData.first.type")
    const watchFType2 = watch("flangesData.second.type")

    if (!data)
        return (
            <div className={classes.wrapper}>
                <Loader isFull />
            </div>
        )

    if (error) return <ServerError />

    const calculateHandler: SubmitHandler<IFormCalculate> = data => {
        console.log(data)
    }

    return (
        <div className={classes.wrapper}>
            <form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
                <InitDataForCalc register={register} control={control} errors={errors} />
                <InitDataForFlange
                    id='first'
                    typeFlange={data.data.typeFlange}
                    standarts={data.data.standarts}
                    materials={data.data.materials}
                    register={register}
                    control={control}
                    setValue={setValue}
                />
                {!watchIsSameFlange && (
                    <InitDataForFlange
                        id='second'
                        typeFlange={data.data.typeFlange}
                        standarts={data.data.standarts}
                        materials={data.data.materials}
                        register={register}
                        control={control}
                        setValue={setValue}
                    />
                )}

                <InitDataForBolt
                    isFull={
                        (watchIsSameFlange && watchFType1 === "free") ||
                        (!watchIsSameFlange && watchFType1 === "free" && watchFType2 === "free")
                    }
                    materials={data.data.materials}
                    register={register}
                    control={control}
                    setValue={setValue}
                />
                <InitDataForWasher
                    materials={data.data.materials}
                    register={register}
                    control={control}
                    setValue={setValue}
                />
                <InitDataForGasket
                    gasket={data.data.gaskets}
                    env={data.data.env}
                    register={register}
                    control={control}
                    setValue={setValue}
                />

                {watchIsEmbedded && (
                    <EmbedData
                        materials={data.data.materials}
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
            </form>
        </div>
    )
}
