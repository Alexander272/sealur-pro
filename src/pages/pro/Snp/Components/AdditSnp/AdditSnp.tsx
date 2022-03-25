import { FC, useEffect } from "react"
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { FileInput } from "../../../../../components/UI/FileInput/FileInput"
import { ISNP, ISnpForm } from "../../../../../types/snp"
import { Fillers } from "./Components/Fillers/Fillers"
import { Construction } from "./Components/Construction/Construction"
import classes from "../../../style/pages.module.scss"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../store/store"
import { Material } from "./Components/Materials/Materials"

type Props = {
    values: ISnpForm
    snp: ISNP | null
    control: Control<ISnpForm, object>
    setValue: UseFormSetValue<ISnpForm>
    register: UseFormRegister<ISnpForm>
}

export const AdditSnp: FC<Props> = ({ values, snp, control, setValue, register }) => {
    const addit = useSelector((state: RootState) => state.addit.addit)

    // зполнение первоначального значения перемычки
    useEffect(() => {
        if (values.isJumper) setValue("jumper", "A")
    }, [values.isJumper, setValue])

    // зполнение первоначального значения крепления
    useEffect(() => {
        if (values.isMoun) {
            let moun = ""

            if (snp?.mounting === "*") {
                moun = addit?.mounting.split(";")[0].split("@")[1] || ""
            } else {
                const m = addit?.mounting
                    .split(";")
                    .find(m => m.split("@")[0] === snp?.mounting.split(";")[0])
                moun = m?.split("@")[1] || ""
            }

            setValue("moun", moun)
        }
    }, [values.isMoun, setValue, addit?.mounting, snp?.mounting])

    return (
        <div className={classes.sideContainer}>
            <Fillers values={values} snp={snp} control={control} setValue={setValue} />
            <Construction values={values} snp={snp} control={control} register={register} />

            <p className={classes.title}>Материалы</p>
            <Material snp={snp} control={control} />

            <FileInput name='drawing' id='file' label='Прикрепить чертеж' />

            <div className={classes.message}>
                {(values.isJumper && !["A", "M", "J"].includes(values.jumper)) || values.isHole ? (
                    <p className={classes.warn}>К заявке приложите файл с чертежом.</p>
                ) : null}
            </div>
        </div>
    )
}
