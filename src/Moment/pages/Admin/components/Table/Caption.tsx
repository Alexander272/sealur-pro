import React, { FC } from "react"
import classes from "./table.module.scss"

type Props = {
    placement?: "top" | "bottom"
}

export const Caption: FC<Props> = ({ children, placement = "top" }) => {
    return (
        <div className={`${classes["table-caption"]} ${classes[`table-caption--${placement}`]}`}>
            {children}
        </div>
    )
}
