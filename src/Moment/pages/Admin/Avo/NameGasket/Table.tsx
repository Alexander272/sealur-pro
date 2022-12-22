import React, { FC } from "react"
import { INameGasket } from "../../../../types/device"
import { Table } from "../../components/Table/Table"
import { NewRow } from "./NewRow"
import { Row } from "./Row"
import classes from "../avo.module.scss"

type Props = {
    data: INameGasket[]
    finId: string
    presId: string
    numId: string
}

export const TableContainer: FC<Props> = ({ data, finId, presId, numId }) => {
    return (
        <div className={classes["content-data"]}>
            <Table>
                <div className={classes.table}>
                    <Table.Head stickyHeader>
                        <Table.Row>
                            <Table.Ceil>
                                <p className={classes.thead}>Тип прокладки</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>
                                    Размер прокладки в продольном направлении L2
                                </p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>
                                    Размер прокладки в поперечном направление B2
                                </p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>Ширина bp</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>h1</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>h2</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>h3</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>h4</p>
                            </Table.Ceil>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {data.map(d => (
                            <Row key={d.id} data={d} finId={finId} presId={presId} numId={numId} />
                        ))}
                    </Table.Body>
                </div>
            </Table>
            <NewRow finId={finId} presId={presId} numId={numId} />
        </div>
    )
}
