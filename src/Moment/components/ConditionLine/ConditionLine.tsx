import React, { FC } from "react"
import classes from "./line.module.scss"

type Props = {
    title?: string
    imgUrl: string
    result: JSX.Element
}

export const ConditionLine: FC<Props> = ({ title, imgUrl, result }) => {
    return (
        <div className={classes.container}>
            {title && <p className={classes.title}>{title}</p>}
            {/* <div className={classes.result}> */}
            <img src={imgUrl} className={classes.image} alt='' />
            <p className={classes.result}>{result}</p>
            {/* </div> */}
        </div>
    )
}
