import React, { useState } from "react"
import useSWR from "swr"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { Loader } from "../../../components/UI/Loader/Loader"
import { MomentUrl } from "../../../components/routes"
import ServerError from "../../../Error/ServerError"
import ReadService from "../../service/read"
import CalcService from "../../service/calc"
import { IFormCapCalc } from "../../types/cap"
import { IDetail, IFlangeData, IPersonData } from "../../types/flange"
import { Form } from "./Form/Form"
import classes from "../styles/page.module.scss"

const initFormValue = {
    isWork: true,
    isEmbedded: false,
    flanges: "nonIsolated" as "nonIsolated",
    type: "pin" as "pin",
    condition: "controllable" as "controllable",
    calculation: "basis" as "basis",
    isNeedFormulas: true,
    isUseWasher: false,
    capData: {
        type: "flat" as "flat",
    },
    personData: {
        hasPerson: false,
    },
    detailData: {
        hasDetail: false,
    },
}

export default function Cap() {
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
    } = useForm<IFormCapCalc>({
        defaultValues: initFormValue,
    })

    if (!data)
        return (
            <div className={classes.wrapper}>
                <Loader isFull />
            </div>
        )

    if (error) return <ServerError />

    const calculateHandler: SubmitHandler<IFormCapCalc> = async data => {
        setLoading(true)
        const person = data.personData.hasPerson ? data.personData : null
        data.personData = {} as IPersonData
        const detail = data.detailData.hasDetail ? data.detailData : null
        data.detailData = {} as IDetail
        try {
            const res = await CalcService.CalculateCap(data)
            navigate(MomentUrl + "/cap/result", { state: { result: res.data, person, detail } })
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
