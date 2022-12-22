import React, { FC } from "react"
import { IEnvData, IEnvType } from "../../../../types/env"
import { IGasket } from "../../../../types/flange"
import { EnvTableRow } from "./EnvTableRow"
import classes from "../gasket.module.scss"
import { Table } from "../../components/Table/Table"

type Props = {
    envData: IEnvData[] | undefined
    types: IEnvType[] | undefined
    gasket: IGasket | null
}

export const EnvTable: FC<Props> = ({ envData, types, gasket }) => {
    if (!types) return null

    return (
        <div className={classes["content-data"]}>
            <Table>
                <div className={classes["content-table"]}>
                    <Table.Head stickyHeader>
                        <Table.Row>
                            <Table.Ceil>
                                <p className={classes.thead}>Удельное давление обжатия прокладки</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>Прокладочный коэффициент</p>
                            </Table.Ceil>
                            <Table.Ceil>
                                <p className={classes.thead}>Уплотняемая среда</p>
                            </Table.Ceil>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {/* //! похоже придется на два компонента поделить
                            сохранять одну строку нормально не получается если стейт общий,
                            если стейт разный на каждую строку, то не получится сохранять сразу все строки
                            (//? а может похер пусть по строке сохраняют?)
                        */}
                        {types.map(t => {
                            const data = envData ? envData.find(d => d.envId === t.id) : undefined
                            return (
                                <EnvTableRow
                                    key={t.id}
                                    gasketId={gasket?.id || ""}
                                    type={t}
                                    data={data}
                                />
                            )
                        })}
                    </Table.Body>
                </div>
            </Table>
        </div>
    )
}
