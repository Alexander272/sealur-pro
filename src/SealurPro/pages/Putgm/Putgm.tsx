import { store } from "../../../store/store"
import classes from "../style/pages.module.scss"

export default function Putgm() {
    console.log(store.getState().user)

    return <div className={classes.page}>Putgm</div>
}
