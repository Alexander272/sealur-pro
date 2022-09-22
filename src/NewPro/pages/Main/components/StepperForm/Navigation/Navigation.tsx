import React, { FC } from "react"
import { IStepNavigation } from "../../../../../types/steps"
import { NavItem } from "./NavItem"
import classes from "../form.module.scss"

type Props = {
    navigation: IStepNavigation[]
    onNavigation: (stepId: string) => void
}

export const Navigation: FC<Props> = ({ navigation, onNavigation }) => {
    if (!navigation) return null

    return (
        <div className={classes.navigation}>
            {navigation.map(nav => (
                <NavItem key={nav.id} nav={nav} onNavigation={onNavigation} />
            ))}
        </div>
    )
}
