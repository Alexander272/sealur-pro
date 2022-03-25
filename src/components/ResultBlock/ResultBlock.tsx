import React, { FC } from "react"
import { UseFormRegister } from "react-hook-form"
import { Button } from "../UI/Button/Button"
import { Input } from "../UI/Input/Input"
import classes from "./result.module.scss"

type Props = {
    description: string
    designation: string
    className?: string
    value?: string
    changeCount?: (event: React.ChangeEvent<HTMLInputElement>) => void
    register?: UseFormRegister<any>
    addDesignation?: () => void
}

export const ResultBlock: FC<Props> = ({
    className,
    description,
    designation,
    value,
    changeCount,
    addDesignation,
    register,
}) => {
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
                    defaultValue={1}
                    min={1}
                    value={value}
                    onChange={changeCount}
                    register={register}
                />

                <Button size='smallMiddle' onClick={addDesignation}>
                    Добавить в список
                </Button>
            </div>
        </div>
    )
}
