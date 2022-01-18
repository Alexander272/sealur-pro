import classes from "./input.module.scss"

type Props = {
    id?: string
    label?: string
    name: string
    value?: string
    orentation?: "horizontal" | "vertical"
    inputType?: "round" | "rounded"
    onChange?: any
}

export const Input = ({
    id,
    label,
    name,
    value,
    orentation,
    inputType,
    onChange,
    ...attr
}: Props & React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className={`${classes.field} ${classes[orentation || "vertical"]}`}>
            {label && (
                <label className={classes.label} htmlFor={id}>
                    {label}
                </label>
            )}

            <input
                className={`${classes.input} ${classes[inputType || "rounded"]}`}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                {...attr}
            />
        </div>
    )
}
