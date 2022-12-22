import { ChangeEvent } from "react"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../components/UI/Input/Input"
import { Select } from "../../../components/UI/Select/Select"
import classes from "../Mounting/mounting.module.scss"

type Props = {
    className: string
    checked: boolean
    disabled?: boolean
    checkedHandler: (event: ChangeEvent<HTMLInputElement>) => void
    value: string
    valueHandler: (value: string) => void
    width: string
    widthHandler: any
}

const { Option } = Select

const jumper = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X"

export const Jumper: React.VFC<Props> = ({
    className,
    checked,
    disabled,
    checkedHandler,
    value,
    valueHandler,
    width,
    widthHandler,
}) => {
    return (
        <div className={className}>
            <Checkbox
                id='isJumper'
                name='isJumper'
                label='Перемычка'
                checked={checked}
                onChange={checkedHandler}
                disabled={disabled}
            />
            {checked && (
                <div className={classes.box}>
                    <Select value={value || ""} onChange={valueHandler!}>
                        {jumper.split(",").map(j => (
                            <Option key={j} value={j}>
                                {j}
                            </Option>
                        ))}
                    </Select>

                    <Input
                        name='jumWidth'
                        type='number'
                        placeholder='ширина'
                        min={1}
                        value={width}
                        onChange={widthHandler}
                        suffix='мм'
                    />
                </div>
            )}
        </div>
    )
}
