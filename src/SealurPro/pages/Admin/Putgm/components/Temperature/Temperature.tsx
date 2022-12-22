import { FC } from "react"
import { Graphite } from "./components/Graphite/Graphite"
import { Temperature as Temp } from "./components/Temperature/Temperature"
import { Modifier } from "./components/Modifier/Modifier"
import classes from "../../../pages.module.scss"

type Props = {}

export const Temperature: FC<Props> = () => {
    return (
        <>
            <div className={classes.line}>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Степень чистоты графитовой составляющей</p>
                    <Graphite />
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Температура эксплуатации</p>
                    <Temp />
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Модифицирующий элемент</p>
                    <Modifier />
                </div>
            </div>
        </>
    )
}
