import React, { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Button } from "../../../../../components/UI/Button/Button"
import AdminService from "../../../../service/admin"
import classes from "../gasket.module.scss"

type Props = {
    scheme: {
        key: string
        title: string
    }[]
    style: any
    gasketId: string
    typeId: string
}

export const NewTableRow: FC<Props> = ({ scheme, style, gasketId, typeId }) => {
    const { register, reset, handleSubmit } = useForm()
    const { mutate } = useSWRConfig()

    const [newRowCount, setNewRowCount] = useState(0)

    useEffect(() => {
        setNewRowCount(0)
    }, [gasketId])

    const saveHandler = async (data: any) => {
        let arr = []
        for (let i = 0; i < newRowCount; i++) {
            let newobj: any = {}
            scheme.forEach(s => {
                newobj[s.key] = +data[i][s.key]
            })
            arr.push(newobj)
        }

        const newData = {
            gasketId,
            typeId,
            data: arr,
        }

        try {
            await AdminService.create(`/sealur-moment/gasket-data/many`, newData)
            mutate(`/sealur-moment/gasket/full-data?gasketId=${gasketId}`)
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
                <div key={"row" + i} className={classes["content-table__row"]} style={style}>
                    {scheme.map(k => (
                        <input
                            key={"row" + i + k.key}
                            className={classes["content-table__column"]}
                            type='number'
                            step={0.001}
                            {...register(`${i}.${k.key}`, {
                                required: true,
                            })}
                        />
                    ))}
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
