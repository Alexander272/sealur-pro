import React, { FC } from "react"
import { IFullSize } from "../../../../../types/sizes"
import { IBolt } from "../../../../../types/bolts"
import { Table } from "../../../components/Table/Table"
import { SizeRow } from "./SizeRow"
import { SizeNewRow } from "./SizeNewRow"
import classes from "../../standarts.module.scss"

type Props = {
    sizes: IFullSize[] | undefined
    bolts: IBolt[]
    standartId: string
    row: 0 | 1
    isInch: boolean
}

export const SizeTable: FC<Props> = ({ sizes, bolts, standartId, row, isInch }) => {
    return (
        <div className={classes.table}>
            <Table height={450} width={isInch ? 1400 : "auto"}>
                <div className={classes["sizes-table"]}>
                    <Table.Head stickyHeader>
                        <Table.Row>
                            <Table.Ceil>
                                <p className={classes.thead}>Pn</p>
                            </Table.Ceil>
                            {isInch && (
                                <>
                                    <Table.Ceil>
                                        <p className={classes.thead}>Dn</p>
                                    </Table.Ceil>
                                    <Table.Ceil>
                                        <p className={classes.thead}>D, мм</p>
                                    </Table.Ceil>
                                </>
                            )}
                            <Table.Ceil>
                                <p className={classes.thead}>
                                    D<sub>н</sub>
                                </p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>D</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>
                                    D<sub>б</sub>
                                </p>
                            </Table.Ceil>
                            {isInch && (
                                <>
                                    <Table.Ceil>
                                        <p className={classes.thead}>Диаметр ступицы, Х</p>
                                    </Table.Ceil>
                                    <Table.Ceil>
                                        <p className={classes.thead}>Диаметр ступицы. Сверху, А</p>
                                    </Table.Ceil>
                                </>
                            )}
                            <Table.Ceil>
                                <p className={classes.thead}>h</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>l</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>
                                    S<sub>0</sub>
                                </p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>
                                    S<sub>1</sub>
                                </p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>количество</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>диаметр</p>
                            </Table.Ceil>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {sizes?.map(s => (
                            <SizeRow
                                key={s.id}
                                size={s}
                                bolts={bolts}
                                standartId={standartId}
                                row={row}
                                isInch={isInch}
                            />
                        ))}
                    </Table.Body>
                </div>
            </Table>

            <SizeNewRow bolts={bolts} standartId={standartId} row={row} isInch={isInch} />
        </div>
    )
}
