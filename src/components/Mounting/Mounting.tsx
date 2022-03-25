import { Control, Controller, ControllerRenderProps } from "react-hook-form"
import { useSelector } from "react-redux"
import { splitString } from "../../service/utils"
import { RootState } from "../../store/store"
import { Checkbox } from "../UI/Checkbox/Checkbox"
import { Select } from "../UI/Select/Select"
import classes from "./mounting.module.scss"

type Props = {
    className: string
    checked: boolean
    checkedHandler: any
    mounting: string
    value?: string
    valueHandler?: (value: string) => void
    control?: Control<any, object>
}

const { Option } = Select

export const Mounting: React.VFC<Props> = ({
    className,
    checked,
    checkedHandler,
    mounting,
    value,
    valueHandler,
    control,
}) => {
    const addit = useSelector((state: RootState) => state.addit.addit)

    const renderOption = () => {
        const moun = splitString(mounting, addit?.mounting || "")

        return moun?.map(m => {
            const parts = m.split("@")
            return (
                <Option key={parts[0]} value={parts[1]}>
                    {parts[1]}
                </Option>
            )
        })
    }

    const renderMoun = ({ field }: { field: ControllerRenderProps<any, "moun"> }) => {
        return (
            <Select value={field.value} onChange={field.onChange}>
                {renderOption()}
            </Select>
        )
    }

    return (
        <div className={className}>
            <Checkbox
                id='mouun'
                name='moun'
                label='Крепление на вертикальном фланце'
                checked={checked}
                onChange={checkedHandler}
            />
            {checked && (
                <div className={classes.box}>
                    {mounting &&
                        (control ? (
                            <Controller name='moun' control={control} render={renderMoun} />
                        ) : (
                            <Select value={value!} onChange={valueHandler!}>
                                {renderOption()}
                            </Select>
                        ))}
                </div>
            )}
        </div>
    )
}
