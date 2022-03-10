import { FC } from "react"
import { ISize } from "../../types/size"
import classes from "./table.module.scss"

type Props = {
    data: ISize[]
}

const tableName = ["Dn", "Pn", "Тип прокладки", "D4", "D3", "D2", "D1", "h", "S2", "S3"]

export const SizeTable: FC<Props> = ({ data }) => {
    const clickHandler = (id: string) => () => {
        console.log(id)
    }

    return (
        <div className={classes.table}>
            <div className={classes.row}>
                {tableName.map(h => (
                    <p key={h} className={classes.th}>
                        {h}
                    </p>
                ))}
            </div>
            <div className={`${classes.body} scroll`}>
                {data.map(d => (
                    <div
                        className={`${classes.row} ${classes.tr}`}
                        key={d.id}
                        onClick={clickHandler(d.id)}
                    >
                        <p className={classes.td}>{d.dn}</p>
                        <p className={classes.td}>{d.pn}</p>
                        <p className={classes.td}>{d.typePr}</p>
                        <p className={classes.td}>{d.d4}</p>
                        <p className={classes.td}>{d.d3}</p>
                        <p className={classes.td}>{d.d2}</p>
                        <p className={classes.td}>{d.d1}</p>
                        <p className={classes.td}>{d.h}</p>
                        <p className={classes.td}>{d.s2}</p>
                        <p className={classes.td}>{d.s3}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
