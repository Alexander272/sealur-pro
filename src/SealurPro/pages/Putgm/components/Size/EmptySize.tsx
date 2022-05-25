import { ChangeEvent, FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../store/store"
import { Sizes } from "./components/Sizes/Sizes"
import { InputSize } from "./components/InputSize/InputSize"
import classes from "../../../style/pages.module.scss"

const { Option } = Select

type Props = {}

export const EmptySize: FC<Props> = () => {
    const size = useSelector((state: ProState) => state.putgm.size)
    const h = useSelector((state: ProState) => state.putgm.h)
    const oh = useSelector((state: ProState) => state.putgm.oh)

    const imageUrl = useSelector((state: ProState) => state.putgm.imageUrl)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        dispatch.putgm.setSize({
            id: "empty",
            dn: "",
            pn: "",
            typePr: "",
            typeFlId: "",
            d4: "0",
            d3: "0",
            d2: "0",
            d1: "0",
            h: "3,0",
        })
    }, [dispatch.putgm])

    const changeHHandler = (value: string) => {
        let idx = size?.h.split(";").findIndex(h => h === value)
        dispatch.putgm.changeH(idx || 0)
    }

    const changeOhHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch.putgm.changeOH(event.target.value.replaceAll(".", ","))
    }

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                <InputSize />

                <div className={classes.group}>
                    <p className={classes.titleGroup}>Толщина прокладки</p>
                    <div className={classes.thic}>
                        <Select value={h} onChange={changeHHandler}>
                            {["3,0"].map(h => (
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
            <div className={`${classes.block} ${classes.putgDrawFl}`}>
                <p className={classes.titleGroup}>Чертеж прокладки</p>
                <div className={classes.blockImage}>
                    <div className={classes.imageContainer}>
                        <img
                            className={classes.image}
                            width={500}
                            height={113}
                            src={imageUrl}
                            alt='gasket drawing'
                        />
                        <Sizes
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
