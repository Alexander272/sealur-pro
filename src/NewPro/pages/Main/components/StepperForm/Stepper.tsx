import React, { FC } from "react"
import { IStep } from "../../../../types/steps"
import { Navigation } from "./Navigation/Navigation"
import classes from "./form.module.scss"
import { StepElement } from "./StepElement"

type Props = {
    step: IStep | undefined
    navigationHandler: (stepId: string) => void
}

export const Stepper: FC<Props> = ({ step, navigationHandler }) => {
    if (!step) return null

    return (
        <>
            <p className={classes.title}>{step.title}</p>

            {step.elements.map(e => (
                <StepElement key={e.id} element={e} />
            ))}

            <Navigation navigation={step.navigation} onNavigation={navigationHandler} />
        </>
    )
}
