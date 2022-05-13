import { store } from "../../../store/store"
import classes from "../style/pages.module.scss"

export default function Putgm() {
    console.log(store.getState().user)

    return (
        <>
            <h3 className={classes.description}>
                Прокладки уплотнительные на металлическом основании
            </h3>
        </>
    )
}
