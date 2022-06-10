import { Children, cloneElement, PropsWithChildren, useEffect, useState } from "react"
import { Option } from "./Option"
import classes from "./select.module.scss"

type Props = {
    value: string
    onChange: (value: string) => void
    onOpen?: (isOpen: boolean) => void
    disabled?: boolean
}

const Select = ({ children, value, disabled, onChange, onOpen }: PropsWithChildren<Props>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(value)

    useEffect(() => {
        let index = 0
        Children.forEach(children as React.ReactElement[], (child: React.ReactElement, idx) => {
            if (child.props.value === value) setTitle(child.props.children)
            index = idx
        })

        if (index === Children.count(children)) {
            setTitle(value)
        }
    }, [value, children])

    const changeHandler = (curValue: string) => () => {
        setIsOpen(false)
        onOpen && onOpen(false)
        if (value === curValue) return
        onChange(curValue)
    }

    const openHandler = () => {
        if (disabled) return
        onOpen && onOpen(!isOpen)
        setIsOpen(prev => !prev)
    }

    return (
        <div className={`${classes.select} ${isOpen ? "" : classes.close}`}>
            <p
                className={[classes.selected, disabled && classes.disabled].join(" ")}
                onClick={openHandler}
            >
                {title}
                {!disabled && <span className={classes.icon}>&#9660;</span>}
            </p>
            {isOpen && <div className={classes.dropdown} onClick={openHandler}></div>}
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
