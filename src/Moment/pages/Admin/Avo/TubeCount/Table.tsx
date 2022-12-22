import React, { FC } from "react"
import { ITubeCount } from "../../../../types/device"
import { Table } from "../../components/Table/Table"
import { NewRow } from "./NewRow"
import { Row } from "./Row"
import classes from "../avo.module.scss"

type Props = {
    data: ITubeCount[]
}

export const TableContainer: FC<Props> = ({ data }) => {
    return (
        <div className={classes["content-data"]}>
            <Table>
                <div className={classes.table}>
                    <Table.Head stickyHeader>
                        <Table.Row>
                            <Table.Ceil>
                                <p className={classes.thead}>Значение</p>
                            </Table.Ceil>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {data.map(d => (
                            <Row key={d.id} data={d} />
                        ))}
                    </Table.Body>
                </div>
            </Table>
            <NewRow />
        </div>
    )
}
