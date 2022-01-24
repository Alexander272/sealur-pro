import { UseFormRegister } from "react-hook-form"
import classes from "./input.module.scss"

type Props = {
    id?: string
    label?: string
    name: string
    value?: string
    orentation?: "horizontal" | "vertical"
    rounded?: "round" | "rounded"
    onChange?: any
    suffix?: string
    register?: UseFormRegister<any>
    rule?: Partial<any>
    error?: any
    errorText?: string
}

export const Input = ({
    id,
    label,
    name,
    value,
    orentation,
    rounded,
    onChange,
    suffix,
    register,
    rule,
    error,
    errorText,
    ...attr
}: Props & React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className={`${classes.field} ${classes[orentation || "vertical"]}`}>
            {label && (
                <label className={classes.label} htmlFor={id}>
                    {label}
                </label>
            )}

            {suffix && <p className={classes.inputSuffix}>{suffix}</p>}
            {register ? (
                <input
                    className={`${classes.input} ${error ? classes.invalid : ""} ${
                        classes[rounded || "rounded"]
                    }`}
                    id={id}
                    {...attr}
                    {...register(name, rule)}
                />
            ) : (
                <input
                    className={`${classes.input} ${classes[rounded || "rounded"]}`}
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
