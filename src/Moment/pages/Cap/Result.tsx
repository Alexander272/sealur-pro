import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../../components/UI/Button/Button"
import { MomentUrl } from "../../../components/routes"
import { IResFlange } from "../../types/res_flange"
import { IDetail, IPersonData } from "../../types/flange"
import classes from "../styles/page.module.scss"

export default function Result() {
    const location = useLocation()
    const navigate = useNavigate()

    const result = (location.state as { result: IResFlange })?.result
    const person = (location.state as { person: IPersonData })?.person
    const detail = (location.state as { detail: IDetail })?.detail

    console.log(result)

    useEffect(() => {
        if (!result) navigate(MomentUrl + "/cap")
    }, [navigate, result])

    const goBackHandler = () => {
        navigate(-1)
    }

    return (
        <div className={classes.form}>
            {detail && (
                <div className={classes.detail}>
                    <p>{detail.organization}</p>
                    <p>{detail.facility}</p>
                    <p>{detail.equipment}</p>
                    <p>{detail.node}</p>
                </div>
            )}

            {/* {result && <Calc result={result} />} */}

            {person && (
                <div>
                    <p>Расчет выполнил</p>
                    <p className={classes.performer}>
                        <span>{person.performer.position}</span>{" "}
                        <span>{person.performer.name}</span>
                    </p>
                </div>
            )}

            <div className={classes["form-button"]}>
                <Button fullWidth onClick={goBackHandler}>
                    Новый расчет
                </Button>
            </div>
        </div>
    )
}
