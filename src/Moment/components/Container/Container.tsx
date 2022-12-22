import React, { FC } from "react"
import classes from "./container.module.scss"

type Props = {
    title?: string
}

export const Container: FC<Props> = ({ title, children }) => {
    return (
        <div className={classes.container}>
            {title && <h5 className={classes.title}>{title}</h5>}
            {children}
        </div>
    )
}
