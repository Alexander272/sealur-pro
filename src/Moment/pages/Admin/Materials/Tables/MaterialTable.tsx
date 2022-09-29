import React, { FC } from "react"
import { IAlpha, IElasticity, IVoltage } from "../../../../types/materials"
import { Table } from "../../components/Table/Table"
import { MaterialRow } from "./MaterialRow"
import { MaterialNewRow } from "./MaterialNewRow"
import classes from "../materials.module.scss"

type Props = {
    title: string
    field: "alpha" | "elasticity" | "voltage"
    data: IAlpha[] | IElasticity[] | IVoltage[]
    materialId: string
}

export const MaterialTable: FC<Props> = ({ title, field, data, materialId }) => {
    return (
        <div className={classes.table}>
            <Table>
                <div className={classes["material-table"]}>
                    <Table.Head stickyHeader>
                        <Table.Row>
                            <Table.Ceil>
                                <p className={classes.thead}>Температура</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>{title}</p>
                            </Table.Ceil>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {data.map((d: any) => (
                            <MaterialRow
                                key={d.id}
                                field={field}
                                materialId={materialId}
                                data={{
                                    id: d.id,
                                    temperature: d.temperature,
                                    field: d[field] || 0,
                                }}
                            />
                        ))}
                    </Table.Body>
                </div>
            </Table>
            <MaterialNewRow field={field} materialId={materialId} />
        </div>
    )
}
