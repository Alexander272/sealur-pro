import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { RootState } from "../../store/store"

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const isAuth = useSelector((state: RootState) => state.user.isAuth)
    const location = useLocation()

    if (!isAuth) return <Navigate to='/auth' state={{ from: location }} />

    return children
}
