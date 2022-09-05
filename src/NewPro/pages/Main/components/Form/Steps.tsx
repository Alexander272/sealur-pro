import React, { FC } from "react"
import { IStepTitle } from "../../../../types/steps"
import classes from "./form.module.scss"

type Props = {
    steps: IStepTitle[]
    currentStepId: string
}

export const Steps: FC<Props> = ({ steps, currentStepId }) => {
    return (
        <div className={classes.steps}>
            {steps.map((s, i) => (
                <p
                    key={s.id}
                    className={`${classes.step} ${currentStepId === s.id ? classes.active : ""}`}
                >
                    <span className={classes["step-icon"]}>{i + 1}</span>
                    {s.title}
                </p>
            ))}
        </div>
    )
}
