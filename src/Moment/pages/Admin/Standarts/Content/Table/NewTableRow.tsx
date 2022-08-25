import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Button } from "../../../../../../components/UI/Button/Button"
import AdminService from "../../../../../service/admin"
import { IBolt } from "../../../../../types/bolts"
import { IFullSize } from "../../../../../types/sizes"
import classes from "../../standarts.module.scss"

type Props = {
    bolts: IBolt[]
    standartId: string
    row: 0 | 1
}

export const NewTableRow: FC<Props> = ({ bolts, standartId, row }) => {
    const { register, setValue, reset, handleSubmit } = useForm<IFullSize[]>()
    const { mutate } = useSWRConfig()

    const [newRowCount, setNewRowCount] = useState(0)

    const saveHandler = async (rows: IFullSize[]) => {
        let arr = []
        for (let i = 0; i < newRowCount; i++) {
            arr.push({
                standId: rows[i].standId,
                d: +rows[i].d,
                d6: +rows[i].d6,
                dOut: +rows[i].dOut,
                h: +rows[i].h,
                length: +rows[i].length,
                pn: +rows[i].pn,
                s0: +rows[i].s0,
                s1: +rows[i].s1,
                count: +rows[i].count,
                boltId: rows[i].boltId,
                row: row,
            })
        }
        console.log(arr)

        try {
            await AdminService.create(`/sealur-moment/flange-sizes/several`, arr)
            mutate(`/sealur-moment/flange-sizes?standartId=${standartId}`)
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
        arr.forEach((a, i) => {
            let temp = a.split("\t")

            let bolt = bolts.find(b => b.title === temp[9])
            if (!bolt) bolt = bolts[0]

            setValue(`${i}.standId`, standartId)
            setValue(`${i}.pn`, +temp[0])
            setValue(`${i}.dOut`, +temp[1])
            setValue(`${i}.d`, +temp[2])
            setValue(`${i}.d6`, +temp[3])
            setValue(`${i}.h`, +temp[4])
            setValue(`${i}.length`, +temp[5])
            setValue(`${i}.s0`, +temp[6])
            setValue(`${i}.s1`, +temp[7])
            setValue(`${i}.count`, +temp[8])
            setValue(`${i}.boltId`, bolt.id)
            setValue(`${i}.row`, row)
        })

        setNewRowCount(arr.length)
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
                        {...register(`${i}.pn`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.dOut`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.d`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.d6`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.h`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.length`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.s0`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        step={0.001}
                        {...register(`${i}.s1`, {
                            required: true,
                        })}
                    />
                    <input
                        className={classes.column}
                        type='number'
                        {...register(`${i}.count`, {
                            required: true,
                        })}
                    />
                    <select
                        {...register(`${i}.boltId`, {
                            required: true,
                        })}
                        className={classes["column-select"]}
                    >
                        {bolts.map(b => (
                            <option key={b.id} value={b.id}>
                                {b.title}
                            </option>
                        ))}
                    </select>
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
