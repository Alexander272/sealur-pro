import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { Loader } from "../../../components/UI/Loader/Loader"
import { Dispatch, RootState } from "../../../store/store"
import { SignInForm } from "../../components/AuthForms/SignInForm"
import { SignUpForm } from "../../components/AuthForms/SignUpForm"
import classes from "./auth.module.scss"

export default function Auth() {
    const [isSignIn, setIsSignIn] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    const loading = useSelector((state: RootState) => state.user.loading)
    const isAuth = useSelector((state: RootState) => state.user.isAuth)

    const from: string = (location.state as any)?.from?.pathname || "/"

    const { user } = useDispatch<Dispatch>()

    useEffect(() => {
        if (isAuth) {
            navigate(from, { replace: true })
        }
    }, [isAuth, navigate, from])

    useLayoutEffect(() => {
        if (!isAuth) {
            user.refresh()
        }
    }, [isAuth, user])

    const changeTabHandler = (value: boolean) => () => {
        setIsSignIn(value)
    }

    return (
        <div className={classes.page}>
            <div className={`${classes.container} ${!isSignIn ? classes.signup : ""}`}>
                {loading && <Loader background='fill' />}
                <SignInForm onChangeTab={changeTabHandler(true)} isOpen={isSignIn} />
                <SignUpForm onChangeTab={changeTabHandler(false)} isOpen={!isSignIn} />
            </div>
        </div>
    )
}
