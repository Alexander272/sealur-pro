import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Button } from "../../../../../components/UI/Button/Button"
import AdminService from "../../../../service/admin"
import { IBolt } from "../../../../types/bolts"
import classes from "../bolts.module.scss"

type Props = {
    isInch: boolean
}

export const NewTableRow: FC<Props> = ({ isInch }) => {
    const { register, setValue, reset, handleSubmit } = useForm<IBolt[]>()
    const { mutate } = useSWRConfig()

    const [newRowCount, setNewRowCount] = useState(0)

    const saveHandler = async (rows: IBolt[]) => {
        let arr = []
        for (let i = 0; i < newRowCount; i++) {
            arr.push({
                title: rows[i].title,
                diameter: +rows[i].diameter,
                area: +rows[i].area,
                isInch,
            })
        }

        try {
            await AdminService.create(`/sealur-moment/bolts/several`, arr)
            mutate(`/sealur-moment/bolts?isInch=${isInch}`)
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

            setValue(`${i}.title`, temp[0])
            setValue(`${i}.diameter`, +temp[1].replaceAll(",", "."))
            setValue(`${i}.area`, +temp[2].replaceAll(",", "."))
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
                        {...register(`${i}.title`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.diameter`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.area`, {
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
