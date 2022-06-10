import { ChangeEvent, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Dispatch, ProState } from "../../../../../../store/store"
import { HeatFields } from "../../../../../../types/survey"
import classes from "../../../../survey.module.scss"

type Props = {}

export const Heat: FC<Props> = () => {
    const heat = useSelector((state: ProState) => state.survey.heat)

    const { survey } = useDispatch<Dispatch>()

    const changeHeatDataHandler = (field: HeatFields) => (event: ChangeEvent<HTMLInputElement>) => {
        survey.setHeatData({ field, value: event.target.value })
    }

    return (
        <div className={classes.fb40}>
            <p className={classes.title}>Для теплообменника</p>
            <div className={classes.inline}>
                <div className={`${classes.fb50} ${classes.heat}`}>
                    <p className={classes.titleGroup}>трубное</p>
                    <Input
                        id='heat_tempwork_pipe'
                        name='difffrom'
                        type='number'
                        orentation='horizontal'
                        placeholder='0'
                        value={heat.tempWorkPipe}
                        onChange={changeHeatDataHandler("tempWorkPipe")}
                    />
                    <Input
                        id='heat_preswork_pipe'
                        name='preswork'
                        type='number'
                        min={0}
                        step={0.1}
                        placeholder='0.0'
                        value={heat.presWorkPipe}
                        onChange={changeHeatDataHandler("presWorkPipe")}
                    />
                    <Input
                        name='environPipe'
                        id='heat_environ_pipe'
                        value={heat.environPipe}
                        onChange={changeHeatDataHandler("environPipe")}
                    />
                </div>
                <div className={`${classes.fb50} ${classes.heat}`}>
                    <p className={classes.titleGroup}>межтрубное</p>
                    <Input
                        id='heat_tempWork'
                        name='difffrom'
                        type='number'
                        orentation='horizontal'
                        placeholder='0'
                        value={heat.tempWork}
                        onChange={changeHeatDataHandler("tempWork")}
                    />
                    <Input
                        id='heat_preswork'
                        name='preswork'
                        type='number'
                        min={0}
                        step={0.1}
                        placeholder='0.0'
                        value={heat.presWork}
                        onChange={changeHeatDataHandler("presWork")}
                    />
                    <Input
                        name='environ'
                        id='heat_enviton'
                        value={heat.environ}
                        onChange={changeHeatDataHandler("environ")}
                    />
                </div>
            </div>
        </div>
    )
}
