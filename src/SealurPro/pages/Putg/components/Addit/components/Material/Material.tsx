import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Materials } from "../../../../../../components/Materials/Materials"
import { Dispatch, ProState } from "../../../../../../store/store"
import classes from "../../../../../style/pages.module.scss"

type Props = {}

export const Material: FC<Props> = () => {
    const putg = useSelector((state: ProState) => state.putg.putg)
    const rf = useSelector((state: ProState) => state.putg.rf)
    const ob = useSelector((state: ProState) => state.putg.ob)
    const il = useSelector((state: ProState) => state.putg.il)
    const ol = useSelector((state: ProState) => state.putg.ol)

    const dispatch = useDispatch<Dispatch>()

    // TODO а нужно ли тут что-либо подсвечивать?
    const openHandler = (name: string) => (isOpen: boolean) => {
        // if (name === "rf") dispatch.putg.setIsOpenFrame(isOpen)
        // if (name === "ob") dispatch.putg.setIsOpenIr(isOpen)
        // if (name === "il") dispatch.putg.setIsOpenOr(isOpen)
        // if (name === "ol") dispatch.putg.setIsOpenOr(isOpen)
    }

    const changeMatHandler = (name: string) => (value: string) => {
        if (name === "rf") dispatch.putg.setRf(value)
        if (name === "ob") dispatch.putg.setOb(value)
        if (name === "il") dispatch.putg.setIl(value)
        if (name === "ol") dispatch.putg.setOl(value)
    }

    return (
        <>
            <p className={classes.title}>Материалы</p>
            {putg?.reinforce.values && (
                <Materials
                    className={`${classes.group} ${classes.inline} ${classes.mater}`}
                    classTitle={classes.titleGroup}
                    value={rf}
                    onChange={changeMatHandler("rf")}
                    mater={putg?.reinforce.values}
                    onOpen={openHandler("rf")}
                    title='Армирующий элемент'
                />
            )}
            {putg?.obturator.values && (
                <Materials
                    className={`${classes.group} ${classes.inline} ${classes.mater}`}
                    classTitle={classes.titleGroup}
                    value={ob}
                    onChange={changeMatHandler("ob")}
                    mater={putg?.obturator.values}
                    onOpen={openHandler("ob")}
                    title='Обтюраторы'
                />
            )}
            {putg?.iLimiter.values && (
                <Materials
                    className={`${classes.group} ${classes.inline} ${classes.mater}`}
                    classTitle={classes.titleGroup}
                    value={il}
                    onChange={changeMatHandler("il")}
                    mater={putg?.iLimiter.values}
                    onOpen={openHandler("il")}
                    title='Ограничитель внутренний'
                />
            )}
            {putg?.oLimiter.values && (
                <Materials
                    className={`${classes.group} ${classes.inline} ${classes.mater}`}
                    classTitle={classes.titleGroup}
                    value={ol}
                    onChange={changeMatHandler("ol")}
                    mater={putg?.oLimiter.values}
                    onOpen={openHandler("ol")}
                    title='Ограничитель внешний'
                />
            )}
        </>
    )
}
