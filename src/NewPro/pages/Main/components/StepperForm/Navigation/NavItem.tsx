import React, { FC } from "react"
import { Button } from "../../../../../../components/UI/Button/Button"
import { IStepNavigation } from "../../../../../types/steps"

type Props = {
    nav: IStepNavigation
    onNavigation: (stepId: string) => void
}

export const NavItem: FC<Props> = ({ nav, onNavigation }) => {
    const navigationHandler = () => {
        if (nav.options.length > 1) {
            //TODO дописать проверку условий
            // только надо сначало придумать как это сделать
        } else {
            onNavigation(nav.options[0].stepId)
        }
    }

    return (
        <Button
            key={nav.id}
            variant={nav.type === "prev" ? "grayPrimary" : "primary"}
            type={nav.type === "finish" ? "submit" : "button"}
            onClick={nav.type !== "finish" ? navigationHandler : () => {}}
        >
            {nav.text}
        </Button>
    )
}
