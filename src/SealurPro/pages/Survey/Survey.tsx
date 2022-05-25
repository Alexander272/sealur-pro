import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/UI/Button/Button"
import { Addit } from "./components/Addit/Addit"
import { Condition } from "./components/Condition/Condition"
import { Construction } from "./components/Construction/Construction"
import { Info } from "./components/Info/Info"
import classes from "./survey.module.scss"

export default function Survey() {
    const navigate = useNavigate()

    const backHandler = () => {
        navigate(-1)
    }

    return (
        <div className={classes.gridContainer}>
            <Info />
            <Construction />
            <Condition />
            <Addit />

            <div className={classes.buttons}>
                <Button variant='grayPrimary' rounded='round' onClick={backHandler}>
                    Отмена
                </Button>
                <Button rounded='round'>Отправить заявку</Button>
            </div>
        </div>
    )
}
