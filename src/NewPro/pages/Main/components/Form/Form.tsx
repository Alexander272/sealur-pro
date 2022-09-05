import React, { FC, useEffect, useState } from "react"
import { IStepTitle } from "../../../../types/steps"
import { Steps } from "./Steps"
import { Stepper } from "./Stepper"
import classes from "./form.module.scss"

const startStep = {
    id: "1",
    title: "step 1",
    elements: [
        {
            type: "Select",
            label: "label",
            data: [
                // можно в таблицах сделать поле step_id и забирать данные в соотвествии с ним
                // если данные используются в нескольких шагах, то придется делать дубли
                {
                    id: "1",
                    title: "title",
                    // скорее всего понадобятся еще какие-нибудь поля
                    stepId: "1",
                },
            ],
            defaultValue: "value1", // можно конечно использовать первый элемент массива
        },
    ],
    navigation: [
        {
            id: "1",
            type: "prev" as "prev",
            text: "Назад",
            options: [
                {
                    stepId: "0",
                },
            ],
        },
        {
            id: "2",
            type: "next" as "next",
            text: "Далее",
            options: [
                {
                    condition: [
                        {
                            fieldName: "field",
                            fieldValue: "value2",
                            //?
                            optionId: "1",
                        },
                    ],
                    stepId: "2",
                },
            ],
        },
    ],
}

type Props = {}

export const Form: FC<Props> = () => {
    const [steps, setSteps] = useState<IStepTitle[]>([])
    const [currentStepId, setCurrentStepId] = useState("")

    //TODO запрос лучше делать здесь
    // сделать запрос на /sealur-pro/steps/${id || "init"}

    useEffect(() => {
        setSteps([
            { id: startStep.id, title: startStep.title },
            { id: "2", title: "step 2" },
            { id: "3", title: "step 3" },
        ])
        setCurrentStepId(startStep.id)
    }, [])

    return (
        <div className={classes.container}>
            <Steps steps={steps} currentStepId={currentStepId} />
            <form className={classes.form}>
                <Stepper step={startStep} />
            </form>
        </div>
    )
}
