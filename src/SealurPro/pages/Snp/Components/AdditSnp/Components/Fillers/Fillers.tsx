import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "../../../../../../../components/UI/Select/Select"
import { Graphite } from "../../../../../../components/Graphite/Graphite"
import { Modifier } from "../../../../../../components/Modifier/Modifier"
import { Temperature } from "../../../../../../components/Temperature/Temperature"
import { Dispatch, ProState } from "../../../../../../store/store"
import classes from "../../../../../style/pages.module.scss"

const { Option } = Select

type Props = {}

export const Fillers: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const snp = useSelector((state: ProState) => state.snp.snp)
    const grap = useSelector((state: ProState) => state.snp.grap)
    const filler = useSelector((state: ProState) => state.snp.filler)
    const temp = useSelector((state: ProState) => state.snp.temp)
    const mod = useSelector((state: ProState) => state.snp.mod)

    const dispatch = useDispatch<Dispatch>()

    const changeGrapHandler = (value: string) => {
        dispatch.snp.setGrap(value)
    }

    const changeFillerHandler = (value: string) => {
        dispatch.snp.changeFiller(value)
    }

    const changeTempHandler = (value: string) => {
        dispatch.snp.changeTemp(value)
    }

    const changeModHandler = (value: string) => {
        dispatch.snp.changeMod(value)
    }

    const renderFillers = () => {
        let fillers = addit?.fillers.filter(fil => snp?.fillers.some(f => f.id === fil.short)) || []
        return fillers.map(fil => (
            <Option key={fil.short} value={fil.short}>
                {fil.short} {fil.title}
            </Option>
        ))
    }

    const renderTempMod = () => {
        let fil = snp?.fillers.find(fil => fil.id === filler)

        return (
            <>
                <Temperature
                    temp={temp}
                    temps={fil?.temps || []}
                    tempHandler={changeTempHandler}
                    className={classes.group}
                    classTitle={classes.titleGroup}
                />
                <Modifier
                    modifier={mod}
                    modHandler={changeModHandler}
                    temps={fil?.temps || []}
                    className={classes.group}
                    classTitle={classes.titleGroup}
                />
            </>
        )
    }

    return (
        <>
            <Graphite
                className={classes.group}
                classTitle={classes.titleGroup}
                onChange={changeGrapHandler}
                value={grap}
                grap={snp?.graphite || []}
            />

            <div className={classes.group}>
                <p className={classes.titleGroup}>Тип наполнителя</p>
                <Select value={filler} onChange={changeFillerHandler}>
                    {renderFillers()}
                </Select>
            </div>

            {renderTempMod()}
        </>
    )
}
