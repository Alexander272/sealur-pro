import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Button } from "../../../../../components/UI/Button/Button"
import AdminService from "../../../../service/admin"
import { INameGasket } from "../../../../types/device"
import { PasteField } from "../../components/PasteField/PasteField"
import { Table } from "../../components/Table/Table"
import classes from "../avo.module.scss"

type Props = {
    finId: string
    presId: string
    numId: string
}

export const NewRow: FC<Props> = ({ finId, presId, numId }) => {
    const { register, setValue, reset, handleSubmit } = useForm<INameGasket[]>()
    const { mutate } = useSWRConfig()

    const [newRowCount, setNewRowCount] = useState(0)

    const saveHandler = async (data: INameGasket[]) => {
        let arr = []
        for (let i = 0; i < newRowCount; i++) {
            arr.push({
                finId: finId,
                presId: presId,
                numId: numId,
                title: data[i].title,
                sizeLong: +data[i].sizeLong,
                sizeTrans: +data[i].sizeTrans,
                width: +data[i].width,
                thick1: +data[i].thick1,
                thick2: +data[i].thick2,
                thick3: +data[i].thick3,
                thick4: +data[i].thick4,
            })
        }

        try {
            await AdminService.create(`/sealur-moment/name-gasket/few`, arr)
            mutate([
                "/sealur-moment/name-gasket/full",
                [
                    { name: "finId", value: finId },
                    { name: "presId", value: presId },
                    { name: "numId", value: numId },
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

            setValue(`${i}.title`, temp[0])
            setValue(`${i}.sizeLong`, +temp[1].replaceAll(",", ".") || 0)
            setValue(`${i}.sizeTrans`, +temp[2].replaceAll(",", ".") || 0)
            setValue(`${i}.width`, +temp[3].replaceAll(",", ".") || 0)
            setValue(`${i}.thick1`, +temp[4].replaceAll(",", ".") || 0)
            setValue(`${i}.thick2`, +temp[5].replaceAll(",", ".") || 0)
            setValue(`${i}.thick3`, +temp[6].replaceAll(",", ".") || 0)
            setValue(`${i}.thick4`, +temp[7].replaceAll(",", ".") || 0)
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
                            {...register(`${i}.sizeLong`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.sizeTrans`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.width`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.thick1`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.thick2`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.thick3`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.thick4`, {
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
