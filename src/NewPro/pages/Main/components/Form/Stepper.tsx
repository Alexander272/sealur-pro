import React, { FC } from "react"
import { IStep } from "../../../../types/steps"
import classes from "./form.module.scss"
import { Navigation } from "./Navigation"

type Props = {
    step: IStep
}

export const Stepper: FC<Props> = ({ step }) => {
    return (
        <>
            <p className={classes.title}>{step.title}</p>

            <Navigation navigation={step.navigation} />
        </>
    )
}
