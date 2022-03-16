import { FC, PropsWithChildren } from "react"
import classes from "./modal.module.scss"

type Props = {
    title?: string
    onClose?: () => void
}

export const Header: FC<PropsWithChildren<Props>> = ({ title, onClose, children }) => {
    return (
        <header className={classes.header}>
            <div className={classes.header__container}>
                {title && <h4 className={classes.header__title}>{title}</h4>}
                {onClose && (
                    <p className={classes.header__close} onClick={onClose}>
                        &times;
                    </p>
                )}
            </div>
            {children}
        </header>
    )
}
