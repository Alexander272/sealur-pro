import React, { Children, JSXElementConstructor, PropsWithChildren } from "react"
import { Body } from "./Body"
import { Caption } from "./Caption"
import { Ceil } from "./Ceil"
import { Head } from "./Head"
import { Row } from "./Row"
import classes from "./table.module.scss"

type Props = {
    height?: number
}

const Table = ({ children, height }: PropsWithChildren<Props>) => {
    let caption
    let newChildren = Children.map(
        children as React.ReactElement[],
        (child: React.ReactElement) => {
            if ((child.type as JSXElementConstructor<any>)?.name === "Caption") {
                caption = child
                return null
            }
            return child
        }
    )

    let style = {}
    if (height) style = { maxHeight: height }

    return (
        <div className={classes["table-container"]}>
            {caption && caption}
            <div className={`${classes.table} scroll`} style={style}>
                {newChildren}
            </div>
        </div>
    )
}

Table.Caption = Caption
Table.Head = Head
Table.Body = Body
Table.Row = Row
Table.Ceil = Ceil

export { Table }
