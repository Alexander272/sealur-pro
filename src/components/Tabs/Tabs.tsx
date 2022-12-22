import React, { Children, cloneElement, FC, PropsWithChildren, useEffect, useState } from "react"
import classes from "./tabs.module.scss"

type Props = {
    type?: "nav" | "div"
    size?: "small" | "middle" | "large"
    initWidth: number
    initPos?: number
    disabled?: boolean
    onClick?: (type: string, idx: number, event: React.MouseEvent) => void
}

export const Tabs: FC<PropsWithChildren<Props>> = ({
    children,
    initWidth,
    initPos,
    type,
    disabled,
    onClick,
}) => {
    const [substrate, setSubstrate] = useState({ width: initWidth, position: initPos || 0 })

    useEffect(() => {
        setSubstrate({ width: initWidth, position: initPos || 0 })
    }, [initWidth, initPos])

    const clickHandler = (idx: number, type: string) => (event: React.MouseEvent<any>) => {
        if (!disabled) {
            setSubstrate({
                width: (event.target as HTMLAnchorElement).offsetWidth,
                position: (event.target as HTMLAnchorElement).offsetLeft,
            })

            onClick && onClick(type, idx, event)
        }
    }

    const child = (
        <>
            <div
                className={classes.substrate}
                style={{ width: substrate.width, left: substrate.position }}
            ></div>
            {Children.map(children as React.ReactElement[], (child: React.ReactElement) =>
                cloneElement(child, {
                    onClick: clickHandler(child.props["data-index"], child.props["data-type"]),
                    className: [child.props.className, disabled ? classes.disabled : ""].join(" "),
                })
            )}
        </>
    )

    if (type === "nav") return <nav className={classes.tabs}>{child}</nav>
    return <div className={classes.tabs}>{child}</div>
}
