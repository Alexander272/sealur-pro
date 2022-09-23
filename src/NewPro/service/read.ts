import api from "../../service/api"
import { IStep } from "../types/steps"

const testSteps: IStep[] = [
    {
        id: "0",
        title: "step 1",
        elements: [
            {
                id: "1",
                type: "Select",
                name: "standart",
                label: "Стандарт на прокладку / стандарт на фланец",
                data: [
                    {
                        id: "1",
                        title: "ОСТ 26.260.454 / ГОСТ 33259 (трубопроводы)",
                    },
                    {
                        id: "2",
                        title: "ОСТ 26.260.454 / ГОСТ 28759 (сосуды и аппараты)",
                    },
                    {
                        id: "3",
                        title: "ГОСТ Р 52376-2005 / ГОСТ 33259 (трубопроводы)",
                    },
                    {
                        id: "4",
                        title: "ASME B 16.20 / ASME B 16.5",
                    },
                ],
                defaultValue: "1",
            },
        ],
        navigation: [
            {
                id: "1",
                type: "next",
                text: "Далее",
                options: [
                    {
                        stepId: "1",
                    },
                ],
            },
        ],
    },
    {
        id: "1",
        title: "step 2",
        elements: [
            {
                id: "1",
                type: "Select",
                name: "test",
                label: "select 2",
                data: [
                    {
                        id: "1",
                        title: "title",
                    },
                ],
                defaultValue: "1",
            },
        ],
        navigation: [
            {
                id: "1",
                type: "prev",
                text: "Назад",
                options: [
                    {
                        stepId: "0",
                    },
                ],
            },
            {
                id: "2",
                type: "next",
                text: "Далее",
                options: [
                    {
                        stepId: "2",
                    },
                ],
            },
        ],
    },
    {
        id: "2",
        title: "step 3",
        elements: [
            {
                id: "1",
                type: "Select",
                name: "test1",
                label: "test 1",
                data: [
                    {
                        id: "1",
                        title: "test",
                    },
                    {
                        id: "2",
                        title: "test2",
                    },
                ],
                defaultValue: "1",
            },
        ],
        navigation: [
            {
                id: "1",
                type: "prev",
                text: "Назад",
                options: [
                    {
                        stepId: "1",
                    },
                ],
            },
            {
                id: "2",
                type: "next",
                text: "Далее",
                options: [
                    {
                        stepId: "3",
                    },
                ],
            },
        ],
    },

    {
        id: "3",
        title: "step 4",
        elements: [
            {
                id: "1",
                type: "Select",
                name: "test2",
                label: "test 2",
                data: [
                    {
                        id: "5",
                        title: "test",
                    },
                    {
                        id: "6",
                        title: "test2",
                    },
                ],
                defaultValue: "5",
            },
        ],
        navigation: [
            {
                id: "1",
                type: "prev",
                text: "Назад",
                options: [
                    {
                        stepId: "2",
                    },
                ],
            },
            {
                id: "2",
                type: "finish",
                text: "Далее",
                options: [
                    {
                        stepId: "4",
                    },
                ],
            },
        ],
    },
]

export default class ReadService {
    static async getData(url: string, id: string) {
        // const res = await api.get(url)
        // return res.data

        //TODO
        // console.log(id)
        if (id === "init") return { data: testSteps[0] }
        else {
            const step = testSteps.find(s => s.id === id) || ({} as IStep)
            return { data: step }
        }
    }
}
