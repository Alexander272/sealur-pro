import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Materials } from "../../../../../../components/Materials/Materials"
import { Dispatch, ProState } from "../../../../../../store/store"
import classes from "../../../../../style/pages.module.scss"

type Props = {}

export const Material: FC<Props> = () => {
    const snp = useSelector((state: ProState) => state.snp.snp)
    const ir = useSelector((state: ProState) => state.snp.ir)
    const fr = useSelector((state: ProState) => state.snp.fr)
    const or = useSelector((state: ProState) => state.snp.or)

    const dispatch = useDispatch<Dispatch>()

    const openHandler = (name: string) => (isOpen: boolean) => {
        if (name === "fr") dispatch.snp.setIsOpenFrame(isOpen)
        if (name === "ir") dispatch.snp.setIsOpenIr(isOpen)
        if (name === "or") dispatch.snp.setIsOpenOr(isOpen)
    }

    const changeMatHandler = (name: string) => (value: string) => {
        if (name === "fr") dispatch.snp.setFr(value)
        if (name === "ir") dispatch.snp.setIr(value)
        if (name === "or") dispatch.snp.setOr(value)
    }

    return (
        <>
            <p className={classes.title}>Материалы</p>
            {snp?.ir.values && (
                <Materials
                    className={`${classes.group} ${classes.inline} ${classes.mater}`}
                    classTitle={classes.titleGroup}
                    value={ir}
                    onChange={changeMatHandler("ir")}
                    mater={snp?.ir.values}
                    onOpen={openHandler("ir")}
                    title='Внутреннее кольцо'
                />
            )}
            {snp?.frame.values && (
                <Materials
                    className={`${classes.group} ${classes.inline} ${classes.mater}`}
                    classTitle={classes.titleGroup}
                    value={fr}
                    onChange={changeMatHandler("fr")}
                    mater={snp?.frame.values}
                    onOpen={openHandler("fr")}
                    title='Каркас'
                />
            )}
            {snp?.or.values && (
                <Materials
                    className={`${classes.group} ${classes.inline} ${classes.mater}`}
                    classTitle={classes.titleGroup}
                    value={or}
                    onChange={changeMatHandler("or")}
                    mater={snp?.or.values}
                    onOpen={openHandler("or")}
                    title='Наружное кольцо'
                />
            )}
        </>
    )
}
