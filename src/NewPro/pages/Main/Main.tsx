import React from "react"
import { StepperForm } from "./components/StepperForm/StepperForm"
import classes from "./main.module.scss"

// const testSteps = {
//     stepId: "1",
//     // title: "test step",
//     // elements: [],
//     options: [
//         {
//             title: "option №1",
//             condition: [
//                 {
//                     fieldName: "field",
//                     fieldValue: "value1",
//                 },
//             ],
//             elements: [
//                 {
//                     type: "Select",
//                     label: "label",
//                     data: [],
//                 },
//             ],
//             navigation: [
//                 {
//                     text: "Back",
//                     stepId: "0",
//                 },
//                 {
//                     text: "Next",
//                     stepId: "2",
//                 },
//             ],
//         },
//         {
//             title: "option №2",
//             condition: [
//                 {
//                     fieldName: "field",
//                     fieldValue: "value2",
//                 },
//             ],
//             elements: [
//                 {
//                     type: "Select",
//                     label: "label",
//                     data: [],
//                 },
//             ],
//             navigation: [
//                 {
//                     text: "Back",
//                     stepId: "0",
//                 },
//                 {
//                     text: "Next",
//                     stepId: "3",
//                 },
//             ],
//         },
//     ],
// }

const testStep = {
    id: "1",
    title: "test step",
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
            type: "prev" as "prev",
            text: "Back",
            options: [
                {
                    stepId: "0",
                },
            ],
        },
        {
            type: "next" as "next",
            text: "Next",
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

export default function Main() {
    return (
        <div className={classes.container}>
            <StepperForm />
            {/* <pre>{JSON.stringify(testSteps, null, 4)}</pre> */}
            <pre>{JSON.stringify(testStep, null, 4)}</pre>
        </div>
    )
}
