import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../../components/UI/Button/Button"
import { List } from "../../../../components/UI/List/List"
import { Select } from "../../../../components/UI/Select/Select"
import ReadService from "../../../../service/read"
import { Dispatch, RootState } from "../../../../store/store"
import { IStand } from "../../../../types/stand"
import classes from "./pages.module.scss"

const { Item } = List
const { Option } = Select

export default function SNP() {
    const fl = useSelector((state: RootState) => state.addit.fl)
    const stfl = useSelector((state: RootState) => state.addit.stfl)
    const [stand, setStand] = useState<IStand[]>([])

    const dispatch = useDispatch<Dispatch>()

    const fetchStand = useCallback(async () => {
        const res = await ReadService.getStand()
        setStand(res.data)
    }, [])

    useEffect(() => {
        fetchStand()
    }, [fetchStand])

    useEffect(() => {
        if (!fl.length) dispatch.addit.getFl()
        if (!stfl.length) dispatch.addit.getStFl()
    }, [fl.length, stfl.length, dispatch.addit])

    return (
        <div className={classes.page}>
            {/* <div className={classes.line}>
                <List title='Стандарт на прокладку'>
                    {stand.map(s => (
                        <Item key={s.id}>{s.title}</Item>
                    ))}
                </List>
                <List title='Стандарт на фланец'>
                    {fl.map(f => (
                        <Item key={f.id}>{f.title}</Item>
                    ))}
                </List>
            </div>*/}
            <div className={classes.line}>
                {stfl && (
                    <Select value='1' onChange={() => {}}>
                        {stfl.map(s => (
                            <Option key={s.id} value={s.id}>
                                {s.stand} / {s.flange}
                            </Option>
                        ))}
                    </Select>
                )}
                {/* <Button>Добавить</Button> */}
            </div>
        </div>
    )
}
