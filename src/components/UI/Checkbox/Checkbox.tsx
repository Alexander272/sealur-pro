import { FC } from "react"
import classes from "./checkbox.module.scss"

type Props = {
    id: string
    label?: string
    name: string
    checked?: boolean
    onChange?: any
}

export const Checkbox: FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = ({
    label,
    id,
    name,
    checked,
    onChange,
    ...attr
}) => {
    return (
        <div className={`${classes.field}`}>
            <input
                className={`${classes.input}`}
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                type='checkbox'
                {...attr}
            />

            <label className={classes.label} htmlFor={id}>
                <span>
                    <svg width='12px' height='10px'>
                        <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
                    </svg>
                </span>
                {label && <span>{label}</span>}
            </label>
        </div>
    )
}
