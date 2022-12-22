import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../../../../store/store"
import { IPUTGM } from "../../../../../types/putgm"
import { AdminCoating } from "../../../components/AdminCoating/AdminCoating"
import { AdminMoun } from "../../../components/AdminMoun/AdminMoun"
import classes from "../../../pages.module.scss"

type Props = {}

export const Addit: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)

    const dispatch = useDispatch<Dispatch>()

    // измение крепления
    const mounHandler = (values: string[]) => {
        let newPutgm: IPUTGM = JSON.parse(JSON.stringify(putgm))
        newPutgm.mounting = values
        dispatch.putgm.setPutgm(newPutgm)
    }

    // измение способа исполнения
    const coatingHandler = (values: string[]) => {
        let newPutgm: IPUTGM = JSON.parse(JSON.stringify(putgm))
        newPutgm.coating = values
        dispatch.putgm.setPutgm(newPutgm)
    }

    return (
        <div className={classes.line}>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Крепление на вертикальном фланце</p>
                {addit?.mounting && (
                    <AdminMoun
                        className={classes.list}
                        classItem={classes.listItem}
                        moun={putgm?.mounting || []}
                        onChange={mounHandler}
                    />
                )}
            </div>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Способ исполнения</p>
                <AdminCoating
                    className={classes.list}
                    classItem={classes.listItem}
                    coating={putgm?.coating || []}
                    onChange={coatingHandler}
                />
            </div>
        </div>
    )
}
