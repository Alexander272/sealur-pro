import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../../../../store/store"
import { ISNP } from "../../../../../types/snp"
import { AdminGrap } from "../../../components/AdminGrap/AdminGrap"
import { AdminMoun } from "../../../components/AdminMoun/AdminMoun"
import classes from "../../../pages.module.scss"

type Props = {}

export const Addit: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const snp = useSelector((state: ProState) => state.snp.snp)

    const dispatch = useDispatch<Dispatch>()

    // измение крепления
    const mounHandler = (values: string[]) => {
        let newSnp: ISNP = JSON.parse(JSON.stringify(snp))
        newSnp.mounting = values
        dispatch.snp.setSnp(newSnp)
    }

    // изменение графита
    const grapHandler = (values: string[]) => {
        let newSnp: ISNP = JSON.parse(JSON.stringify(snp))
        newSnp.graphite = values
        dispatch.snp.setSnp(newSnp)
    }

    return (
        <div className={classes.line}>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Крепление на вертикальном фланце</p>
                {addit?.mounting && (
                    <AdminMoun
                        className={classes.list}
                        classItem={classes.listItem}
                        moun={snp?.mounting || []}
                        onChange={mounHandler}
                    />
                )}
            </div>
            <div className={classes.fil}>
                <p className={classes.titleGroup}>Степень чистоты графитовой составляющей</p>
                {addit?.graphite && (
                    <AdminGrap
                        className={classes.list}
                        classItem={classes.listItem}
                        graphite={snp?.graphite || []}
                        onChange={grapHandler}
                    />
                )}
            </div>
        </div>
    )
}
