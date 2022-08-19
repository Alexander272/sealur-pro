import React, { FC } from "react"
import { IEnvData, IEnvType } from "../../../../types/env"
import { IGasket } from "../../../../types/flange"
import { EnvTableRow } from "./EnvTableRow"
import classes from "../gasket.module.scss"

type Props = {
    envData: IEnvData[] | undefined
    types: IEnvType[] | undefined
    gasket: IGasket | null
}

const style = { gridTemplateColumns: `repeat(3, 1fr)` }

export const EnvTable: FC<Props> = ({ envData, types, gasket }) => {
    if (!types) return null

    return (
        <div className={`${classes["content-table"]} ${classes["content-data"]}`}>
            <div className={classes["content-table__header"]} style={style}>
                <p className={classes["content-table__column"]}>
                    Удельное давление обжатия прокладки
                </p>
                <p className={classes["content-table__column"]}>Прокладочный коэффициент</p>
                <p className={classes["content-table__column"]}>Уплотняемая среда</p>
            </div>
            <div className={classes["content-table__body"]}>
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
                            style={style}
                            gasketId={gasket?.id || ""}
                            type={t}
                            isEnvData={!!envData}
                            data={data}
                        />
                    )
                })}
            </div>
        </div>
    )
}
