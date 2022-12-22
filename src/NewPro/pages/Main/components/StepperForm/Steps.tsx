import React, { FC } from "react"
import { IStepTitle } from "../../../../types/steps"
import classes from "./form.module.scss"

type Props = {
    steps: IStepTitle[]
    stepIdx: number
    onStep: (idx: number) => void
}

export const Steps: FC<Props> = ({ steps, stepIdx, onStep }) => {
    const goStepHandler = (idx: number) => () => {
        onStep(idx)
    }

    return (
        <div className={classes.steps}>
            {steps.map((s, i) => (
                <p
                    key={s.id}
                    className={`${classes.step} ${stepIdx === i ? classes.active : ""}`}
                    onClick={goStepHandler(i)}
                >
                    <span className={classes["step-icon"]}>{i + 1}</span>
                    {s.title}
                </p>
            ))}
        </div>
    )
}
