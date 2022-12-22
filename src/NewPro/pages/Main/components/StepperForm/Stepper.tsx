import React, { FC, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { IStep, StepNavigationType } from "../../../../types/steps"
import { Navigation } from "./Navigation/Navigation"
import { StepElement } from "./StepElement"
import classes from "./form.module.scss"

type Props = {
    step: IStep | undefined
    navigationHandler: (stepId: string, type: StepNavigationType) => void
}

export const Stepper: FC<Props> = ({ step, navigationHandler }) => {
    const { setValue, getValues } = useFormContext()

    useEffect(() => {
        step?.elements.forEach(e => {
            if (!getValues(e.name)) setValue(e.name, e.defaultValue)
        })
    }, [step?.elements, setValue, getValues])

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
