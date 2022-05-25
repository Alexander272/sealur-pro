import { FC } from "react"
import { Size } from "./components/Size/Size"
import { Type } from "./components/Type/Type"
import classes from "../../survey.module.scss"

type Props = {}

export const Construction: FC<Props> = () => {
    return (
        <div className={`${classes.container} ${classes.block2}`}>
            <Type />
            <Size />
        </div>
    )
}
