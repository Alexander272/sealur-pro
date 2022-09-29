import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import AdminService from "../../../service/admin"
import { IBolt } from "../../../types/bolts"
import { Button } from "../../../../components/UI/Button/Button"
import { PasteField } from "../components/PasteField/PasteField"
import { Table } from "../components/Table/Table"
import classes from "./bolts.module.scss"

type Props = {
    isInch: boolean
}

export const BoltsNewRows: FC<Props> = ({ isInch }) => {
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

    const pasteHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let arr = event.target.value.split("\n")
        setNewRowCount(arr.length - 1)

        arr.forEach((a, i) => {
            if (a === "") return
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
                <Table.Row key={"row" + i}>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            {...register(`${i}.title`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.diameter`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.area`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                </Table.Row>
            )
        }

        return rows
    }

    return (
        <div className={classes["table-new"]}>
            <Table>
                <div className={classes["bolt-table"]}>
                    <form className={classes.form}>{renderRows()}</form>
                </div>
            </Table>
            <PasteField pasteHandler={pasteHandler} />

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
        </div>
    )
}
