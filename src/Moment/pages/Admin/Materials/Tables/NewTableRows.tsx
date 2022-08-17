import React, { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Button } from "../../../../../components/UI/Button/Button"
import MaterialService from "../../../../service/materials"
import classes from "../materials.module.scss"

type Row = {
    id: string
    temperature: number
    field: number
}

type Props = {
    field: "alpha" | "elasticity" | "voltage"
    materialId: string
}

export const NewTableRows: FC<Props> = ({ field, materialId }) => {
    const { register, reset, handleSubmit } = useForm<Row[]>()
    const { mutate } = useSWRConfig()

    const [newRowCount, setNewRowCount] = useState(0)

    useEffect(() => {
        setNewRowCount(0)
    }, [materialId])

    const saveHandler = async (data: Row[]) => {
        let arr = []
        for (let i = 0; i < newRowCount; i++) {
            arr.push({
                temperature: +data[i].temperature,
                [field]: +data[i].field,
            })
        }

        const newData = {
            markId: materialId,
            [field]: arr,
        }

        try {
            await MaterialService.createMaterialData(`/sealur-moment/materials/${field}`, newData)
            mutate(`/sealur-moment/materials/${materialId}`)
            resetHandler()
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    const resetHandler = () => {
        reset()
        setNewRowCount(0)
    }

    const addNewRow = () => setNewRowCount(prev => prev + 1)

    const renderRows = () => {
        let rows = []

        for (let i = 0; i < newRowCount; i++) {
            rows.push(
                <div key={"row" + i} className={classes["table-row"]}>
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.temperature`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.field`, {
                            required: true,
                        })}
                    />
                </div>
            )
        }

        return rows
    }

    return (
        <>
            <form>{renderRows()}</form>
            <div className={classes.btn}>
                <Button variant='grayPrimary' onClick={addNewRow}>
                    Добавить
                </Button>
                {newRowCount > 0 && (
                    <Button variant='danger' onClick={resetHandler}>
                        Отмена
                    </Button>
                )}
                {newRowCount > 0 && <Button onClick={handleSubmit(saveHandler)}>Сохранить</Button>}
            </div>
        </>
    )
}
