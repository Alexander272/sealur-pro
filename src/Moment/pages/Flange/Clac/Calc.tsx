import { FC } from "react"
import { Button } from "../../../../components/UI/Button/Button"
import classes from "../../styles/page.module.scss"

type Props = {
    //TODO добавить тип
    result: any
    clearResult: () => void
}

export const Calc: FC<Props> = ({ result, clearResult }) => {
    return (
        <div className={classes.form}>
            <pre>{JSON.stringify(result, null, 2)}</pre>
            <div className={classes["form-button"]}>
                <Button fullWidth onClick={clearResult}>
                    Новый расчет
                </Button>
            </div>
        </div>
    )
}
