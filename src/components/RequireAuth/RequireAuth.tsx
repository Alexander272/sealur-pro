import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { RootState } from "../../store/store"

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const isAuth = useSelector((state: RootState) => state.user.isAuth)
    const roles = useSelector((state: RootState) => state.user.roles)
    const location = useLocation()

    if (location.pathname.includes("pro") && isAuth) {
        const isAccess = roles.some(r => r.service === "pro")
        if (!isAccess) return <Navigate to='/' state={{ from: location }} />
    }
    if (location.pathname.includes("moment") && isAuth) {
        const isAccess = roles.some(r => r.service === "moment")
        if (!isAccess) return <Navigate to='/' state={{ from: location }} />
    }

    if (!isAuth) return <Navigate to='/auth' state={{ from: location }} />

    return children
}
