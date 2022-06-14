import { useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/UI/Button/Button"
import { Loader } from "../../../components/UI/Loader/Loader"
import ServerError from "../../../Error/ServerError"
import { Dispatch, ProState } from "../../store/store"
import { Addit } from "./components/Addit/Addit"
import { Condition } from "./components/Condition/Condition"
import { Construction } from "./components/Construction/Construction"
import { Info } from "./components/Info/Info"
import { Send } from "./components/Send"
import classes from "./survey.module.scss"

export default function Survey() {
    const navigate = useNavigate()

    const loading = useSelector((state: ProState) => state.survey.loading)
    const fetching = useSelector((state: ProState) => state.survey.fetching)
    const error = useSelector((state: ProState) => state.survey.error)

    const { survey } = useDispatch<Dispatch>()

    useLayoutEffect(() => {
        survey.getDefault()
    }, [survey])

    const backHandler = () => {
        navigate(-1)
    }

    if (loading) return <Loader />
    if (error) return <ServerError />

    return (
        <div className={classes.gridContainer}>
            {fetching && <Loader background='fill' />}
            <Info />
            <Construction />
            <Condition />
            <Addit />

            <div className={classes.buttons}>
                <Button variant='grayPrimary' rounded='round' onClick={backHandler}>
                    Отмена
                </Button>
                <Send />
            </div>
        </div>
    )
}
