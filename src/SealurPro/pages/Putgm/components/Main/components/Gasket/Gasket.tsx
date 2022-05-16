import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "../../../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../../../store/store"
import classes from "../../../../../style/pages.module.scss"

const { Option } = Select

type Props = {}

export const Gasket: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    // const constructions = useSelector((state: ProState) => state.putg.constructions)
    const construction = useSelector((state: ProState) => state.putgm.construction)
    const obturator = useSelector((state: ProState) => state.putgm.obturator)

    const dispatch = useDispatch<Dispatch>()

    const constructionHandler = (value: string) => {
        // dispatch.putg.changeConstruction(value)
    }

    const obturatorHandler = (value: string) => {
        // dispatch.putg.setObturator(value)
        // const constr = constructions.find(c => c.short === construction)
        // const obturator = constr?.obturators.find(o => o.short === value)
        // if (obturator) dispatch.putg.setImageUrl(obturator.imageUrl)
    }

    const renderConstruction = () => {
        const bas = addit?.basis || []
        // addit?.basis.filter(con => constructions.some(c => c.short === con.short)) || []
        return bas.map(b => (
            <Option key={b.short} value={b.short}>
                {b.short} {b.title}
            </Option>
        ))
    }

    const renderObturator = () => {
        // const constr = constructions.find(c => c.short === construction)
        const obts = addit?.pObturator || []
        // addit?.obturator.filter(obt => constr?.obturators.some(o => o.short === obt.short)) ||
        // []

        return obts.map(o => (
            <Option key={o.short} value={o.short}>
                {o.short} {o.title}
            </Option>
        ))
    }

    return (
        <>
            <div className={classes.group}>
                <p className={classes.titleGroup}>Тип основания</p>
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
