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

    const stfl = useSelector((state: ProState) => state.addit.stfl)

    const sizes = useSelector((state: ProState) => state.snp.sizes)
    const snp = useSelector((state: ProState) => state.snp.snp)
    const st = useSelector((state: ProState) => state.snp.st)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        const sf = stfl.find(s => s.id === st)
        if (sf && snp?.typePr && snp.typeFlId)
            dispatch.snp.getSizes({
                flShort: sf.short,
                standId: sf.standId,
                typePr: snp.typePr,
                typeFlId: snp.typeFlId,
            })
    }, [snp?.typePr, snp?.typeFlId, stfl, st, dispatch.snp])

    const openTableHandler = () => setIsOpenTable(prev => !prev)

    // добавление сохраненных размеров
    const savedSizeHandler = (size: ISize, isNew: boolean) => {
        if (isNew) dispatch.snp.setSizes([...sizes, size])
        else {
            dispatch.snp.setSizes(
                sizes.map(s => {
                    if (s.id === size.id) return size
                    return s
                })
            )
        }
    }

    // удаление размеров
    const deleteSizeHandler = (id: string, isAll: boolean) => {
        if (isAll) dispatch.snp.setSizes([])
        else dispatch.snp.setSizes(sizes.filter(s => s.id !== id))
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
                        typePr={sizes[0].typePr}
                        stand={stfl.find(s => s.id === st) || null}
                        saveHandler={savedSizeHandler}
                        deleteHandler={deleteSizeHandler}
                    />
                </div>
            ) : null}
        </>
    )
}
