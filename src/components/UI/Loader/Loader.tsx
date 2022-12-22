import { FC } from "react"
import classes from "./loader.module.scss"

type Props = {
    size?: "small" | "middle" | "large"
    background?: "none" | "fill"
    isFull?: boolean
}

export const Loader: FC<Props> = ({ size, background = "none", isFull }) => {
    return (
        <div
            className={`${classes.container} ${classes[background]} ${isFull ? classes.full : ""}`}
        >
            <div className={`${classes.loader} ${size ? classes[size] : ""}`}></div>
        </div>
    )
}
