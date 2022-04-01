import { ChangeEvent } from "react"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../components/UI/Input/Input"
import classes from "../Mounting/mounting.module.scss"

type Props = {
    className: string
    checked: boolean
    disabled?: boolean
    checkedHandler: (event: ChangeEvent<HTMLInputElement>) => void
    value: string
    valueHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Detachable: React.VFC<Props> = ({
    className,
    checked,
    disabled,
    checkedHandler,
    value,
    valueHandler,
}) => {
    return (
        <div className={className}>
            <Checkbox
                id='isDetachable'
                name='isDetachable'
                label='Разъемная'
                checked={checked}
                onChange={checkedHandler}
                disabled={disabled}
            />
            {checked && (
                <div className={classes.box}>
                    <Input
                        id='parts'
                        name='parts'
                        type='number'
                        placeholder='кол-во частей'
                        min={1}
                        value={value}
                        onChange={valueHandler}
                    />
                </div>
            )}
        </div>
    )
}
