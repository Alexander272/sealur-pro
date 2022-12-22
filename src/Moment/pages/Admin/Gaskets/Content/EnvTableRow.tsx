import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import AdminService from "../../../../service/admin"
import { IEnvType } from "../../../../types/env"
import { Table } from "../../components/Table/Table"
import classes from "../gasket.module.scss"

type Env = {
    id: string
    specificPres: number
    m: number
}

type Props = {
    type: IEnvType
    gasketId: string
    data: Env | undefined
}

export const EnvTableRow: FC<Props> = ({ type, gasketId, data }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { dirtyFields },
    } = useForm<Env>({
        defaultValues: data,
    })
    const { mutate } = useSWRConfig()

    const saveRowHandler = async (row: Env) => {
        let newData = {
            id: data?.id,
            envId: type.id,
            gasketId: gasketId,
            specificPres: +row.specificPres,
            m: +row.m,
        }

        try {
            if (data?.id) {
                await AdminService.update(`/sealur-moment/env-data/${data.id}`, newData)
            } else {
                await AdminService.create("/sealur-moment/env-data/", newData)
            }

            mutate(`/sealur-moment/gasket/full-data?gasketId=${gasketId}`)
            reset({}, { keepDirty: false })
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    return (
        <form className={classes["content-form"]} onSubmit={handleSubmit(saveRowHandler)}>
            <Table.Row>
                <Table.Ceil>
                    <input
                        className={classes.input}
                        type='number'
                        step={0.001}
                        {...register("specificPres", {
                            required: true,
                        })}
                    />
                </Table.Ceil>
                <Table.Ceil>
                    <input
                        className={classes.input}
                        type='number'
                        step={0.001}
                        {...register("m", {
                            required: true,
                        })}
                    />
                </Table.Ceil>
                <Table.Ceil>
                    <p className={classes.thead}>{type.title}</p>
                </Table.Ceil>
            </Table.Row>

            {Object.keys(dirtyFields).length !== 0 ? (
                <button type='submit' className={classes.icon}>
                    <img src='/image/save-icon.svg' alt='save' />
                </button>
            ) : null}
        </form>
    )
}
