import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Materials } from "../../../../../../components/Materials/Materials"
import { Dispatch, ProState } from "../../../../../../store/store"
import classes from "../../../../../style/pages.module.scss"

type Props = {}

export const Material: FC<Props> = () => {
    const putg = useSelector((state: ProState) => state.putg.putg)
    // const rf = useSelector((state: ProState) => state.putg.rf)
    const ob = useSelector((state: ProState) => state.putg.ob)
    const il = useSelector((state: ProState) => state.putg.il)
    const ol = useSelector((state: ProState) => state.putg.ol)

    // const construction = useSelector((state: ProState) => state.putg.construction)
    const obturator = useSelector((state: ProState) => state.putg.obturator)

    // const addit = useSelector((state: ProState) => state.addit.addit)

    const dispatch = useDispatch<Dispatch>()

    // TODO а нужно ли тут что-либо подсвечивать?
    const openHandler = (name: string) => (isOpen: boolean) => {
        // if (name === "rf") dispatch.putg.setIsOpenFrame(isOpen)
        // if (name === "ob") dispatch.putg.setIsOpenIr(isOpen)
        // if (name === "il") dispatch.putg.setIsOpenOr(isOpen)
        // if (name === "ol") dispatch.putg.setIsOpenOr(isOpen)
    }

    const changeMatHandler = (name: string) => (value: string) => {
        // if (name === "rf") dispatch.putg.setRf(value)
        if (name === "ob") dispatch.putg.setOb(value)
        if (name === "il") dispatch.putg.setIl(value)
        if (name === "ol") dispatch.putg.setOl(value)
    }

    // if (!addit?.construction.find(c => c.short === construction)?.isHaveMaterial) {
    //     return <></>
    // }

    const renderMaterials = () => {
        let mats: React.ReactElement[] = []

        if (putg?.obturator.values)
            if (putg?.obturator.obturators.includes(obturator))
                mats.push(
                    <Materials
                        key='ob'
                        className={`${classes.group} ${classes.inline} ${classes.mater}`}
                        classTitle={classes.titleGroup}
                        value={ob}
                        onChange={changeMatHandler("ob")}
                        mater={putg?.obturator.values}
                        onOpen={openHandler("ob")}
                        title='Обтюраторы'
                    />
                )

        if (putg?.iLimiter.values)
            if (putg?.iLimiter.obturators.includes(obturator))
                mats.push(
                    <Materials
                        key='il'
                        className={`${classes.group} ${classes.inline} ${classes.mater}`}
                        classTitle={classes.titleGroup}
                        value={il}
                        onChange={changeMatHandler("il")}
                        mater={putg?.iLimiter.values}
                        onOpen={openHandler("il")}
                        title='Ограничитель внутренний'
                    />
                )

        if (putg?.oLimiter.values)
            if (putg?.oLimiter.obturators.includes(obturator))
                mats.push(
                    <Materials
                        key='ol'
                        className={`${classes.group} ${classes.inline} ${classes.mater}`}
                        classTitle={classes.titleGroup}
                        value={ol}
                        onChange={changeMatHandler("ol")}
                        mater={putg?.oLimiter.values}
                        onOpen={openHandler("ol")}
                        title='Ограничитель внешний'
                    />
                )

        if (mats.length)
            mats = [
                <p key='title' className={classes.title}>
                    Материалы
                </p>,
                ...mats,
            ]

        return mats
    }

    return (
        <>
            {renderMaterials()}
            {/* <p className={classes.title}>Материалы</p> */}

            {/* <p className={classes.title}>Материалы</p>
            {putg?.reinforce.values &&
                (putg?.reinforce.obturators.includes(obturator) ? (
                    <Materials
                        className={`${classes.group} ${classes.inline} ${classes.mater}`}
                        classTitle={classes.titleGroup}
                        value={rf}
                        onChange={changeMatHandler("rf")}
                        mater={putg?.reinforce.values}
                        onOpen={openHandler("rf")}
                        title='Армирующий элемент'
                    />
                ) : null)} */}

            {/* {putg?.obturator.values &&
                (putg?.obturator.obturators.includes(obturator) ? (
                    <Materials
                        className={`${classes.group} ${classes.inline} ${classes.mater}`}
                        classTitle={classes.titleGroup}
                        value={ob}
                        onChange={changeMatHandler("ob")}
                        mater={putg?.obturator.values}
                        onOpen={openHandler("ob")}
                        title='Обтюраторы'
                    />
                ) : null)}
            {putg?.iLimiter.values &&
                (putg?.iLimiter.obturators.includes(obturator) ? (
                    <Materials
                        className={`${classes.group} ${classes.inline} ${classes.mater}`}
                        classTitle={classes.titleGroup}
                        value={il}
                        onChange={changeMatHandler("il")}
                        mater={putg?.iLimiter.values}
                        onOpen={openHandler("il")}
                        title='Ограничитель внутренний'
                    />
                ) : null)}
            {putg?.oLimiter.values &&
                (putg?.oLimiter.obturators.includes(obturator) ? (
                    <Materials
                        className={`${classes.group} ${classes.inline} ${classes.mater}`}
                        classTitle={classes.titleGroup}
                        value={ol}
                        onChange={changeMatHandler("ol")}
                        mater={putg?.oLimiter.values}
                        onOpen={openHandler("ol")}
                        title='Ограничитель внешний'
                    />
                ) : null)} */}
        </>
    )
}
