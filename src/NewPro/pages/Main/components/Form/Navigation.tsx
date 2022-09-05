import React, { FC } from "react"
import { Button } from "../../../../../components/UI/Button/Button"
import { IStepNavigation } from "../../../../types/steps"
import classes from "./form.module.scss"

type Props = {
    navigation: IStepNavigation[]
}

export const Navigation: FC<Props> = ({ navigation }) => {
    //TODO надо передавать функцию для смены текущего шага и передавать в нее шаг из navigation

    return (
        <div className={classes.navigation}>
            {navigation.map(nav => (
                <Button
                    key={nav.id}
                    variant={nav.type === "prev" ? "grayPrimary" : "primary"}
                    type={nav.type === "finish" ? "submit" : "button"}
                >
                    {nav.text}
                </Button>
            ))}
        </div>
    )
}
