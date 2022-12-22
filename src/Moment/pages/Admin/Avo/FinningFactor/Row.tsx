import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Table } from "../../components/Table/Table"
import { IFinningFactor } from "../../../../types/device"
import AdminService from "../../../../service/admin"
import classes from "../avo.module.scss"

type Props = {
    data: IFinningFactor
    devId: string
}

export const Row: FC<Props> = ({ data, devId }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { dirtyFields },
    } = useForm<IFinningFactor>({
        defaultValues: data,
    })
    const { mutate } = useSWRConfig()
    const { toggle, isOpen } = useModal()

    const saveHandler = async (row: IFinningFactor) => {
        const newData = {
            devId: devId,
            value: row.value,
        }
        try {
            await AdminService.update(`/sealur-moment/finning-factor/${data.id}`, newData)
            mutate(["/sealur-moment/finning-factor", [{ name: "devId", value: devId }]])
            reset({}, { keepDirty: false })
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    const deleteHandler = async () => {
        try {
            await AdminService.delete(`/sealur-moment/finning-factor/${data.id}`)
            mutate(["/sealur-moment/finning-factor", [{ name: "devId", value: devId }]])
            reset({}, { keepDirty: false })
        } catch (error) {
            toast.error("Произошла ошибка")
        } finally {
            toggle()
        }
    }

    const openModalHandler = (event: React.MouseEvent) => {
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
                            {...register("value", {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                </Table.Row>

                {dirtyFields.value ? (
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
