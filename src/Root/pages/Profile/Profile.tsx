import { useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, RootState } from "../../../store/store"
import { Header } from "./components/Header/Header"
import { Profile } from "./components/Profile/Profile"
import { Services } from "./components/Services/Services"
import { Users } from "./components/Users/Users"
import classes from "./profile.module.scss"

export default function ProfilePage() {
    const userId = useSelector((state: RootState) => state.user.userId)
    const roles = useSelector((state: RootState) => state.user.roles)
    const { user } = useDispatch<Dispatch>()

    useLayoutEffect(() => {
        if (userId) user.getUser(userId)
    }, [userId, user])

    return (
        <div className={classes.page}>
            <Header />
            {roles.some(r => r.service === "sealur" && r.role === "superuser") && <Users />}
            <main className={classes.main}>
                {/* <Profile /> */}
                <Services />
            </main>
        </div>
    )
}
