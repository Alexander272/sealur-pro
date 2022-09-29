import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import AdminService from "../../../../service/admin"
import { IGasketData } from "../../../../types/gasket"
import { Table } from "../../components/Table/Table"
import classes from "../gasket.module.scss"

type Props = {
    data: IGasketData
    gasketId: string
    typeId: string
}

export const GasketRow: FC<Props> = ({ data, gasketId, typeId }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { dirtyFields },
    } = useForm<IGasketData>({
        defaultValues: data,
    })
    const { mutate } = useSWRConfig()
    const { toggle, isOpen } = useModal()

    const saveHandler = async (row: any) => {
        let newData: IGasketData = {
            id: data.id,
            gasketId: gasketId,
            compression: row.compression,
            epsilon: row.epsilon,
            permissiblePres: row.permissiblePres,
            thickness: row.thickness,
            typeId: typeId,
        }

        try {
            await AdminService.update(`/sealur-moment/gasket-data/${data.id}`, newData)
            mutate(`/sealur-moment/gasket/full-data?gasketId=${gasketId}`)
            reset({}, { keepDirty: false })
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    const deleteHandler = async () => {
        try {
            await AdminService.delete(`/sealur-moment/gasket-data/${data.id}`)
            mutate(`/sealur-moment/gasket/full-data?gasketId=${gasketId}`)
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
            <form
                key={data.id}
                className={classes["content-form"]}
                onSubmit={handleSubmit(saveHandler)}
            >
                <Table.Row>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register("compression", {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register("epsilon", {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register("permissiblePres", {
                                required: true,
                            })}
                        />
                    </Table.Ceil>
                    <Table.Ceil>
                        <input
                            className={classes.input}
                            type='number'
                            step={0.001}
                            {...register("thickness", {
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
                        className={classes["icon-delete"]}
                        type='button'
                        onClick={openModalHandler}
                    >
                        &times;
                    </button>
                )}
            </form>
        </>
    )
}
