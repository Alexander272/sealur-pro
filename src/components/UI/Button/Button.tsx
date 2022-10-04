import classes from "./button.module.scss"
import { MyLink } from "./Link"

type Props = {
    children?: React.ReactNode
    onClick?: (event: React.MouseEvent) => void
    fullWidth?: boolean
    variant?: "primary" | "danger" | "ghost" | "grayPrimary" | "grayDanger"
    size?: "small" | "smallMiddle" | "middle" | "large"
    rounded?: "none" | "low" | "medium" | "high" | "round"
}

const Button = ({
    children,
    onClick,
    variant = "primary",
    fullWidth,
    size = "middle",
    rounded = "medium",
    ...attr
}: Props & React.ButtonHTMLAttributes<any>) => {
    return (
        <button
            onClick={onClick}
            className={[
                classes.button,
                fullWidth ? classes.full : null,
                classes[variant],
                classes[size],
                classes[rounded],
            ].join(" ")}
            {...attr}
        >
            {children}
        </button>
    )
}

Button.Link = MyLink

export { Button }
