import { useSelector } from "react-redux"
import { splitString } from "../../service/utils"
import { RootState } from "../../store/store"
import { Checkbox } from "../UI/Checkbox/Checkbox"
import { Select } from "../UI/Select/Select"
import classes from "./mounting.module.scss"

type Props = {
    className: string
    checked: boolean
    onChange: any
    mounting: string
}

const { Option } = Select

export const Mounting: React.VFC<Props> = ({ className, checked, onChange, mounting }) => {
    const addit = useSelector((state: RootState) => state.addit.addit)

    const renderMoun = () => {
        const moun = splitString(mounting, addit?.mounting || "", ";")

        return moun?.map(m => (
            <Option key={m} value={m}>
                {m}
            </Option>
        ))
    }

    return (
        <div className={className}>
            <Checkbox
                id='fastening'
                name='fastening'
                label='Крепление на вертикальном фланце'
                checked={checked}
                onChange={onChange}
            />
            {checked && (
                <div className={classes.box}>
                    {mounting && (
                        <Select value='Ф1-20' onChange={() => {}}>
                            {renderMoun()}
                        </Select>
                    )}
                </div>
            )}
        </div>
    )
}
