import { Children, cloneElement, PropsWithChildren, useState } from "react"
import { Item } from "./Item"
import classes from "./list.module.scss"

type Props = {
    title: string
    isOpen?: boolean
    addHandler: () => void
    updateHandler: (value: any) => void
}

const List = ({
    children,
    title,
    isOpen: initIsOpen,
    addHandler,
    updateHandler,
}: PropsWithChildren<Props>) => {
    const [isOpen, setIsOpen] = useState<boolean>(initIsOpen || false)

    const openHandler = () => {
        setIsOpen(prev => !prev)
    }

    const changeHandler = (value: string) => () => {
        updateHandler(value)
    }

    return (
        <div className={`${classes.list} ${isOpen ? "" : classes.close}`}>
            <p className={classes.title} onClick={openHandler}>
                {title}
                <span className={classes.icon}>&#9660;</span>
            </p>
            <div className={`${classes.items} scroll`}>
                <p className={classes.add} onClick={addHandler}>
                    Добавить
                </p>
                {Children.map(children as React.ReactElement[], (child: React.ReactElement) =>
                    cloneElement(child, {
                        onClick: changeHandler(child.props.value),
                        // className: child.props.value === value ? classes.active : "",
                    })
                )}
            </div>
        </div>
    )
}

List.Item = Item

export { List }
