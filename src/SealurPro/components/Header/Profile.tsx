import { FC } from "react"
import { Link } from "react-router-dom"
import { OrderUrl, ProfileUrl } from "../../../components/routes"
import { store } from "../../../store/store"
import classes from "./header.module.scss"

type Props = {}

export const Profile: FC<Props> = () => {
    const dispatch = store.dispatch.user

    const logoutHandler = async () => {
        await dispatch.singOut()
    }

    return (
        <div className={classes.profile}>
            <img src='/image/person-profile.svg' alt='profile' />
            <div className={classes.items}>
                <Link to={ProfileUrl} className={classes.item}>
                    Профиль
                </Link>
                <Link to={OrderUrl} className={classes.item}>
                    Заказы
                </Link>
                <p className={classes.item} onClick={logoutHandler}>
                    Выйти
                </p>
            </div>
        </div>
    )
}
