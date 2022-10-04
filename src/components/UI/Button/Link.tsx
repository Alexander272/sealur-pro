import { Link } from "react-router-dom"
import classes from "./button.module.scss"

type Props = {
    children?: React.ReactNode
    to: string
    fullWidth?: boolean
    variant?: "primary" | "danger" | "ghost" | "grayPrimary" | "grayDanger"
    size?: "small" | "middle" | "large"
    rounded?: "none" | "low" | "medium" | "high" | "round"
}

const MyLink = ({
    children,
    to,
    variant = "primary",
    fullWidth,
    size = "middle",
    rounded = "medium",
    ...attr
}: Props & React.ButtonHTMLAttributes<any>) => {
    return (
        <Link
            to={to}
            className={[
                classes.link,
                fullWidth ? classes.full : null,
                classes[variant],
                classes[size],
                classes[rounded],
            ].join(" ")}
            {...attr}
        >
            {children}
        </Link>
    )
}

export { MyLink }
