import React, { FC } from "react"
import useSWR from "swr"
import ReadService from "../../../../service/read"
import { IAlpha, IElasticity, IFullMaterial, IVoltage } from "../../../../types/materials"
import { Table } from "./Table"
import classes from "../materials.module.scss"
import { Loader } from "../../../../../components/UI/Loader/Loader"

type Props = {
    material: IFullMaterial | null
}

export const Tables: FC<Props> = ({ material }) => {
    const { data } = useSWR<{
        data: { alpha: IAlpha[]; elasticity: IElasticity[]; voltage: IVoltage[] }
    }>(material ? `/sealur-moment/materials/${material.id}` : null, ReadService.getData)

    if (!data || !material)
        return (
            <div className={`${classes.tables} scroll`}>
                <Loader />
            </div>
        )

    return (
        <div className={`${classes.tables} scroll`}>
            <p className={classes["tables-title"]}>{material?.title}</p>
            <div className={classes["tables-content"]}>
                <Table
                    title='Модуль упругости'
                    field='elasticity'
                    materialId={material.id}
                    data={data?.data.elasticity || []}
                />
                <Table
                    title='Коэффициент линейного расширения'
                    field='alpha'
                    materialId={material.id}
                    data={data?.data.alpha || []}
                />
                <Table
                    title='Номинальное допускаемое напряжение для болтов (шпилек)'
                    field='voltage'
                    data={data?.data.voltage || []}
                    materialId={material.id}
                />
            </div>
        </div>
    )
}
