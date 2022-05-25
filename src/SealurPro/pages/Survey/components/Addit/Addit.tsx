import { FC } from "react"
import { FileInput } from "../../../../../components/UI/FileInput/FileInput"
import { Textarea } from "../../../../../components/UI/Input/Textarea"
import { Def } from "./components/Def/Def"
import { Mater } from "./components/Mater/Mater"
import classes from "../../survey.module.scss"

type Props = {}

export const Addit: FC<Props> = () => {
    return (
        <div className={`${classes.container} ${classes.block4}`}>
            <p className={classes.title}>Дополнительные сведения</p>
            <div className={classes.inline}>
                <Mater />
                <Def />
            </div>
            <div className={classes.inline}>
                <p className={classes.fb50}>Дополнительная информация</p>
                <FileInput name='drawing' id='file' label='Прикрепить чертеж'></FileInput>
            </div>
            <Textarea name='info' rows={4} />
        </div>
    )
}
