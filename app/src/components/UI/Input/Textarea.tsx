import React from "react"
import classes from "./input.module.scss"

type Props = {
    id?: string
    label?: string
    name: string
    value?: string
    onChange?: any
}

export const Textarea = ({
    id,
    label,
    name,
    value,
    onChange,
    ...attr
}: Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <div className={`${classes.field} `}>
            {label && (
                <label className={classes.label} htmlFor={id}>
                    {label}
                </label>
            )}
            <textarea
                className={`${classes.input} ${classes.rounded} ${classes.textarea} scroll`}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                {...attr}
            />
        </div>
    )
}
