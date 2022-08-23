import React, { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../../components/UI/Input/Input"
import { IStandart } from "../../../../types/standart"
import classes from "../standarts.module.scss"

type Props = {
    standart: IStandart
    setIsNeedRow: (isNeedRow: boolean) => void
}

export const StandartData: FC<Props> = ({ standart, setIsNeedRow }) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { dirtyFields },
    } = useForm<IStandart>({
        defaultValues: standart,
    })

    const isNeedRow = watch("isNeedRow")

    useEffect(() => {
        setIsNeedRow(isNeedRow)
    }, [isNeedRow, setIsNeedRow])

    const saveHandler = async (data: IStandart) => {
        console.log(data)
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
            <Checkbox label='Есть ряды?' id='isNeedRow' name='isNeedRow' register={register} />
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
        </form>
    )
}
