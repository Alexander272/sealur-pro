import React, { FC, memo, useEffect, useState } from "react"
import { Control, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import { toast } from "react-toastify"
import useSWR from "swr"
import {
    IAVOData,
    IFinningFactor,
    INumberOfMoves,
    ISectionExecution,
    ITubeLength,
} from "../../../types/device"
import { IGasCoolingForm } from "../../../types/gasCooling"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { Checkbox } from "../../../../components/UI/Checkbox/Checkbox"
import { Button } from "../../../../components/UI/Button/Button"
import { Person } from "../../../components/Person/Person"
import { Detail } from "../../../components/Detail/Detail"
import ServerError from "../../../../Error/ServerError"
import ReadService from "../../../service/read"
import { InitData } from "./components/InitData"
import { InitDataForBolt } from "./components/InitDataForBolt"
import { InitDataForGasket } from "./components/InitDataForGasket"
import classes from "../../styles/page.module.scss"

type Props = {
    register: UseFormRegister<IGasCoolingForm>
    control: Control<IGasCoolingForm, any>
    setValue: UseFormSetValue<IGasCoolingForm>
    errors: any
}

const FormFields: FC<Props> = ({ register, control, setValue, errors }) => {
    const { data: res, error } = useSWR<{ data: IAVOData }>(
        "/sealur-moment/data/avo",
        ReadService.getData
    )
    const [tube, setTube] = useState<ITubeLength[]>([])
    const [sec, setSec] = useState<ISectionExecution[]>([])
    const [fin, setFin] = useState<IFinningFactor[]>([])
    const [num, setNum] = useState<INumberOfMoves[]>([])

    const devId = useWatch({ control, name: "devId" })
    const countId = useWatch({ control, name: "tubeCountId" })

    useEffect(() => {
        if (res && !devId) {
            setValue("devId", res.data.devices[0].id)
            setValue("pressureId", res.data.pressure[0].id)
            setValue("tubeCountId", res.data.tubeCount[0].id)
        }
    }, [res, devId, setValue])

    useEffect(() => {
        if (res && devId) {
            const tube = res.data.tubeLength.filter(t => t.devId === devId)
            const sec = res.data.sectionExecution.filter(t => t.devId === devId)
            const fin = res.data.finningFactor.filter(t => t.devId === devId)
            const num = res.data.numberOfMoves.filter(
                t => t.devId === devId && t.countId === countId
            )

            setValue("tubeLengthId", tube[0]?.id)
            setValue("sectionId", sec[0]?.id)
            setValue("factorId", fin[0]?.id)
            setValue("numberOfMovesId", num[0]?.id)

            setTube(tube)
            setSec(sec)
            setFin(fin)
            setNum(num)
        }
    }, [res, devId, countId, setValue])

    if (!res)
        return (
            <div className={classes.wrapper}>
                <Loader isFull />
            </div>
        )

    if (error) {
        console.log(error)
        toast.error(error.response)
        return <ServerError />
    }

    return (
        <>
            <InitData
                data={res.data}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
                tube={tube}
                sec={sec}
                fin={fin}
                num={num}
            />
            <InitDataForBolt
                materials={res.data.materials}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />
            <InitDataForGasket
                gasket={res.data.gaskets}
                env={res.data.env}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />

            <div className={classes.divider} />

            <Checkbox
                id='isNeedFormulas'
                name='isNeedFormulas'
                register={register}
                label={"Подставлять значения в формулы"}
            />

            <Person register={register} errors={errors} control={control} />
            <Detail register={register} errors={errors} control={control} />

            <div className={classes["form-button"]}>
                <Button fullWidth>Расчитать</Button>
            </div>
        </>
    )
}

export const Form = memo(FormFields)
