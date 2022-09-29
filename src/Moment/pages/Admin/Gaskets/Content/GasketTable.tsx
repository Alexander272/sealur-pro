import React, { FC } from "react"
import { IGasketData } from "../../../../types/gasket"
import { Table } from "../../components/Table/Table"
import { GasketRow } from "./GasketRow"
import { GasketNewRows } from "./GasketNewRows"
import classes from "../gasket.module.scss"

type Props = {
    data: IGasketData[]
    gasketId: string
    typeId: string
}

export const GasketTable: FC<Props> = ({ data, gasketId, typeId }) => {
    return (
        <div className={classes["content-data"]}>
            <Table>
                <div className={classes["content-table"]}>
                    <Table.Head stickyHeader>
                        <Table.Row>
                            <Table.Ceil>
                                <p className={classes.thead}>Коэффициент обжатия</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>Условный модуль сжатия прокладки</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>Допускаемое удельное давление</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>Толщина прокладки</p>
                            </Table.Ceil>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {data.map(d => (
                            <GasketRow key={d.id} data={d} gasketId={gasketId} typeId={typeId} />
                        ))}
                    </Table.Body>
                </div>
            </Table>
            <GasketNewRows gasketId={gasketId} typeId={typeId} />
        </div>
    )
}
