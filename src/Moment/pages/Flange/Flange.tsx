import { useState } from "react"
import useSWR from "swr"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { Loader } from "../../../components/UI/Loader/Loader"
import { MomentUrl } from "../../../components/routes"
import { IFlangeData, IFormFlangeCalc } from "../../types/flange"
import ServerError from "../../../Error/ServerError"
import ReadService from "../../service/read"
import CalcService from "../../service/calc"
import { Form } from "./Form/Form"
import classes from "../styles/page.module.scss"

const initFormValue = {
    isWork: true,
    isSameFlange: true,
    isEmbedded: false,
    flanges: "nonIsolated" as "nonIsolated",
    type: "pin" as "pin",
    condition: "controllable" as "controllable",
    calculation: "basis" as "basis",
    isNeedFormulas: true,
    isUseWasher: false,
}

export default function Flange() {
    const { data, error } = useSWR<{ data: IFlangeData }>(
        "/sealur-moment/default/flange",
        ReadService.getData
    )

    const location = useLocation()
    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormFlangeCalc>({
        defaultValues: (location.state as { form: IFormFlangeCalc })?.form || initFormValue,
    })

    if (!data)
        return (
            <div className={classes.wrapper}>
                <Loader isFull />
            </div>
        )

    if (error) return <ServerError />

    const calculateHandler: SubmitHandler<IFormFlangeCalc> = async data => {
        setLoading(true)
        // navigate(".", { state: { form: data } })
        try {
            const res = await CalcService.CalculateFlange("/sealur-moment/calc/flange", data)
            navigate(MomentUrl + "/flange/result", { state: { result: res.data } })
        } catch (error) {
            const err = error as AxiosError

            if (err.response?.status === 500) {
                toast.error(
                    "На сервере произошла ошибка. Код ошибки: " +
                        (err.response?.data?.code || "F000"),
                    { autoClose: false }
                )
            } else if (err.response?.status === 400) {
                toast.error("Проверьте правильность заполнения полей")
            } else {
                toast.error("Произошла ошибка")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={classes.wrapper}>
            {isLoading && <Loader background='fill' />}
            {!location.pathname.includes("result") && (
                <form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
                    <Form
                        data={data.data}
                        register={register}
                        control={control}
                        setValue={setValue}
                        errors={errors}
                    />
                </form>
            )}
            <Outlet />
        </div>
    )
}
