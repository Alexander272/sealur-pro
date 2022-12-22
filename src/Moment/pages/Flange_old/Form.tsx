import { useState } from "react"
import useSWR from "swr"
import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { Loader } from "../../../components/UI/Loader/Loader"
import { MomentUrl } from "../../../components/routes"
import { IDetail, IFlangeData, IFormFlangeCalc, IPersonData } from "../../types/flange"
import { IResFlange } from "../../types/res_flange_old"
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
    personData: {
        hasPerson: false,
    },
    detailData: {
        hasDetail: false,
    },
}

export default function FormContainer() {
    const { data, error } = useSWR<{ data: IFlangeData }>(
        "/sealur-moment/data/flange",
        ReadService.getData
    )

    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormFlangeCalc>({
        defaultValues: initFormValue,
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
        const person = data.personData.hasPerson ? data.personData : null
        data.personData = {} as IPersonData
        const detail = data.detailData.hasDetail ? data.detailData : null
        data.detailData = {} as IDetail

        try {
            const res = await CalcService.Calculate<IFormFlangeCalc, IResFlange>(
                "/sealur-moment/calc/flange",
                data
            )
            navigate(MomentUrl + "/flange/result", { state: { result: res.data, person, detail } })
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
        <>
            {isLoading && <Loader background='fill' />}
            <form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
                <Form
                    data={data.data}
                    register={register}
                    control={control}
                    setValue={setValue}
                    errors={errors}
                />
            </form>
        </>
    )
}
