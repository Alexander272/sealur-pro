import { Loader } from "../../components/UI/Loader/Loader"
import classes from "./putg.module.scss"

export default function Putg() {
    return (
        <div className={classes.page}>
            <Loader />
        </div>
    )
}
