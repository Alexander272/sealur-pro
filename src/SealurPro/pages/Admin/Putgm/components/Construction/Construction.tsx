import { FC } from "react"
import { Graphite } from "./components/Graphite/Graphite"
import { Design } from "./components/Design/Design"
import { Obturator } from "./components/Obturator/Obturator"
import { Drawing } from "./components/Drawing/Drawing"
import { Sealant } from "./components/Sealant/Sealant"
import classes from "../../../pages.module.scss"

type Props = {}

export const Construction: FC<Props> = () => {
    return (
        <>
            <div className={classes.line}>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Степень чистоты графитовой составляющей</p>
                    <Graphite />
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Тип основания</p>
                    <Design />
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Тип конструкции</p>
                    <Obturator />
                </div>
            </div>
            <div className={classes.line}>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Уплотнительный элемент</p>
                    <Sealant />
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Чертеж прокладки</p>
                    <Drawing />
                </div>
            </div>
        </>
    )
}
