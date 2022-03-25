import { FC } from "react"
import { Control, Controller, ControllerRenderProps, UseFormRegister } from "react-hook-form"
import { Jumper } from "../../../../../../../components/Jumper/Jumper"
import { Mounting } from "../../../../../../../components/Mounting/Mounting"
import { Checkbox } from "../../../../../../../components/UI/Checkbox/Checkbox"
import { ISNP, ISnpForm } from "../../../../../../../types/snp"
import classes from "../../../../../style/pages.module.scss"

type Props = {
    values: ISnpForm
    snp: ISNP | null
    control: Control<ISnpForm, object>
    register: UseFormRegister<ISnpForm>
}

export const Construction: FC<Props> = ({ values, snp, control, register }) => {
    const renderJumper = ({ field }: { field: ControllerRenderProps<ISnpForm, "isJumper"> }) => {
        return (
            <Jumper
                className={`${classes.group} ${classes.inline}`}
                checked={field.value}
                checkedHandler={field.onChange}
                register={register}
                control={control}
                disabled={values.st === "1" || values.st === "3"}
            />
        )
    }

    const renderHole = ({ field }: { field: ControllerRenderProps<ISnpForm, "isHole"> }) => {
        return (
            <Checkbox
                id='holes'
                name='holes'
                label='Отверстия в наруж. ограничителе'
                checked={field.value}
                disabled={values.typePr === "В"}
                onChange={field.onChange}
            />
        )
    }

    const renderMoun = ({ field }: { field: ControllerRenderProps<ISnpForm, "isMoun"> }) => {
        return (
            <Mounting
                className={`${classes.group} ${classes.inline}`}
                checked={field.value}
                checkedHandler={field.onChange}
                mounting={snp?.mounting || ""}
                control={control}
            />
        )
    }

    return (
        <>
            <p className={classes.title}>Конструктивные элементы</p>
            <Controller name='isJumper' control={control} render={renderJumper} />
            <div className={classes.group}>
                <Controller name='isHole' control={control} render={renderHole} />
            </div>
            <Controller name='isMoun' control={control} render={renderMoun} />
        </>
    )
}
