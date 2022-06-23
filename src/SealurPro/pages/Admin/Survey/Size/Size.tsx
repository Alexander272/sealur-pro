import { FC, useCallback, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../../../components/UI/Button/Button"
import { Select } from "../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../store/store"
import { ISizeInt, TypeFields } from "../../../../types/survey"
import { SizeTable } from "./SizeTable"
import classes from "../../pages.module.scss"
import SurveyAdminService from "../../../../service/surveyAdmin"

const { Option } = Select

type Props = {}

export const Size: FC<Props> = () => {
    const [isOpenTable, setIsOpenTable] = useState(false)

    const sizes = useSelector((state: ProState) => state.survey.sizes)
    const flanges = useSelector((state: ProState) => state.addit.fl)
    const typeFls = useSelector((state: ProState) => state.addit.typeFl)

    const flange = useSelector((state: ProState) => state.survey.type.flange)
    const typeFl = useSelector((state: ProState) => state.survey.type.typeFl)

    const { survey } = useDispatch<Dispatch>()

    const getAllSizes = useCallback(async () => {
        if (flange && typeFl) {
            const sizes = await SurveyAdminService.getAllSizes(flange, typeFl)
            survey.setSizes(sizes.data.sizes)
        }
    }, [flange, typeFl, survey])

    useLayoutEffect(() => {
        getAllSizes()
        // survey.getSizes({ flange: flange, typeFl: "1", row: 1 })
    }, [getAllSizes])

    const openTableHandler = () => setIsOpenTable(prev => !prev)

    const changeTypeDataHandler = (field: TypeFields) => (value: string) => {
        survey.setTypeData({ field, value })
    }
    // const changeRowHandler = (type: string) => {
    //     survey.setRow(+type as 1)
    // }

    // добавление сохраненных размеров
    const savedSizeHandler = (size: ISizeInt, isNew: boolean) => {
        if (isNew) survey.setSizes([...sizes, size])
        else {
            survey.setSizes(
                sizes.map(s => {
                    if (s.id === size.id) return size
                    return s
                })
            )
        }
    }

    // удаление размеров
    const deleteSizeHandler = (id: string, isAll: boolean) => {
        if (isAll) survey.setSizes([])
        else survey.setSizes(sizes.filter(s => s.id !== id))
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
                    <div className={classes.line} />
                    <div className={classes.line}>
                        <div className={classes.fil}>
                            <Select value={flange} onChange={changeTypeDataHandler("flange")}>
                                {flanges.map(f => (
                                    <Option key={f.id} value={f.id}>
                                        {f.title}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className={classes.fil}>
                            <Select value={typeFl} onChange={changeTypeDataHandler("typeFl")}>
                                {typeFls.map(f => (
                                    <Option key={f.id} value={f.id}>
                                        {f.title}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        {/* <div className={classes.fil}>
                            {flange === "1" || (flange === "3" && typeFl !== "1") ? (
                                <div className={classes.field}>
                                    <Tabs
                                        initWidth={initTabs[row].width}
                                        initPos={initTabs[row].pos}
                                        onClick={changeRowHandler}
                                    >
                                        <p
                                            className={[
                                                classes.variants,
                                                row === 1 ? classes.active : "",
                                            ].join(" ")}
                                            data-type='1'
                                        >
                                            Ряд 1
                                        </p>
                                        <p
                                            className={[
                                                classes.variants,
                                                row === 2 ? classes.active : "",
                                            ].join(" ")}
                                            data-type='2'
                                        >
                                            Ряд 2
                                        </p>
                                    </Tabs>
                                </div>
                            ) : null}
                        </div> */}
                    </div>
                    <SizeTable
                        data={sizes}
                        flange={flange}
                        typeFl={typeFl}
                        saveHandler={savedSizeHandler}
                        deleteHandler={deleteSizeHandler}
                    />
                    {/* <SizeTable
                        data={sizes}
                        typePr={sizes[0]?.typePr}
                        stand={stfl.find(s => s.id === st) || null}
                        saveHandler={savedSizeHandler}
                        deleteHandler={deleteSizeHandler}
                    /> */}
                </div>
            ) : null}
        </>
    )
}
