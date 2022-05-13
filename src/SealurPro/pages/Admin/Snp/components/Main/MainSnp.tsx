import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "../../../../../../components/UI/Select/Select"
import { AdminType } from "./components/AdminType/AdminType"
import { Dispatch, ProState } from "../../../../../store/store"
import classes from "../../../pages.module.scss"

const { Option } = Select

type Props = {}

export const MainSnp: FC<Props> = () => {
    const stfl = useSelector((state: ProState) => state.addit.stfl)
    const st = useSelector((state: ProState) => state.snp.st)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        dispatch.snp.getSnp({ st: "1", req: { standId: "1", flangeId: "1" } })
    }, [dispatch.snp])

    const stHandler = (value: string) => {
        const sf = stfl.find(s => s.id === value)
        if (sf) {
            dispatch.snp.getSnp({
                st: value,
                req: { standId: sf.standId, flangeId: sf.flangeId !== "0" ? sf.flangeId : "1" },
            })
        }
    }

    return (
        <>
            <div className={classes.line}>
                {stfl && (
                    <Select value={st} onChange={stHandler}>
                        {stfl.map(s => (
                            <Option key={s.id} value={s.id}>
                                {s.stand} / {s.flange}
                            </Option>
                        ))}
                    </Select>
                )}
                {/* <Button>Добавить</Button> */}
            </div>
            <div className={classes.group}>
                <p>Тип СНП</p>
                <div className={classes.line}>
                    <AdminType />
                </div>
            </div>
        </>
    )
}
