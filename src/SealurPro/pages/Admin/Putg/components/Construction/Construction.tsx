import { FC } from "react"
import { Graphite } from "./components/Graphite/Graphite"
import { Temperature } from "./components/Temperature/Temperature"
import { Design } from "./components/Design/Design"
import { Obturator } from "./components/Obturator/Obturator"
import classes from "../../../pages.module.scss"

type Props = {}

export const Construction: FC<Props> = () => {
    return (
        <div className={classes.line}>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Степень чистоты графитовой составляющей</p>
                <Graphite />
            </div>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Температура эксплуатации</p>
                <Temperature />
            </div>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Тип прокладки</p>
                <Design />
            </div>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Тип конструкции</p>
                <Obturator />
            </div>
        </div>
    )
}
