import React, { FC } from "react"
import { Button } from "../UI/Button/Button"
import { Input } from "../UI/Input/Input"
import classes from "./result.module.scss"

type Props = {
    description: string
    designation: string
    className?: string
    value?: string
    changeCount?: (event: React.ChangeEvent<HTMLInputElement>) => void
    addDesignation?: () => void
}

export const ResultBlock: FC<Props> = ({
    className,
    description,
    designation,
    value,
    changeCount,
    addDesignation,
}) => {
    return (
        <div className={className}>
            <p className={classes.description}>
                <span className={classes.bold}>Описание:</span> {description}
            </p>
            <div className={classes.result}>
                <p>
                    <span className={classes.bold}>Обозначение:</span> {designation}
                </p>
                <Input
                    name='count'
                    label='Количество:'
                    orentation='horizontal'
                    type='number'
                    defaultValue={1}
                    min={1}
                    value={value}
                    onChange={changeCount}
                />

                <Button size='smallMiddle' onClick={addDesignation}>
                    Добавить в список
                </Button>
            </div>
        </div>
    )
}
