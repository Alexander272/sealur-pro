import { ChangeEvent, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "../../../../../../../components/UI/Checkbox/Checkbox"
// import { Detachable } from "../../../../../../components/Detachable/Detachable"
import { Jumper } from "../../../../../../components/Jumper/Jumper"
import { Mounting } from "../../../../../../components/Mounting/Mounting"
import { Dispatch, ProState } from "../../../../../../store/store"
import classes from "../../../../../style/pages.module.scss"

type Props = {}

export const Construction: FC<Props> = () => {
    const isJumper = useSelector((state: ProState) => state.putgm.isJumper)
    const jumper = useSelector((state: ProState) => state.putgm.jumper)
    const jumWidth = useSelector((state: ProState) => state.putgm.jumWidth)
    const isHole = useSelector((state: ProState) => state.putgm.isHole)
    // const isDetachable = useSelector((state: ProState) => state.putg.isDetachable)
    // const parts = useSelector((state: ProState) => state.putgm.parts)
    const isMoun = useSelector((state: ProState) => state.putgm.isMoun)
    const moun = useSelector((state: ProState) => state.putgm.moun)

    const putgm = useSelector((state: ProState) => state.putgm.putgm)

    const dispatch = useDispatch<Dispatch>()

    const checkedJumperHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch.putgm.setIsJumper(event.target.checked)
    }
    const changeJumperHandler = (value: string) => {
        dispatch.putgm.setJumper(value)
    }
    const changeJumperWidthHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch.putgm.setJumperWidth(event.target.value)
    }

    const checkedHoleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch.putgm.setIsHole(event.target.checked)
    }

    // const checkedDetachableHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     dispatch.putgm.setIsDetachable(event.target.checked)
    // }
    // const changePartsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     dispatch.putgm.setParts(event.target.value)
    // }

    const checkedMounHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch.putgm.setIsMoun(event.target.checked)
    }
    const changeMounHandler = (value: string) => {
        dispatch.putgm.setMoun(value)
    }

    return (
        <>
            <p className={classes.title}>Конструктивные элементы</p>
            <Jumper
                className={`${classes.group} ${classes.inline}`}
                checked={isJumper}
                checkedHandler={checkedJumperHandler}
                value={jumper}
                valueHandler={changeJumperHandler}
                width={jumWidth}
                widthHandler={changeJumperWidthHandler}
            />
            <div className={classes.group}>
                <Checkbox
                    id='holes'
                    name='holes'
                    label='Отверстия'
                    checked={isHole}
                    onChange={checkedHoleHandler}
                />
            </div>
            {/* <Detachable
                className={`${classes.group} ${classes.inline}`}
                checked={isDetachable}
                checkedHandler={checkedDetachableHandler}
                value={parts}
                valueHandler={changePartsHandler}
            /> */}
            <Mounting
                className={`${classes.group} ${classes.inline}`}
                checked={isMoun}
                checkedHandler={checkedMounHandler}
                mounting={putgm?.mounting || []}
                value={moun}
                valueHandler={changeMounHandler}
            />
        </>
    )
}
