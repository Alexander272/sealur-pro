import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Button } from "../../../../../../components/UI/Button/Button"
import AdminService from "../../../../../service/admin"
import { IBolt } from "../../../../../types/bolts"
import { IFullSize } from "../../../../../types/sizes"
import { PasteField } from "../../../components/PasteField/PasteField"
import { Table } from "../../../components/Table/Table"
import classes from "../../standarts.module.scss"

type Props = {
    bolts: IBolt[]
    standartId: string
    row: 0 | 1
    isInch: boolean
}

export const SizeNewRow: FC<Props> = ({ bolts, standartId, row, isInch }) => {
    const { register, setValue, reset, handleSubmit } = useForm<IFullSize[]>()
    const { mutate } = useSWRConfig()

    const [newRowCount, setNewRowCount] = useState(0)

    const saveHandler = async (rows: IFullSize[]) => {
        let arr = []
        for (let i = 0; i < newRowCount; i++) {
            arr.push({
                standId: rows[i].standId,
                d: +rows[i].d,
                dn: rows[i].dn,
                dmm: +(rows[i].dmm || 0),
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

    const pasteHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let arr = event.target.value.split("\n")
        arr.forEach((a, i) => {
            if (a === "") return
            let temp = a.split("\t")

            setValue(`${i}.standId`, standartId)
            setValue(`${i}.pn`, +temp[0]?.replaceAll(",", "."))
            let idx = 1
            if (isInch) {
                setValue(`${i}.dn`, temp[1])
                setValue(`${i}.dmm`, +temp[2]?.replaceAll(",", "."))
                idx = 3
            }
            let bolt = bolts.find(b => b.title === temp[idx + 8]?.trim())
            if (!bolt) bolt = bolts[0]

            setValue(`${i}.dOut`, +temp[idx]?.replaceAll(",", "."))
            setValue(`${i}.d`, +temp[idx + 1]?.replaceAll(",", "."))
            setValue(`${i}.d6`, +temp[idx + 2]?.replaceAll(",", "."))
            setValue(`${i}.h`, +temp[idx + 3]?.replaceAll(",", "."))
            setValue(`${i}.length`, +temp[idx + 4]?.replaceAll(",", "."))
            setValue(`${i}.s0`, +temp[idx + 5]?.replaceAll(",", "."))
            setValue(`${i}.s1`, +temp[idx + 6]?.replaceAll(",", "."))
            setValue(`${i}.count`, +temp[idx + 7])
            setValue(`${i}.boltId`, bolt.id)
            setValue(`${i}.row`, row)
        })

        setNewRowCount(arr.length - 1)
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
                            type='number'
                            step={0.001}
                            {...register(`${i}.pn`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    {isInch && (
                        <>
                            <Table.Ceil>
                                <input className={classes.input} {...register(`${i}.dn`)} />
                            </Table.Ceil>
                            <Table.Ceil>
                                <input
                                    className={classes.input}
                                    type='number'
                                    step={0.001}
                                    {...register(`${i}.dmm`)}
                                />
                            </Table.Ceil>
                        </>
                    )}
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.dOut`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.d`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.d6`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.h`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.length`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.s0`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.s1`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.count`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <select
                            {...register(`${i}.boltId`, {
                                required: true,
                            })}
                            className={classes.select}
                        >
                            {bolts.map(b => (
                                <option key={b.id} value={b.id}>
                                    {b.title}
                                </option>
                            ))}
                        </select>
                    </Table.Ceil>
                </Table.Row>
            )
        }

        return rows
    }

    return (
        <div className={classes["table-new"]}>
            <Table>
                <div className={classes["sizes-table"]}>
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
