import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Select } from "../../../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../../../store/store"
import classes from "../../../../../style/pages.module.scss"

const { Option } = Select

type Props = {}

export const Gasket: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const constructions = useSelector((state: ProState) => state.putgm.constructions)
    const construction = useSelector((state: ProState) => state.putgm.construction)
    const obturator = useSelector((state: ProState) => state.putgm.obturator)
    const seal = useSelector((state: ProState) => state.putgm.seal)

    const parts = useSelector((state: ProState) => state.putgm.parts)

    const dispatch = useDispatch<Dispatch>()

    const constructionHandler = (value: string) => {
        dispatch.putgm.changeConstruction(value)
    }

    const obturatorHandler = (value: string) => {
        dispatch.putgm.setObturator(value)
        const constr = constructions.find(c => c.basis === construction)
        const obturator = constr?.obturator.find(o => o.obturator === value)
        const sealant = obturator?.sealant.find(o => o.seal === seal)
        if (sealant) dispatch.putgm.setImageUrl(sealant.imageUrl)
    }

    const partsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch.putgm.setParts(event.target.value)
    }

    const renderConstruction = () => {
        // const bas = addit?.basis || []
        const bas = addit?.basis.filter(con => constructions.some(c => c.basis === con.short)) || []
        return bas.map(b => (
            <Option key={b.short} value={b.short}>
                {b.title}
            </Option>
        ))
    }

    const renderObturator = () => {
        const constr = constructions.find(c => c.basis === construction)
        const obts =
            addit?.obturator.filter(obt =>
                constr?.obturator.some(o => o.obturator === obt.short)
            ) || []

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
                {construction.includes("&") && (
                    <div className={classes.input}>
                        <Input
                            id='parts'
                            name='parts'
                            type='number'
                            value={parts}
                            min={2}
                            onChange={partsHandler}
                            orentation='horizontal'
                            label='Количество слоев'
                        />
                    </div>
                )}
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
