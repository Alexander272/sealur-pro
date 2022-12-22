import React, { FC } from "react"
import classes from "./table.module.scss"

type Props = {}

export const Body: FC<Props> = ({ children }) => {
    return <div className={classes["table-body"]}>{children}</div>
}
