import React, { FC, useState } from "react"
import { IIp } from "../../../../../types/ip"
import classes from "./users.module.scss"

type Props = {
    ips: IIp[]
}

export const Ips: FC<Props> = ({ ips }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openHandler = () => setIsOpen(prev => !prev)

    return (
        <>
            <p className={classes.ip_open} onClick={openHandler}>
                последние IP{" "}
                <span className={[classes.icon, isOpen ? classes.rotate : ""].join(" ")}>
                    &#9660;
                </span>
            </p>
            <div className={[classes.ips, !isOpen ? classes.close : ""].join(" ")}>
                {ips.map(i => (
                    <p key={i.date} className={classes.ip}>
                        <span>Дата: {i.date}</span>
                        <span>Ip: {i.ip}</span>
                    </p>
                ))}
            </div>
        </>
    )
}
