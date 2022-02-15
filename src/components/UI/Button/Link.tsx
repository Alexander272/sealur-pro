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
    variant,
    fullWidth,
    size,
    rounded,
    ...attr
}: Props & React.ButtonHTMLAttributes<any>) => {
    return (
        <Link
            to={to}
            className={[
                classes.link,
                fullWidth ? classes.full : null,
                classes[variant || "primary"],
                classes[size || "middle"],
                classes[rounded || "medium"],
            ].join(" ")}
            {...attr}
        >
            {children}
        </Link>
    )
}

export { MyLink }
