import React, { Children, cloneElement, FC, PropsWithChildren, useState } from "react"
import classes from "./tabs.module.scss"

type Props = {
    type?: "nav" | "div"
    size?: "small" | "middle" | "large"
    onClick?: (event: React.MouseEvent) => void
}

export const Tabs: FC<PropsWithChildren<Props>> = ({ children, type, onClick }) => {
    const [substrate, setSubstrate] = useState({ width: 102, position: 0 })

    const clickHandler = (event: React.MouseEvent<any>) => {
        setSubstrate({
            width: (event.target as HTMLAnchorElement).offsetWidth,
            position: (event.target as HTMLAnchorElement).offsetLeft,
        })

        onClick && onClick(event)
    }

    const child = (
        <>
            <div
                className={classes.substrate}
                style={{ width: substrate.width, left: substrate.position }}
            ></div>
            {Children.map(children as React.ReactElement[], (child: React.ReactElement) =>
                cloneElement(child, { onClick: clickHandler })
            )}
        </>
    )

    if (type === "nav") return <nav className={classes.tabs}>{child}</nav>
    return <div className={classes.tabs}>{child}</div>
}
