import React, { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs } from "../../../../../components/Tabs/Tabs"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../store/store"
import { Sizes } from "./components/Sizes/Sizes"

import classes from "../../../style/pages.module.scss"
import { ISize } from "../../../../types/size"

type Props = {}

const { Option } = Select

const imageUrls = {
    Round: "",
    Oval: "/image/ov.webp",
    Rectangular: "/image/pr.webp",
}

const types = [
    {
        type: "dimen",
        title: "Габариты",
    },
    {
        type: "field",
        title: "Поле",
    },
]

export const AnotherSize: FC<Props> = () => {
    const form = useSelector((state: ProState) => state.putg.form)
    // const pn = useSelector((state: ProState) => state.putg.pn)
    const h = useSelector((state: ProState) => state.putg.h)
    const oh = useSelector((state: ProState) => state.putg.oh)
    const imageUrl = useSelector((state: ProState) => state.putg.imageUrl)
    const putg = useSelector((state: ProState) => state.putg.putg)

    const size = useSelector((state: ProState) => state.putg.size)

    const dispatch = useDispatch<Dispatch>()

    const [type, setType] = useState<"dimen" | "field">("dimen")

    useEffect(() => {
        dispatch.putg.getSizes({
            flShort: "putg",
            typePr: `${form}-${type}`,
            typeFlId: putg?.typeFlId || "1",
            standId: "0",
        })
    }, [dispatch.putg, form, type, putg?.typePr, putg?.typeFlId])

    const changeTypeHandler = (type: string) => {
        setType(type as "dimen")
    }

    // const changePnHandler = (value: string) => {
    //     dispatch.putg.setPn(value)
    // }

    const changeSizeHandler =
        (name: "d4" | "d3" | "d2" | "d1") => (event: React.ChangeEvent<HTMLInputElement>) => {
            let newSize: ISize = JSON.parse(JSON.stringify(size))
            newSize[name] = event.target.value

            dispatch.putg.setSize(newSize)
        }

    const changeHHandler = (value: string) => {
        let idx = size?.h.split(";").findIndex(h => h === value)
        dispatch.putg.changeH(idx || 0)
    }

    const changeOhHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch.putg.changeOH(event.target.value.replaceAll(".", ","))
    }

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                {/* <div className={classes.group}>
                    <p className={classes.titleGroup}>Давление, PN</p>
                    <Select value={pn} onChange={changePnHandler}>
                        {size?.pn.split(";").map(pn => {
                            return (
                                <Option key={pn} value={pn}>
                                    {pn}
                                </Option>
                            )
                        })}
                    </Select>
                </div> */}

                <div className={classes.group}>
                    <Tabs initWidth={94} onClick={changeTypeHandler}>
                        {types.map(t => (
                            <p
                                key={t.type}
                                className={[
                                    classes.variants,
                                    type === t.type ? classes.active : null,
                                ].join(" ")}
                                data-type={t.type}
                            >
                                {t.title}
                            </p>
                        ))}
                    </Tabs>
                </div>

                {type === "dimen" && (
                    <>
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>A1</p>
                            <Input
                                name='d4'
                                type='number'
                                value={size?.d4 && !isNaN(+size?.d4) ? size?.d4 : ""}
                                onChange={changeSizeHandler("d4")}
                            />
                        </div>
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>A2</p>
                            <Input
                                name='d3'
                                type='number'
                                value={size?.d3 && !isNaN(+size?.d3) ? size?.d3 : ""}
                                onChange={changeSizeHandler("d3")}
                            />
                        </div>
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>B1</p>
                            <Input
                                name='d2'
                                type='number'
                                value={size?.d2 && !isNaN(+size?.d2) ? size?.d2 : ""}
                                onChange={changeSizeHandler("d2")}
                            />
                        </div>
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>B2</p>
                            <Input
                                name='d1'
                                type='number'
                                value={size?.d1 && !isNaN(+size?.d1) ? size?.d1 : ""}
                                onChange={changeSizeHandler("d1")}
                            />
                        </div>
                    </>
                )}
                {type === "field" && (
                    <>
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>A1</p>
                            <Input
                                name='d3'
                                type='number'
                                value={size?.d3 && !isNaN(+size?.d3) ? size?.d3 : ""}
                                onChange={changeSizeHandler("d3")}
                            />
                        </div>
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>B1</p>
                            <Input
                                name='d2'
                                type='number'
                                value={size?.d2 && !isNaN(+size?.d2) ? size?.d2 : ""}
                                onChange={changeSizeHandler("d2")}
                            />
                        </div>
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>C</p>
                            <Input
                                name='d1'
                                type='number'
                                value={size?.d1 && !isNaN(+size?.d1) ? size?.d1 : ""}
                                onChange={changeSizeHandler("d1")}
                            />
                        </div>
                    </>
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
            <div className={`${classes.block} ${classes.snpDraw}`}>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Чертеж прокладки</p>
                    <div className={classes.blockImage}>
                        <img
                            className={classes.image}
                            width={500}
                            height={103}
                            src={imageUrl}
                            alt='gasket drawing'
                        />
                    </div>
                </div>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Размеры прокладки</p>
                    <div className={classes.blockImage}>
                        <div className={classes.drawingContainer}>
                            <img
                                className={classes.image}
                                width={500}
                                height={378}
                                src={imageUrls[form]}
                                alt='gasket drawing'
                            />
                            <Sizes
                                form={form}
                                type={type}
                                d1={size?.d1 || "0"}
                                d2={size?.d2 || "0"}
                                d3={size?.d3 || "0"}
                                d4={size?.d4 || "0"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
