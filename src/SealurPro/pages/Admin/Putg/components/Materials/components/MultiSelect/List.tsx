import { FC, useState } from "react"
import { IObturator } from "../../../../../../../types/addit"
import classes from "./multiselect.module.scss"

type Props = {
    selectedObts: string[]
    obturators: IObturator[]
    changeHandler: (obts: string[]) => void
}

const List: FC<Props> = ({ obturators, selectedObts, changeHandler }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openHandler = () => {
        setIsOpen(prev => !prev)
    }

    const addHandler = (obt: string) => () => {
        changeHandler([...selectedObts, obt])
    }

    const deleteHandler = (obt: string) => () => {
        changeHandler(selectedObts.filter(o => o !== obt))
    }

    return (
        <>
            <p onClick={openHandler} className={`${classes.item} ${classes.add}`}>
                Добаить
            </p>
            <div className={`${classes.container} ${isOpen ? classes.open : ""}`}>
                <div className={classes.backdrop} onClick={openHandler} />
                <div className={`${classes.roster} scroll`}>
                    {obturators.map(o => {
                        const selected = selectedObts.includes(o.short)
                        return (
                            <p
                                key={o.short}
                                className={`${classes.rosterItem} ${
                                    selected ? classes.selected : ""
                                }`}
                                onClick={selected ? deleteHandler(o.short) : addHandler(o.short)}
                            >
                                {o.short} {o.title}
                            </p>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default List
