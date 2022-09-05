import React, { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Button } from "../../../../../components/UI/Button/Button"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../../components/UI/Input/Input"
import AdminService from "../../../../service/admin"
import { IStandart } from "../../../../types/standart"
import classes from "../standarts.module.scss"

type Props = {
    typeId: string
    standart: IStandart
    hasEmptySise: boolean
    setIsNeedRow: (isNeedRow: boolean) => void
    setIsInch: (isInch: boolean) => void
}

export const StandartData: FC<Props> = ({
    typeId,
    standart,
    hasEmptySise,
    setIsNeedRow,
    setIsInch,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { dirtyFields },
    } = useForm<IStandart>()
    const { mutate } = useSWRConfig()

    const isNeedRow = watch("isNeedRow")
    const isInch = watch("isInch")

    useEffect(() => {
        setIsNeedRow(isNeedRow)
    }, [isNeedRow, setIsNeedRow])

    useEffect(() => {
        setIsInch(isInch)
    }, [isInch, setIsInch])

    useEffect(() => {
        setValue("id", standart.id)
        setValue("isInch", standart.isInch || false)
        setValue("isNeedRow", standart.isNeedRow || false)
        setValue("rows", standart.rows || [])
        setValue("title", standart.title)
        setValue("titleDn", standart.titleDn)
        setValue("titlePn", standart.titlePn)
        setValue("typeId", standart.typeId)
    }, [setValue, standart])

    const saveHandler = async (data: IStandart) => {
        data.rows = data.isNeedRow ? data.rows : []
        data.id = standart.id
        data.title = standart.title
        data.typeId = standart.typeId

        try {
            await AdminService.update(`/sealur-moment/standarts/${standart.id}`, data)
            reset({}, { keepDirty: false })
            mutate(`/sealur-moment/standarts/?typeId=${typeId}`)
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    return (
        <form className={classes["content-data"]} onSubmit={handleSubmit(saveHandler)}>
            <div className={classes.inputs}>
                <Input
                    name='titleDn'
                    label='Название поля Dn'
                    orentation='horizontal'
                    register={register}
                />
                <Input
                    name='titlePn'
                    label='Название поля Py'
                    orentation='horizontal'
                    register={register}
                />
            </div>

            {hasEmptySise && (
                <Checkbox label='Дюймовые болты' id='isInch' name='isInch' register={register} />
            )}
            <Checkbox label='Есть ряды' id='isNeedRow' name='isNeedRow' register={register} />

            {isNeedRow && (
                <div className={classes.inputs}>
                    <Input
                        name='rows.0'
                        label='Название первого ряда'
                        orentation='horizontal'
                        register={register}
                    />
                    <Input
                        name='rows.1'
                        label='Название второго ряда'
                        orentation='horizontal'
                        register={register}
                    />
                </div>
            )}

            {Object.keys(dirtyFields).length !== 0 ? (
                <div className={classes.button}>
                    <Button type='submit' variant='grayPrimary' fullWidth>
                        Сохранить
                    </Button>
                </div>
            ) : null}
        </form>
    )
}
