import { FC } from "react"
import { IObturator } from "../../../../../../../types/addit"
import List from "./List"
import classes from "../../../../../pages.module.scss"
import localClasses from "./multiselect.module.scss"

type Props = {
    selectedObts: string[]
    obturators: IObturator[]
    changeObturator: (obts: string[]) => void
}

const MultiSelect: FC<Props> = ({ selectedObts, obturators, changeObturator }) => {
    const deleteHandler = (obturator: string) => () => {
        changeObturator(selectedObts.filter(o => o !== obturator))
    }

    const changeHandler = (obts: string[]) => {
        changeObturator(obts)
    }

    return (
        <div className={classes.def}>
            <p className={classes.defTitle}>Доступно при типах конструкции:</p>
            <div className={localClasses.list}>
                {selectedObts.map(o => (
                    <p key={o} className={localClasses.item} onClick={deleteHandler(o)}>
                        {o} <span className={localClasses.icon}>&times;</span>
                    </p>
                ))}
                <List
                    obturators={obturators}
                    selectedObts={selectedObts}
                    changeHandler={changeHandler}
                />
            </div>
        </div>
    )
}

export default MultiSelect
