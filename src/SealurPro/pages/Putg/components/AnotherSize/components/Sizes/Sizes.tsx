import { FC } from "react"
import classes from "./sizes.module.scss"

type Props = {
    type: "dimen" | "field"
    d1: string
    d2: string
    d3: string
    d4: string
}

export const Sizes: FC<Props> = ({ type, d4, d3, d2, d1 }) => {
    return (
        <>
            <p className={`${classes.sizes} ${classes[type]} ${classes.d1}`}>{d1}</p>
            <p className={`${classes.sizes} ${classes[type]} ${classes.d2}`}>{d2}</p>
            <p className={`${classes.sizes} ${classes[type]} ${classes.d3}`}>{d3}</p>
            <p className={`${classes.sizes} ${classes[type]} ${classes.d4}`}>{d4}</p>
        </>
    )
}
