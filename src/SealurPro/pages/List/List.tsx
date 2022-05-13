import { useNavigate } from "react-router-dom"
import { ProUrl } from "../../../components/routes"
import { Button } from "../../../components/UI/Button/Button"
import Table from "./components/Table/Table"
import classes from "./list.module.scss"

export default function List() {
    const navigate = useNavigate()

    const backHandler = () => {
        navigate(-1)
    }

    return (
        <div className={classes.container}>
            <nav className={classes.buttons}>
                <Button.Link to={`${ProUrl}/survey`} variant='grayPrimary' rounded='round'>
                    Заполнить опросный лист
                </Button.Link>
                <Button onClick={backHandler} rounded='round'>
                    Вернуться к выбору
                </Button>
            </nav>
            <Table />
        </div>
    )
}
