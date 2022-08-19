import React, { FC, useEffect } from "react"
import { Button } from "../../../../../components/UI/Button/Button"
import { Select } from "../../../../../components/UI/Select/Select"
import { IGasket } from "../../../../types/flange"
import { IGasketData, IGasketType } from "../../../../types/gasket"
import { Table } from "./Table"
import classes from "../gasket.module.scss"
import { Controller, useForm } from "react-hook-form"
import AdminService from "../../../../service/admin"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"

const scheme = [
    { title: "Коэффициент обжатия", key: "compression" },
    { title: "Условный модуль сжатия прокладки", key: "epsilon" },
    { title: "Допускаемое удельное давление", key: "permissiblePres" },
    { title: "Толщина прокладки", key: "thickness" },
]

type Props = {
    data: IGasketData[] | undefined
    types: IGasketType[] | undefined
    gasket: IGasket | null
}

type formState = {
    typeId: string
}

export const GasketData: FC<Props> = ({ data, types, gasket }) => {
    const {
        control,
        setValue,
        watch,
        handleSubmit,
        reset,
        formState: { dirtyFields },
    } = useForm<formState>()
    const { mutate } = useSWRConfig()

    useEffect(() => {
        if (data) {
            setValue("typeId", data[0].typeId)
        } else {
            if (types) setValue("typeId", types[0].id)
        }
    }, [setValue, data, types])

    if (!data || !types) return null

    const typeId = watch("typeId")

    const saveHandler = async (data: formState) => {
        console.log(data.typeId)
        const newData = {
            typeId: data.typeId,
        }

        try {
            await AdminService.update(`/sealur-moment/gasket-data/typeId/${gasket?.id}`, newData)
            reset({}, { keepDirty: false })
            mutate(`/sealur-moment/gasket/full-data?gasketId=${gasket?.id}`)
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    return (
        <div className={classes["content-data"]}>
            <p className={classes["content-data__type--title"]}>Тип прокладки</p>
            <form className={classes["content-data__type"]} onSubmit={handleSubmit(saveHandler)}>
                <Controller
                    control={control}
                    name='typeId'
                    render={({ field }) => (
                        <Select value={field.value} onChange={field.onChange}>
                            {types.map(t => (
                                <Select.Option key={t.id} value={t.id}>
                                    {t.title}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                />
                {!data || dirtyFields.typeId ? (
                    <Button variant='grayPrimary'>Сохранить</Button>
                ) : null}
            </form>
            <Table scheme={scheme} data={data} gasketId={gasket?.id || ""} typeId={typeId} />
        </div>
    )
}
