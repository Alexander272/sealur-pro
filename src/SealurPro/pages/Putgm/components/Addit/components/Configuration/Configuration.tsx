import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Coating } from "../../../../../../components/Coating/Coating"
import { Graphite } from "../../../../../../components/Graphite/Graphite"
import { Modifier } from "../../../../../../components/Modifier/Modifier"
import { Temperature } from "../../../../../../components/Temperature/Temperature"
import { Dispatch, ProState } from "../../../../../../store/store"
import classes from "../../../../../style/pages.module.scss"

type Props = {}

export const Cofiguration: FC<Props> = () => {
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const graphite = useSelector((state: ProState) => state.putgm.grap)
    const temp = useSelector((state: ProState) => state.putgm.temp)
    const mod = useSelector((state: ProState) => state.putgm.mod)
    const coating = useSelector((state: ProState) => state.putgm.coating)

    const dispatch = useDispatch<Dispatch>()

    const changeGrapHandler = (value: string) => {
        dispatch.putgm.changeGrap(value)
    }

    const changeTempHandler = (value: string) => {
        dispatch.putgm.changeTemp(value)
    }

    const changeModHandler = (value: string) => {
        dispatch.putgm.changeMod(value)
    }

    const changeCoatingHandler = (value: string) => {
        dispatch.putgm.setCoating(value)
    }

    const renderTempMod = () => {
        const temps = putgm?.temperatures.find(t => t.grap === graphite)?.temps

        return (
            <>
                <Temperature
                    temp={temp}
                    temps={temps || []}
                    tempHandler={changeTempHandler}
                    className={classes.group}
                    classTitle={classes.titleGroup}
                />
                <Modifier
                    modifier={mod}
                    modHandler={changeModHandler}
                    temps={temps || []}
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
                value={graphite}
                grap={putgm?.graphite || []}
            />

            {renderTempMod()}

            <Coating
                className={classes.group}
                classTitle={classes.titleGroup}
                onChange={changeCoatingHandler}
                value={coating}
                coating={putgm?.coating || []}
            />
        </>
    )
}
