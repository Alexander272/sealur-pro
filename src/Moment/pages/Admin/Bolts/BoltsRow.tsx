import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import AdminService from "../../../service/admin"
import { IBolt } from "../../../types/bolts"
import { ConfirmModal } from "../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../components/Modal/hooks/useModal"
import { Table } from "../components/Table/Table"
import classes from "./bolts.module.scss"

type Props = {
    bolt: IBolt
    isInch: boolean
}

export const BoltsRow: FC<Props> = ({ bolt, isInch }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { dirtyFields },
    } = useForm<IBolt>({
        defaultValues: bolt,
    })
    const { mutate } = useSWRConfig()
    const { toggle, isOpen } = useModal()

    const saveHandler = async (row: IBolt) => {
        let newData: IBolt = {
            id: bolt.id,
            title: row.title,
            diameter: +row.diameter,
            area: +row.area,
            isInch: isInch,
        }

        try {
            await AdminService.update(`/sealur-moment/bolts/${bolt.id}`, newData)
            reset({}, { keepDirty: false })
            mutate(`/sealur-moment/bolts?isInch=${isInch}`)
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    const deleteHandler = async () => {
        try {
            await AdminService.delete(`/sealur-moment/bolts/${bolt.id}`)
            reset({}, { keepDirty: false })
            mutate(`/sealur-moment/bolts?isInch=${isInch}`)
        } catch (error) {
            toast.error("Произошла ошибка")
        } finally {
            toggle()
        }
    }

    const openModalHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        toggle()
    }

    return (
        <>
            <ConfirmModal
                title='Удалить?'
                toggle={toggle}
                isOpen={isOpen}
                cancelHandler={toggle}
                confirmHandler={deleteHandler}
            />
            <form className={classes.form} onSubmit={handleSubmit(saveHandler)}>
                <Table.Row>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            {...register("title", {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register("diameter", {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register("area", {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                </Table.Row>

                {Object.keys(dirtyFields).length !== 0 ? (
                    <button type='submit' className={classes.icon}>
                        <img src='/image/save-icon.svg' alt='save' />
                    </button>
                ) : (
                    <button
                        onClick={openModalHandler}
                        type='button'
                        className={classes["icon-delete"]}
                    >
                        &times;
                    </button>
                )}
            </form>
        </>
    )
}
