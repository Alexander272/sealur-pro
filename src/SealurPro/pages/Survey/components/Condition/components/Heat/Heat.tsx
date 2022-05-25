import { FC } from "react"
import { Input } from "../../../../../../../components/UI/Input/Input"
import classes from "../../../../survey.module.scss"

type Props = {}

export const Heat: FC<Props> = () => {
    return (
        <div className={classes.fb40}>
            <p className={classes.title}>Для теплообменника</p>
            <div className={classes.inline}>
                <div className={`${classes.fb50} ${classes.heat}`}>
                    <p className={classes.titleGroup}>трубное</p>
                    <Input
                        id='difffrom'
                        name='difffrom'
                        type='number'
                        orentation='horizontal'
                        placeholder='0'
                    />
                    <Input
                        id='preswork'
                        name='preswork'
                        type='number'
                        min={0}
                        step={0.1}
                        placeholder='0.0'
                    />
                    <Input name='environ' />
                </div>
                <div className={`${classes.fb50} ${classes.heat}`}>
                    <p className={classes.titleGroup}>межтрубное</p>
                    <Input
                        id='difffrom'
                        name='difffrom'
                        type='number'
                        orentation='horizontal'
                        placeholder='0'
                    />
                    <Input
                        id='preswork'
                        name='preswork'
                        type='number'
                        min={0}
                        step={0.1}
                        placeholder='0.0'
                    />
                    <Input name='environ' />
                </div>
            </div>
        </div>
    )
}
