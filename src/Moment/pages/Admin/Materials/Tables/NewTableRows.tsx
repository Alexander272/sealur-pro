import React, { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Button } from "../../../../../components/UI/Button/Button"
import AdminService from "../../../../service/admin"
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
    const { register, setValue, reset, handleSubmit } = useForm<Row[]>()
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
            await AdminService.create(`/sealur-moment/materials/${field}`, newData)
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

    const pasteHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let arr = event.target.value.split(" ")
        setNewRowCount(arr.length)

        arr.forEach((a, i) => {
            let temp = a.split("\t")

            setValue(`${i}.temperature`, +temp[0].replaceAll(",", "."))
            setValue(`${i}.field`, +temp[1].replaceAll(",", "."))
        })
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
            <form className={classes["new-row"]}>{renderRows()}</form>
            <div className={classes.paste}>
                <input
                    className={classes["paste-input"]}
                    placeholder='Вставьте данные из excel'
                    value={""}
                    onChange={pasteHandler}
                />
            </div>
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
