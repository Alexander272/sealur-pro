import { ChangeEvent, FC, useState } from "react"
import { Button } from "../../../components/UI/Button/Button"
import { Input } from "../../../components/UI/Input/Input"
import classes from "./result.module.scss"

type Props = {
    description: string
    designation: string
    className?: string
    defaultValue?: string
    addDesignation?: (count: string, designation: string, description: string) => void
}

export const ResultBlock: FC<Props> = ({
    className,
    description,
    designation,
    defaultValue,
    addDesignation,
}) => {
    const [count, setCount] = useState(defaultValue || "1")

    const changeCountHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCount(event.target.value)
    }

    const addDesignationHandler = () => {
        addDesignation && addDesignation(count, designation, description)
    }

    return (
        <div className={className}>
            <p className={classes.description}>
                <span className={classes.bold}>Описание:</span> {description}
            </p>
            <p className={classes.designation}>
                <span className={classes.bold}>Обозначение:</span> {designation}
            </p>
            <div className={classes.result}>
                <Input
                    id='count'
                    name='count'
                    label='Количество:'
                    orentation='horizontal'
                    type='number'
                    min={1}
                    value={count}
                    onChange={changeCountHandler}
                />

                <Button size='smallMiddle' onClick={addDesignationHandler}>
                    Добавить в список
                </Button>
            </div>
        </div>
    )
}
