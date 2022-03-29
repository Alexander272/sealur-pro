import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { Loader } from "../../../components/UI/Loader/Loader"
import { SignInForm } from "../../components/AuthForms/SignInForm"
import { SignUpForm } from "../../components/AuthForms/SignUpForm"
// import { RootState } from "../../../SealurPro/store/store"
import classes from "./auth.module.scss"

export default function Auth() {
    const [isSignIn, setIsSignIn] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    // const loading = useSelector((state: RootState) => state.user.loading)
    // const token = useSelector((state: RootState) => state.user.token.accessToken)

    const from: string = (location.state as any)?.from?.pathname || "/"

    // useEffect(() => {
    //     if (token !== "") {
    //         navigate(from, { replace: true })
    //     }
    // }, [token, navigate, from])

    const changeTabHandler = (value: boolean) => () => {
        setIsSignIn(value)
    }

    return (
        <div className={classes.page}>
            <div className={`${classes.container} ${!isSignIn ? classes.signup : ""}`}>
                {/* {loading && <Loader background='fill' />} */}
                <SignInForm onChangeTab={changeTabHandler(true)} isOpen={isSignIn} />
                <SignUpForm onChangeTab={changeTabHandler(false)} isOpen={!isSignIn} />
            </div>
        </div>
    )
}
