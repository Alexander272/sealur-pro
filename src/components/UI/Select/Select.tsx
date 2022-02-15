import { Children, cloneElement, PropsWithChildren, useEffect, useState } from "react"
import { Option } from "./Option"
import classes from "./select.module.scss"

type Props = {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}

const Select = ({ children, value, disabled, onChange }: PropsWithChildren<Props>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(value)

    useEffect(() => {
        Children.forEach(children as React.ReactElement[], (child: React.ReactElement) => {
            if (child.props.value === value) setTitle(child.props.children)
        })
    }, [value, children])

    const changeHandler = (curValue: string) => () => {
        setIsOpen(false)
        if (value === curValue) return
        onChange(curValue)
    }

    const openHandler = () => {
        if (disabled) return
        setIsOpen(prev => !prev)
    }

    return (
        <div className={`${classes.select} ${isOpen ? "" : classes.close}`}>
            <p className={classes.selected} onClick={openHandler}>
                {title}
                {!disabled && <span className={classes.icon}>&#9660;</span>}
            </p>
            <div className={`${classes.options} scroll`}>
                {Children.map(children as React.ReactElement[], (child: React.ReactElement) =>
                    cloneElement(child, {
                        onClick: changeHandler(child.props.value),
                        className: child.props.value === value ? classes.active : "",
                    })
                )}
            </div>
        </div>
    )
}

Select.Option = Option

export { Select }
