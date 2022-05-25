import { FC } from "react"
import { Heat } from "./components/Heat/Heat"
import { Medium } from "./components/Medium/Medium"
import { Temp } from "./components/Temp/Temp"
import classes from "../../survey.module.scss"

type Props = {}

export const Condition: FC<Props> = () => {
    return (
        <div className={`${classes.container} ${classes.block3}`}>
            <p className={classes.title}>Условия эксплуатации</p>
            <div className={classes.inline}>
                <Temp />
                <Heat />
            </div>

            <Medium />
        </div>
    )
}
