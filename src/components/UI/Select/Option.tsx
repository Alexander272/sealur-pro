import { FC, PropsWithChildren } from "react"
import classes from "./select.module.scss"

type Props = {
    value: any
    disabled?: boolean
    className?: string
    onClick?: () => void
}

export const Option: FC<PropsWithChildren<Props>> = ({
    children,
    disabled,
    onClick,
    className,
}) => {
    return (
        <p
            className={`${classes.option} ${disabled ? classes.disabled : ""} ${className}`}
            onClick={onClick}
        >
            {children}
        </p>
    )
}
