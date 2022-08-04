import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../../components/UI/Button/Button"
import { MomentUrl } from "../../../components/routes"
import { IResFlange } from "../../types/res_flange"
import { Calc } from "./Calc/Calc"
import classes from "../styles/page.module.scss"

export default function Result() {
    const location = useLocation()
    const navigate = useNavigate()

    const result = (location.state as { result: IResFlange })?.result

    useEffect(() => {
        if (!result) navigate(MomentUrl + "/flange")
    }, [navigate, result])

    const goBackHandler = () => {
        navigate(-1)
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.form}>
                {result && <Calc result={result} />}

                <div className={classes["form-button"]}>
                    <Button fullWidth onClick={goBackHandler}>
                        Новый расчет
                    </Button>
                </div>
            </div>
        </div>
    )
}
