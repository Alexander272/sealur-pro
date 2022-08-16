import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../../../../components/UI/Button/Button"
import { Dispatch, RootState } from "../../../../../store/store"
import classes from "./services.module.scss"

const servicesData = {
    pro: {
        title: "Sealur Pro",
        description: "Сервис для подбора и формирования заказа СНП, ПУТГ, ПУТГм.",
    },
    moment: {
        title: "Расчет момента затяжки",
    },
}

type Props = {}

export const Services: FC<Props> = () => {
    const roles = useSelector((state: RootState) => state.user.roles)
    const navigate = useNavigate()
    const { user } = useDispatch<Dispatch>()

    const logoutHandler = async () => {
        await user.singOut()
        navigate("/auth")
    }
    // if (!roles.length) return null

    return (
        <div className={classes.services}>
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
            <div className={classes.btn}>
                <Button onClick={logoutHandler} variant='grayPrimary' fullWidth>
                    Выйти
                </Button>
            </div>
        </div>
    )
}
