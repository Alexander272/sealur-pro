import React, { FC } from "react"
import { IAlpha, IElasticity, IVoltage } from "../../../../types/materials"
import { TableRow } from "./TableRow"
import { NewTableRows } from "./NewTableRows"
import classes from "../materials.module.scss"

type Props = {
    title: string
    field: "alpha" | "elasticity" | "voltage"
    data: IAlpha[] | IElasticity[] | IVoltage[]
    materialId: string
}

export const Table: FC<Props> = ({ title, field, data, materialId }) => {
    return (
        <div className={classes.table}>
            <div className={classes["table-header"]}>
                <p className={classes.column}>Температура</p>
                <p className={classes.column}>{title}</p>
            </div>
            {data.map((d: any) => (
                <TableRow
                    key={d.id}
                    field={field}
                    materialId={materialId}
                    data={{ id: d.id, temperature: d.temperature, field: d[field] || 0 }}
                />
            ))}
            <NewTableRows field={field} materialId={materialId} />
        </div>
    )
}
