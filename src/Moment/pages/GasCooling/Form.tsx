import { AxiosError } from "axios"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import useSWR from "swr"
import { MomentUrl } from "../../../components/routes"
import { Loader } from "../../../components/UI/Loader/Loader"
import ServerError from "../../../Error/ServerError"
import CalcService from "../../service/calc"
import ReadService from "../../service/read"
import { IAVOData } from "../../types/device"
import { IDetail, IPersonData } from "../../types/flange"
import { IGasCoolingForm } from "../../types/gasCooling"
import classes from "../styles/page.module.scss"

const initFormValue = {}

export default function FormContainer() {
    const { data, error } = useSWR<{ data: IAVOData }>(
        "/sealur-moment/data/avo",
        ReadService.getData
    )

    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        toast.warn("Не реализовано")
        navigate(-1)
    }, [navigate])

    const [isLoading, setLoading] = useState(false)
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<any>({
        // TODO добавить везде типы
        defaultValues: (state as { form?: IGasCoolingForm }).form || initFormValue,
    })

    if (!data)
        return (
            <div className={classes.wrapper}>
                <Loader isFull />
            </div>
        )

    if (error) return <ServerError />

    const calculateHandler: SubmitHandler<IGasCoolingForm> = async data => {
        setLoading(true)
        const person = data.personData?.hasPerson ? data.personData : null
        data.personData = {} as IPersonData
        const detail = data.detailData?.hasDetail ? data.detailData : null
        data.detailData = {} as IDetail

        try {
            const res = await CalcService.Calculate<IGasCoolingForm, any>(
                "/sealur-moment/calc/gas-cooling",
                data
            )
            navigate(".", { state: { form: data } })
            navigate(MomentUrl + "/gas-cooling/result", {
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

    /*
    
    Коэффициент оребрения зависит от Модификация аппарата
    Материальное исполнение секции зависит от Модификация аппарата (почему-то вызывается при изменении Условное давление)
    Длина оребренных труб в секции зависит от Модификация аппарата
    Число ходов по трубному пространству зависит от Модификация аппарата и Число рядов труб в секции

    Тип прокладки зависит от Коэффициент оребрения и Условное давление и Число рядов труб в секции и Число ходов по трубному пространству
    
    */

    return (
        <>
            {isLoading && <Loader background='fill' />}
            <form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
                {/* <Form
                    data={data.data}
                    register={register}
                    control={control}
                    setValue={setValue}
                    errors={errors}
                /> */}
            </form>
        </>
    )
}
