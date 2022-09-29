import React, { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Button } from "../../../../../components/UI/Button/Button"
import AdminService from "../../../../service/admin"
import { Table } from "../../components/Table/Table"
import classes from "../gasket.module.scss"

type Props = {
    gasketId: string
    typeId: string
}

export const GasketNewRows: FC<Props> = ({ gasketId, typeId }) => {
    const { register, reset, handleSubmit } = useForm()
    const { mutate } = useSWRConfig()

    const [newRowCount, setNewRowCount] = useState(0)

    useEffect(() => {
        setNewRowCount(0)
    }, [gasketId])

    const saveHandler = async (data: any) => {
        let arr = []
        for (let i = 0; i < newRowCount; i++) {
            arr.push({
                compression: +data[i].compression,
                epsilon: +data[i].epsilon,
                permissiblePres: +data[i].permissiblePres,
                thickness: +data[i].thickness,
            })
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
                <Table.Row key={"row" + i}>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.compression`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.epsilon`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.permissiblePres`, {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register(`${i}.thickness`, {
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
        <div className={classes["content-new"]}>
            <form className={classes["content-form"]}>
                <div className={classes["content-table"]}>{renderRows()}</div>
            </form>
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
