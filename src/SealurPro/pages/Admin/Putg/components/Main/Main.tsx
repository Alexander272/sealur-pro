import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "../../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../../store/store"
import classes from "../../../pages.module.scss"

const { Option } = Select

type Props = {}

export const Main: FC<Props> = () => {
    const flanges = useSelector((state: ProState) => state.addit.fl)
    const flange = useSelector((state: ProState) => state.putg.flange)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        dispatch.putg.getPutg({ flange: "1", req: { standId: "0", flangeId: "1" } })
    }, [dispatch.putg])

    const flHandler = (value: string) => {
        dispatch.putg.getPutg({ flange: value, req: { standId: "0", flangeId: value } })
    }

    return (
        <>
            <div className={classes.line}>
                {flanges && (
                    <Select value={flange} onChange={flHandler}>
                        {flanges.map(f => (
                            <Option key={f.id} value={f.id}>
                                {f.title}
                            </Option>
                        ))}
                    </Select>
                )}
                {/* <Button>Добавить</Button> */}
            </div>
        </>
    )
}
