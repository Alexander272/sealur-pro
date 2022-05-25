import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "../../../../../../../components/UI/Select/Select"
import { Materials } from "../../../../../../components/Materials/Materials"
import { Dispatch, ProState } from "../../../../../../store/store"
import classes from "../../../../../style/pages.module.scss"

const { Option } = Select

type Props = {}

export const Material: FC<Props> = () => {
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const basis = useSelector((state: ProState) => state.putgm.basis)
    const obt = useSelector((state: ProState) => state.putgm.obt)
    const seal = useSelector((state: ProState) => state.putgm.seal)

    const constructions = useSelector((state: ProState) => state.putgm.constructions)
    const construction = useSelector((state: ProState) => state.putgm.construction)
    const obturator = useSelector((state: ProState) => state.putgm.obturator)

    const addit = useSelector((state: ProState) => state.addit.addit)

    const dispatch = useDispatch<Dispatch>()

    const changeMatHandler = (name: string) => (value: string) => {
        if (name === "basis") dispatch.putgm.setBasis(value)
        if (name === "obt") dispatch.putgm.setObt(value)
        if (name === "seal") {
            dispatch.putgm.setSeal(value)

            const constr = constructions.find(c => c.basis === construction)
            const obt = constr?.obturator.find(o => o.obturator === obturator)
            const sealant = obt?.sealant.find(o => o.seal === value)
            if (sealant) dispatch.putgm.setImageUrl(sealant.imageUrl)
        }
    }

    const renderSealant = () => {
        const constr = constructions.find(c => c.basis === construction)
        const ob = constr?.obturator.find(o => o.obturator === obturator)
        const sealant = ob?.sealant

        const s = addit?.sealant.filter(s => sealant?.some(seal => seal.seal === s.id))

        if (s)
            return (
                <Select value={seal} onChange={changeMatHandler("seal")}>
                    {s.map(s => (
                        <Option key={s.id} value={s.id}>
                            {s.short} {s.title}
                        </Option>
                    ))}
                </Select>
            )
    }

    return (
        <>
            <p className={classes.title}>Материалы</p>
            {putgm?.basis.values &&
                (putgm?.basis.obturators.includes(obturator) ? (
                    <Materials
                        className={`${classes.group} ${classes.inline} ${classes.mater}`}
                        classTitle={classes.titleGroup}
                        value={basis}
                        onChange={changeMatHandler("basis")}
                        mater={putgm?.basis.values}
                        // onOpen={openHandler("basis")}
                        title='Основание'
                    />
                ) : null)}
            {putgm?.obturator.values &&
                (putgm?.obturator.obturators.includes(obturator) ? (
                    <Materials
                        className={`${classes.group} ${classes.inline} ${classes.mater}`}
                        classTitle={classes.titleGroup}
                        value={obt}
                        onChange={changeMatHandler("obt")}
                        mater={putgm?.obturator.values}
                        // onOpen={openHandler("obt")}
                        title='Обтюраторы'
                    />
                ) : null)}

            <div className={`${classes.group} ${classes.inline} ${classes.mater}`}>
                <p className={classes.titleGroup}>Уплотнительный элемент</p>
                {renderSealant()}
            </div>
        </>
    )
}
