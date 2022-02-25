import { FC } from "react"
import classes from "./list.module.scss"

type Props = {
    onClick?: () => {}
}

export const Item: FC<Props> = ({ children, onClick }) => {
    return (
        <p className={classes.item} onClick={onClick}>
            {children}
        </p>
    )
}
