import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import Services from "../Services/Services"
import { Users } from "./components/Users/Users"
import classes from "./home.module.scss"

export default function Home() {
    const roles = useSelector((state: RootState) => state.user.roles)

    return (
        <div className={classes.home}>
            {/* //TODO надо бы наверно пользователей куда-нибудь на отдельную страницу вынести */}
            {roles.some(r => r.service === "sealur" && r.role === "superuser") && <Users />}

            {/* //TODO после согласования того что будет на главной странице надо будет использовать компонент, а не страницу */}
            <Services />
        </div>
    )
}
