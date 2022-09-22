import React, { FC, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import useSWR from "swr"
import ServerError from "../../../../../Error/ServerError"
import ReadService from "../../../../service/read"
import { IStepTitle } from "../../../../types/steps"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import { Steps } from "./Steps"
import { Stepper } from "./Stepper"
import classes from "./form.module.scss"

type Props = {}

export const StepperForm: FC<Props> = () => {
    const [steps, setSteps] = useState<IStepTitle[]>([])
    const [stepId, setStepId] = useState<string | null>(null)
    const [stepIdx, setStepIdx] = useState(0)

    const { data, error } = useSWR(["/sealur-pro/steps", stepId || "init"], ReadService.getData)
    const form = useForm()

    useEffect(() => {
        if (data && data.data) {
            if (!steps.some(s => s.id === data.data.id)) {
                setSteps(prev => [...prev, { id: data.data.id, title: data.data.title }])
                setStepIdx(steps.length)
            } else {
                setStepIdx(steps.findIndex(s => s.id === data.data.id))
            }
        }
    }, [data, steps])

    const changeStepHandler = (idx: number) => {
        setStepIdx(idx)
        setStepId(steps[idx].id)
    }

    const goStepHandler = (stepId: string) => {
        if (!setStepId) return
        setStepId(stepId)
        if (stepIdx !== steps.length - 1) {
            setSteps(prev => prev.slice(0, stepIdx - 1))
        }
    }

    const submitHundler = (data: any) => {
        console.log(data)
    }

    if (error) return <ServerError />

    if (!data)
        return (
            <div className={classes.wrapper}>
                <Loader isFull />
            </div>
        )

    return (
        <div className={classes.container}>
            <Steps steps={steps} stepIdx={stepIdx} onStep={changeStepHandler} />

            <FormProvider {...form}>
                <form className={classes.form} onSubmit={form.handleSubmit(submitHundler)}>
                    <Stepper step={data.data} navigationHandler={goStepHandler} />
                </form>
            </FormProvider>
        </div>
    )
}
