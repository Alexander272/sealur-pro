import React, { FC } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../../../../store/store"
import { servicesData } from "../../../Services/Services"
import classes from "./services.module.scss"

type Props = {}

export const Services: FC<Props> = () => {
    const roles = useSelector((state: RootState) => state.user.roles)

    return (
        <div className={classes.services}>
            <h3 className={classes["main-title"]}>Сервисы</h3>
            {roles.map(r => {
                if (r.service === "sealur") return null
                return (
                    <div key={r.id} className={classes.item}>
                        <Link to={"/" + r.service} className={classes.title}>
                            {servicesData[r.service as "pro"].title}
                        </Link>
                        <p className={classes.description}>
                            {servicesData[r.service as "pro"].description}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
