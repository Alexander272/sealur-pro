import { AxiosError } from "axios"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import useSWR from "swr"
import { MomentUrl } from "../../../components/routes"
import { Loader } from "../../../components/UI/Loader/Loader"
import ServerError from "../../../Error/ServerError"
import CalcService from "../../service/calc"
import ReadService from "../../service/read"
import { IFloatData, IFormFloatingHead } from "../../types/floatingHead"
import { Form } from "./Form/Form"
import classes from "../styles/page.module.scss"
import { IResFloat } from "../../types/res_float"

const initFormValue = {
    isWork: true,
    hasThorn: false,
    type: "pin" as "pin",
    condition: "controllable" as "controllable",
    isNeedFormulas: true,
    personData: {
        hasPerson: false,
    },
    detailData: {
        hasDetail: false,
    },
}

export default function FloatingHead() {
    const { data, error, isValidating } = useSWR<{ data: IFloatData }>(
        "/sealur-moment/data/float",
        ReadService.getData
    )

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormFloatingHead>({
        defaultValues: initFormValue,
    })

    const location = useLocation()
    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)

    const calculateHandler: SubmitHandler<IFormFloatingHead> = async data => {
        setLoading(true)

        const person = data.personData?.hasPerson ? data.personData : null
        const detail = data.detailData?.hasDetail ? data.detailData : null
        data.personData = undefined
        data.detailData = undefined

        try {
            const res = await CalcService.Calculate<IFormFloatingHead, IResFloat>(
                "/sealur-moment/calc/float",
                data
            )
            navigate(MomentUrl + "/floating-head/result", {
                state: { result: res.data, person, detail },
            })
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

    if (isValidating || !data)
        return (
            <div className={classes.wrapper}>
                <Loader isFull />
            </div>
        )

    if (error) return <ServerError />

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
