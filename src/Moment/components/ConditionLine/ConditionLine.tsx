import React, { FC } from "react"
import classes from "./line.module.scss"

type Props = {
    title?: string
    imgUrl: string
    result: JSX.Element
    formula?: {
        designation?: JSX.Element
        value: string | undefined
    }
}

export const ConditionLine: FC<Props> = ({ title, imgUrl, result, formula }) => {
    return (
        <div className={classes.container}>
            {title && <p className={classes.title}>{title}</p>}
            {formula?.value &&
                (formula.designation ? (
                    <p className={classes.formula}>
                        {formula.designation}={formula.value}
                    </p>
                ) : (
                    <p className={classes.formula}>{formula.value}</p>
                ))}
            {/* <div className={classes.result}> */}
            <img src={imgUrl} className={classes.image} loading='lazy' alt='' />
            <p className={classes.result}>{result}</p>
            {/* </div> */}
        </div>
    )
}
