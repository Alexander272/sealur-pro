import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ProfileUrl } from "../../../components/routes"
import { store } from "../../../store/store"
import classes from "./header.module.scss"

type Props = {}

export const Profile: FC<Props> = () => {
    const dispatch = store.dispatch.user
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await dispatch.singOut()
        navigate("/auth")
    }

    return (
        <div className={classes.profile}>
            <img src='/image/person-profile.svg' alt='profile' width='40' height='40' />
            <div className={classes.items}>
                <Link to={ProfileUrl} className={classes.item}>
                    Профиль
                </Link>
                <p className={classes.item} onClick={logoutHandler}>
                    Выйти
                </p>
            </div>
        </div>
    )
}
