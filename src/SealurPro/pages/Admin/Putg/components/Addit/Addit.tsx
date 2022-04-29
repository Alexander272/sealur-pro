import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../../../../store/store"
import { IPUTG } from "../../../../../types/putg"
import { AdminCoating } from "../../../components/AdminCoating/AdminCoating"
import { AdminMoun } from "../../../components/AdminMoun/AdminMoun"
import classes from "../../../pages.module.scss"

type Props = {}

export const Addit: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putg = useSelector((state: ProState) => state.putg.putg)

    const dispatch = useDispatch<Dispatch>()

    // измение крепления
    const mounHandler = (values: string[]) => {
        let newPutg: IPUTG = JSON.parse(JSON.stringify(putg))
        newPutg.mounting = values
        dispatch.putg.setPutg(newPutg)
    }

    // измение способа исполнения
    const coatingHandler = (values: string[]) => {
        let newPutg: IPUTG = JSON.parse(JSON.stringify(putg))
        newPutg.coating = values
        dispatch.putg.setPutg(newPutg)
    }

    return (
        <div className={classes.line}>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Крепление на вертикальном фланце</p>
                {addit?.mounting && (
                    <AdminMoun
                        className={classes.list}
                        classItem={classes.listItem}
                        moun={putg?.mounting || []}
                        onChange={mounHandler}
                    />
                )}
            </div>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Способ исполнения</p>
                <AdminCoating
                    className={classes.list}
                    classItem={classes.listItem}
                    coating={putg?.coating || []}
                    onChange={coatingHandler}
                />
            </div>
        </div>
    )
}
