import { Control, Controller, ControllerRenderProps, UseFormRegister } from "react-hook-form"
import classes from "../Mounting/mounting.module.scss"
import { Checkbox } from "../UI/Checkbox/Checkbox"
import { Input } from "../UI/Input/Input"
import { Select } from "../UI/Select/Select"

type Props = {
    className: string
    checked: boolean
    disabled?: boolean
    checkedHandler: any
    value?: string
    valueHandler?: (value: string) => void
    width?: string
    widthHandler?: any
    control?: Control<any, object>
    register?: UseFormRegister<any>
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
    register,
    control,
}) => {
    const renderJumper = ({ field }: { field: ControllerRenderProps<any, "jumper"> }) => {
        return (
            <Select value={field.value} onChange={field.onChange}>
                {jumper.split(",").map(j => (
                    <Option key={j} value={j}>
                        {j}
                    </Option>
                ))}
            </Select>
        )
    }

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
                    {control ? (
                        <Controller name='jumper' control={control} render={renderJumper} />
                    ) : (
                        <Select value={value || ""} onChange={valueHandler!}>
                            {jumper.split(",").map(j => (
                                <Option key={j} value={j}>
                                    {j}
                                </Option>
                            ))}
                        </Select>
                    )}

                    <Input
                        name='jumWidth'
                        type='number'
                        placeholder='ширина'
                        min={1}
                        value={width}
                        onChange={widthHandler}
                        register={register}
                        suffix='мм'
                    />
                </div>
            )}
        </div>
    )
}
