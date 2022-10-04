import React from "react"
import { UseFormRegister } from "react-hook-form"
import classes from "./input.module.scss"

type Props = {
    id?: string
    label?: string
    name: string
    value?: string
    onChange?: any
    orentation?: "horizontal" | "vertical"
    register?: UseFormRegister<any>
    rule?: Partial<any>
    error?: any
    errorText?: string
}

export const Textarea = ({
    id,
    label,
    name,
    value,
    onChange,
    orentation = "vertical",
    register,
    rule,
    error,
    errorText,
    ...attr
}: Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <div className={`${classes.field} ${classes[orentation]}`}>
            {label && (
                <label className={classes.label} htmlFor={id}>
                    {label}
                </label>
            )}
            {register ? (
                <textarea
                    className={`${classes.input} ${classes.rounded} ${classes.textarea} scroll`}
                    id={id}
                    {...register(name, rule)}
                    {...attr}
                />
            ) : (
                <textarea
                    className={`${classes.input} ${classes.rounded} ${classes.textarea} scroll`}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    {...attr}
                />
            )}
            {error && <p className={classes.error}>{errorText}</p>}
        </div>
    )
}
