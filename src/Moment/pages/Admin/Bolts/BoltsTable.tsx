import React, { FC } from "react"
import { IBolt } from "../../../types/bolts"
import { Table } from "../components/Table/Table"
import classes from "./bolts.module.scss"
import { BoltsNewRows } from "./BoltsNewRows"
import { BoltsRow } from "./BoltsRow"

type Props = {
    title: string
    bolts: IBolt[] | undefined
    isInch: boolean
}

export const BoltsTable: FC<Props> = ({ title, bolts, isInch }) => {
    return (
        <div className={classes.table}>
            <Table height={600}>
                <Table.Caption>{title}</Table.Caption>
                <div className={classes["bolt-table"]}>
                    <Table.Head stickyHeader>
                        <Table.Row>
                            <Table.Ceil>
                                <p className={classes.thead}>Название</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>Диаметр</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>Площадь</p>
                            </Table.Ceil>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {bolts && bolts.map(b => <BoltsRow key={b.id} bolt={b} isInch={isInch} />)}
                    </Table.Body>
                </div>
            </Table>
            <BoltsNewRows isInch={isInch} />
        </div>
    )
}
