import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../../../../components/UI/Button/Button"
import { SizeTable } from "../../../../../components/SizeTable/SizeTable"
import { Dispatch, ProState } from "../../../../../store/store"
import { ISize } from "../../../../../types/size"
import classes from "../../../pages.module.scss"

type Props = {}

export const Size: FC<Props> = () => {
    const [isOpenTable, setIsOpenTable] = useState(false)

    const flanges = useSelector((state: ProState) => state.addit.fl)

    const sizes = useSelector((state: ProState) => state.putgm.sizes)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const flange = useSelector((state: ProState) => state.putgm.flange)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        const fl = flanges.find(f => f.id === flange)
        if (fl && putgm?.typePr && putgm?.typeFlId)
            dispatch.putgm.getAllSizes({
                flShort: fl.short,
                standId: "0",
                typePr: putgm.typePr,
                typeFlId: putgm.typeFlId,
            })
    }, [putgm?.typePr, putgm?.typeFlId, flanges, flange, dispatch.putgm])

    const openTableHandler = () => setIsOpenTable(prev => !prev)

    // добавление сохраненных размеров
    const savedSizeHandler = (size: ISize, isNew: boolean) => {
        if (isNew) dispatch.putgm.setSizes([...sizes, size])
        else {
            dispatch.putgm.setSizes(
                sizes.map(s => {
                    if (s.id === size.id) return size
                    return s
                })
            )
        }
    }

    // удаление размеров
    const deleteSizeHandler = (id: string, isAll: boolean) => {
        if (isAll) dispatch.putgm.setSizes([])
        else dispatch.putgm.setSizes(sizes.filter(s => s.id !== id))
    }

    return (
        <>
            <Button rounded='round' variant='grayPrimary' onClick={openTableHandler}>
                Размеры
            </Button>

            {isOpenTable ? (
                <div className={classes.table}>
                    <div className={classes.header}>
                        <h5>Размеры</h5>
                        <p onClick={openTableHandler}>&times;</p>
                    </div>
                    <SizeTable
                        data={sizes}
                        typePr={sizes[0]?.typePr}
                        stand={
                            {
                                short: flanges.find(f => f.id === flange)?.short || "",
                                standId: "0",
                            } || null
                        }
                        saveHandler={savedSizeHandler}
                        deleteHandler={deleteSizeHandler}
                    />
                </div>
            ) : null}
        </>
    )
}
