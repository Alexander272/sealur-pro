import { ChangeEvent, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../../../store/store"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Excretion } from "./components/Excretion/Excretion"
import { Sizes } from "./components/Sizes/Sizes"
import classes from "../../../style/pages.module.scss"
import { ISize } from "../../../../types/size"

const imgUrls = {
    Д: "/image/snp/SNP-P-E.webp",
    Г: "/image/snp/SNP-P-D.webp",
    В: "/image/snp/SNP-P-C.webp",
    Б: "/image/snp/SNP-P-AB.webp",
    А: "/image/snp/SNP-P-AB.webp",
}

const { Option } = Select

type Props = {}

export const AnotherSize: FC<Props> = () => {
    const loading = useSelector((state: ProState) => state.snp.loading)

    const size = useSelector((state: ProState) => state.snp.size)
    const h = useSelector((state: ProState) => state.snp.h)
    const oh = useSelector((state: ProState) => state.snp.oh)
    const s2 = useSelector((state: ProState) => state.snp.s2)
    const s3 = useSelector((state: ProState) => state.snp.s3)

    const st = useSelector((state: ProState) => state.snp.st)
    const typePr = useSelector((state: ProState) => state.snp.snp?.typePr)

    const isOpenFr = useSelector((state: ProState) => state.snp.isOpenFr)
    const isOpenIr = useSelector((state: ProState) => state.snp.isOpenIr)
    const isOpenOr = useSelector((state: ProState) => state.snp.isOpenOr)

    const { snp } = useDispatch<Dispatch>()

    if (loading) return null

    const changeSizeHandler =
        (name: "d4" | "d3" | "d2" | "d1") => (event: React.ChangeEvent<HTMLInputElement>) => {
            let newSize: ISize = JSON.parse(JSON.stringify(size))
            newSize[name] = event.target.value

            snp.setSize(newSize)
        }

    const changeHHandler = (value: string) => {
        let idx = size?.h.split(";").findIndex(h => h === value)
        snp.changeH(idx || 0)
    }

    const changeOhHandler = (event: ChangeEvent<HTMLInputElement>) => {
        snp.changeOH(event.target.value.replaceAll(".", ","))
    }

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                {size?.d4 && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>D4, мм</p>
                        <Input
                            name='d4'
                            type='number'
                            value={size?.d4}
                            onChange={changeSizeHandler("d4")}
                        />
                    </div>
                )}
                <div className={classes.group}>
                    <p className={classes.titleGroup}>D3, мм</p>
                    <Input
                        name='d3'
                        type='number'
                        value={size?.d3}
                        onChange={changeSizeHandler("d3")}
                    />
                </div>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>D2, мм</p>
                    <Input
                        name='d2'
                        type='number'
                        value={size?.d2}
                        onChange={changeSizeHandler("d2")}
                    />
                </div>
                {size?.d1 && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>D1, мм</p>
                        <Input
                            name='d1'
                            type='number'
                            value={size?.d1}
                            onChange={changeSizeHandler("d1")}
                        />
                    </div>
                )}

                <div className={classes.group}>
                    <p className={classes.titleGroup}>Толщина прокладки</p>
                    <div className={classes.thic}>
                        <Select value={h} onChange={changeHHandler}>
                            {size?.h.split(";").map(h => (
                                <Option key={h} value={h}>
                                    {h}
                                </Option>
                            ))}
                            <Option value='др.'>др.</Option>
                        </Select>
                        {h === "др." && (
                            <Input
                                placeholder='толщина'
                                min={0.1}
                                step={0.1}
                                value={oh.replaceAll(",", ".")}
                                type='number'
                                name='thickness'
                                onChange={changeOhHandler}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className={`${classes.block} ${classes.snpDrawFl}`}>
                <p className={classes.titleGroup}>Чертеж прокладки</p>
                <div className={`${classes.blockImage}`}>
                    <div className={classes.imageContainer}>
                        <img
                            className={classes.image}
                            width={470}
                            height={200}
                            src={imgUrls[(typePr as "Д") || "Д"]}
                            alt='gasket drawing'
                        />
                        {/* Элементы отвечающие за подкраску участков прокладки */}
                        <Excretion
                            typePr={typePr || ""}
                            isOpenFr={isOpenFr}
                            isOpenIr={isOpenIr}
                            isOpenOr={isOpenOr}
                        />

                        {/* Вывод размеров */}
                        <Sizes
                            typePr={typePr || ""}
                            h={h}
                            oh={oh}
                            s2={s2}
                            s3={s3}
                            st={st}
                            d1={size?.d1 || "0"}
                            d2={size?.d2 || "0"}
                            d3={size?.d3 || "0"}
                            d4={size?.d4 || "0"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
