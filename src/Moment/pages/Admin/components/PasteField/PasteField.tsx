import React, { FC } from "react"
import classes from "./field.module.scss"

type Props = {
    pasteHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const PasteField: FC<Props> = ({ pasteHandler }) => {
    return (
        <div className={classes.paste}>
            <textarea
                className={classes["paste-field"]}
                placeholder='Вставьте данные из excel'
                value={""}
                rows={1}
                onChange={pasteHandler}
            />
        </div>
    )
}
