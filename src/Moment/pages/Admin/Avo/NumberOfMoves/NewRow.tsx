import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Button } from "../../../../../components/UI/Button/Button"
import AdminService from "../../../../service/admin"
import { INumberOfMoves } from "../../../../types/device"
import { PasteField } from "../../components/PasteField/PasteField"
import { Table } from "../../components/Table/Table"
import classes from "../avo.module.scss"

type Props = {
    devId: string
    countId: string
}

export const NewRow: FC<Props> = ({ devId, countId }) => {
    const { register, setValue, reset, handleSubmit } = useForm<INumberOfMoves[]>()
    const { mutate } = useSWRConfig()

    const [newRowCount, setNewRowCount] = useState(0)

    const saveHandler = async (data: INumberOfMoves[]) => {
        let arr = []
        for (let i = 0; i < newRowCount; i++) {
            arr.push({
                devId: devId,
                countId: countId,
                value: data[i].value,
            })
        }

        try {
            await AdminService.create(`/sealur-moment/number-of-moves/few`, arr)
            mutate([
                "/sealur-moment/number-of-moves",
                [
                    { name: "devId", value: devId },
                    { name: "countId", value: countId },
                ],
            ])
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

            setValue(`${i}.value`, temp[0])
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
                            {...register(`${i}.value`, {
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
                <div className={classes["content-data"]}>
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
