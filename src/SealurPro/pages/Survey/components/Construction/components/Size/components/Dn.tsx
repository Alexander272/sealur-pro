import { FC } from "react"
import { Select } from "../../../../../../../../components/UI/Select/Select"
import classes from "../../../../../survey.module.scss"

const { Option } = Select

type Props = {}

export const Dn: FC<Props> = () => {
    return (
        <div className={classes.param}>
            <div className={classes.field}>
                <p className={classes.titleGroup}>Dy, мм</p>
                <Select value='10' onChange={() => {}}>
                    <Option value='10'>10</Option>
                    <Option value='15'>15</Option>
                    <Option value='20'>20</Option>
                </Select>
            </div>
            <div className={classes.field}>
                <p className={classes.titleGroup}>
                    Py, Мпа (кгc/см<sup>2</sup>)
                </p>
                <Select value='10' onChange={() => {}}>
                    <Option value='10'>10</Option>
                    <Option value='15'>15</Option>
                    <Option value='20'>20</Option>
                </Select>
            </div>
        </div>
    )
}
