import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { IResDevCooling } from "../../types/res_devCooling"
import { IDetail, IPersonData } from "../../types/flange"
import { Button } from "../../../components/UI/Button/Button"
import { ResultData } from "./Result/Result"
import classes from "../styles/page.module.scss"

export default function Result() {
    const location = useLocation()
    const navigate = useNavigate()

    const result = (location.state as { result: IResDevCooling })?.result
    const person = (location.state as { person: IPersonData })?.person
    const detail = (location.state as { detail: IDetail })?.detail

    console.log(result)

    useEffect(() => {
        if (!result) navigate(-1)
    }, [navigate, result])

    const goBackHandler = () => {
        navigate(-1)
    }

    console.log(result)

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

            {result && <ResultData result={result} />}

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
