import { FC, useContext } from "react"
import { Control, Controller, ControllerRenderProps } from "react-hook-form"
import { Materials } from "../../../../../../../components/Materials/Materials"
import { ISNP, ISnpForm } from "../../../../../../../types/snp"
import classes from "../../../../../style/pages.module.scss"
import { MatContext } from "../../../../Context/MatContext"

type Props = {
    snp: ISNP | null
    control: Control<ISnpForm, object>
}

export const Material: FC<Props> = ({ snp, control }) => {
    const { openFrHandler, openIrHandler, openOrHandler } = useContext(MatContext)

    const openHandler = (name: string) => (isOpen: boolean) => {
        if (name === "fr") openFrHandler(isOpen)
        if (name === "ir") openIrHandler(isOpen)
        if (name === "or") openOrHandler(isOpen)
    }

    const renderIr = ({ field }: { field: ControllerRenderProps<ISnpForm, "ir"> }) => {
        return (
            <Materials
                className={`${classes.group} ${classes.inline} ${classes.mater}`}
                classTitle={classes.titleGroup}
                value={field.value}
                onChange={field.onChange}
                mater={snp?.ir.split("&")[0] || ""}
                onOpen={openHandler("ir")}
                title='Внутреннее кольцо'
            />
        )
    }

    const renderFr = ({ field }: { field: ControllerRenderProps<ISnpForm, "fr"> }) => {
        return (
            <Materials
                className={`${classes.group} ${classes.inline} ${classes.mater}`}
                classTitle={classes.titleGroup}
                value={field.value}
                onChange={field.onChange}
                mater={snp?.frame.split("&")[0] || ""}
                onOpen={openHandler("fr")}
                title='Каркас'
            />
        )
    }

    const renderOr = ({ field }: { field: ControllerRenderProps<ISnpForm, "or"> }) => {
        return (
            <Materials
                className={`${classes.group} ${classes.inline} ${classes.mater}`}
                classTitle={classes.titleGroup}
                value={field.value}
                onChange={field.onChange}
                mater={snp?.or.split("&")[0] || ""}
                onOpen={openHandler("or")}
                title='Наружное кольцо'
            />
        )
    }

    return (
        <>
            {snp?.ir && <Controller name='ir' control={control} render={renderIr} />}
            {snp?.frame && <Controller name='fr' control={control} render={renderFr} />}
            {snp?.or && <Controller name='or' control={control} render={renderOr} />}
        </>
    )
}
