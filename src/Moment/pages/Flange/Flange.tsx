import { useEffect, useState } from "react"
import useSWR from "swr"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { Loader } from "../../../components/UI/Loader/Loader"
import { IFlangeData, IFormFlangeCalc } from "../../types/flange"
import { IResFlange } from "../../types/res_flange"
import ServerError from "../../../Error/ServerError"
import { Calc } from "./Clac/Calc"
import { Form } from "./Form/Form"
import ReadService from "../../service/read"
import CalcService from "../../service/calc"
import classes from "../styles/page.module.scss"

export default function Flange() {
    const { data, error } = useSWR<{ data: IFlangeData }>(
        "/sealur-moment/default/flange",
        ReadService.getData
    )

    const [isLoading, setLoading] = useState(false)
    const [result, setResult] = useState<IResFlange | null>(null)

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormFlangeCalc>()

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

    if (!data)
        return (
            <div className={classes.wrapper}>
                <Loader isFull />
            </div>
        )

    if (error) return <ServerError />

    const calculateHandler: SubmitHandler<IFormFlangeCalc> = async data => {
        setLoading(true)
        try {
            const res = await CalcService.CalculateFlange("/sealur-moment/calc/flange", data)
            setResult(res.data)
        } catch (error) {
            const err = error as AxiosError

            if (err.response?.status === 500) {
                toast.error(
                    "На сервере произошла ошибка. Код ошибки: " + err.response?.data.code || "F000",
                    { autoClose: false }
                )
            } else {
                toast.error("Проверьте правильность заполнения полей")
            }
        } finally {
            setLoading(false)
        }
    }

    const clearResultHandler = () => setResult(null)

    return (
        <div className={classes.wrapper}>
            {isLoading && <Loader background='fill' />}
            {result !== null ? (
                <Calc result={result} clearResult={clearResultHandler} />
            ) : (
                <form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
                    {/* //TODO добавить валидацию к полям */}
                    <Form
                        data={data.data}
                        register={register}
                        control={control}
                        setValue={setValue}
                        errors={errors}
                    />
                </form>
            )}
        </div>
    )
}
