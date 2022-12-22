import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "../../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../../store/store"
import classes from "../../../../style/pages.module.scss"

const { Option } = Select

type Props = {}

export const Gasket: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const constructions = useSelector((state: ProState) => state.putg.constructions)
    const construction = useSelector((state: ProState) => state.putg.construction)
    const obturator = useSelector((state: ProState) => state.putg.obturator)

    const dispatch = useDispatch<Dispatch>()

    const constructionHandler = (value: string) => {
        dispatch.putg.changeConstruction(value)
    }

    const obturatorHandler = (value: string) => {
        dispatch.putg.setObturator(value)
        const constr = constructions.find(c => c.short === construction)
        const obturator = constr?.obturators.find(o => o.short === value)
        if (obturator) dispatch.putg.setImageUrl(obturator.imageUrl)
    }

    const renderConstruction = () => {
        const constr =
            addit?.construction.filter(con => constructions.some(c => c.short === con.short)) || []
        return constr.map(con => (
            <Option key={con.short} value={con.short}>
                {con.short} {con.title}
            </Option>
        ))
    }

    const renderObturator = () => {
        const constr = constructions.find(c => c.short === construction)
        const obts =
            addit?.obturator.filter(obt => constr?.obturators.some(o => o.short === obt.short)) ||
            []

        return obts.map(obt => (
            <Option key={obt.short} value={obt.short}>
                {obt.short} {obt.title}
            </Option>
        ))
    }

    return (
        <>
            <div className={classes.group}>
                <p className={classes.titleGroup}>Тип прокладки</p>
                <Select value={construction} onChange={constructionHandler}>
                    {renderConstruction()}
                </Select>
            </div>

            <div className={classes.group}>
                <p className={classes.titleGroup}>Тип конструкции</p>
                <Select value={obturator} onChange={obturatorHandler}>
                    {renderObturator()}
                </Select>
            </div>
        </>
    )
}
