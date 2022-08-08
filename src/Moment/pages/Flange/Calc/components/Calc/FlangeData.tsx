import React, { FC } from "react"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { IFlangeResult, IFormulas } from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    title: string
    data: IFlangeResult
    formulas: IFormulas | undefined
}

export const FlangeData: FC<Props> = ({ title, data, formulas }) => {
    return (
        <>
            <p className={classes.text}>{title}</p>
            <ResLine
                title='Плечи действия усилий в болтах/шпильках'
                imgUrl='/image/moment/formulas/b.svg'
                formula={{
                    designation: <>b</>,
                    value: formulas?.A,
                }}
                //TODO
                result={formatNumber(data.c)}
                units='мм'
            />
            <ResLine
                title='Плечо усилия от действия давления на фланец'
                imgUrl='/image/moment/formulas/e.svg'
                formula={{
                    designation: <>e</>,
                    value: formulas?.A,
                }}
                //TODO
                result={formatNumber(data.c)}
                units='мм'
            />
            <ResLine
                title='Эквивалентная толщина втулки'
                imgUrl='/image/moment/formulas/S.svg'
                formula={{
                    designation: (
                        <>
                            S<sub>э</sub>
                        </>
                    ),
                    value: formulas?.A,
                }}
                //TODO
                result={formatNumber(data.c)}
                units='мм'
            />
            {data.type === "welded" && (
                <>
                    <ResLine
                        title='Коэффициент зависящий от соотношения размеров конической втулки фланца'
                        imgUrl='/image/moment/formulas/xi.svg'
                        formula={{
                            designation: <>&xi;</>,
                            value: formulas?.A,
                        }}
                        //TODO
                        result={formatNumber(data.c)}
                    />
                    <ResLine
                        title='где'
                        imgUrl='/image/moment/formulas/beta.svg'
                        formula={{
                            designation: <>&beta;</>,
                            value: formulas?.A,
                        }}
                        //TODO
                        result={formatNumber(data.c)}
                    />
                    <ResLine
                        imgUrl='/image/moment/formulas/x.svg'
                        formula={{
                            designation: <>x</>,
                            value: formulas?.A,
                        }}
                        //TODO
                        result={formatNumber(data.c)}
                    />
                </>
            )}
            <ResLine
                title='где'
                imgUrl='/image/moment/formulas/l0.svg'
                formula={{
                    designation: (
                        <>
                            l<sub>0</sub>
                        </>
                    ),
                    value: formulas?.A,
                }}
                //TODO
                result={formatNumber(data.c)}
                units='мм'
            />
            <ResLine
                title='Отношение наружного диаметра тарелки фланца к внутреннему диаметру'
                imgUrl='/image/moment/formulas/K.svg'
                formula={{
                    designation: <>K</>,
                    value: formulas?.A,
                }}
                //TODO
                result={formatNumber(data.c)}
            />

            <p className={classes.text}>Расчетные коэффициенты</p>
            <ResLine
                imgUrl='/image/moment/formulas/betaT.svg'
                //TODO
                result={formatNumber(data.c)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/betaU.svg'
                //TODO
                result={formatNumber(data.c)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/betaY.svg'
                //TODO
                result={formatNumber(data.c)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/betaZ.svg'
                //TODO
                result={formatNumber(data.c)}
            />
            <ResLine
                imgText={
                    <>
                        &beta;<sub>F</sub>
                    </>
                }
                //TODO
                result={formatNumber(data.c)}
            />
            <ResLine
                imgText={
                    <>
                        &beta;<sub>V</sub>
                    </>
                }
                //TODO
                result={formatNumber(data.c)}
            />
            <ResLine
                imgText={<>f</>}
                //TODO
                result={formatNumber(data.c)}
            />

            <ResLine
                title='Коэффициент'
                imgUrl='/image/moment/formulas/lambda.svg'
                formula={{
                    designation: <>&lambda;</>,
                    value: formulas?.A,
                }}
                //TODO
                result={formatNumber(data.c)}
            />
            <ResLine
                title='Угловая податливость фланца при затяжке'
                imgUrl='/image/moment/formulas/yf.svg'
                formula={{
                    designation: (
                        <>
                            y<sub>ф</sub>
                        </>
                    ),
                    value: formulas?.A,
                }}
                //TODO
                result={formatNumber(data.c)}
                units='1/(H*мм)'
            />

            {data.type === "free" && (
                <>
                    <ResLine
                        title='Угловая податливость кольца свободного фланца при затяжке'
                        imgUrl='/image/moment/formulas/yk.svg'
                        formula={{
                            designation: (
                                <>
                                    y<sub>к</sub>
                                </>
                            ),
                            value: formulas?.A,
                        }}
                        //TODO
                        result={formatNumber(data.c)}
                        units='1/(H*мм)'
                    />
                    {/* //TODO тут еще одна формула дожна быть */}
                </>
            )}

            <p className={classes.text}>
                Угловая податливость фланца нагруженного внешним изгибающим моментом
            </p>
            <ResLine
                title={`${
                    data.type !== "free"
                        ? "для фланцев приварных встык и плоских"
                        : "для бурта свободного фланца"
                }`}
                imgUrl='/image/moment/formulas/yfn.svg'
                formula={{
                    designation: (
                        <>
                            y<sub>ф.н</sub>
                        </>
                    ),
                    value: formulas?.A,
                }}
                //TODO
                result={formatNumber(data.c)}
                units='1/(H*мм)'
            />
            {data.type === "free" && (
                <ResLine
                    title='для свободного фланца'
                    imgUrl='/image/moment/formulas/yfc.svg'
                    formula={{
                        designation: (
                            <>
                                y<sub>ф.с</sub>
                            </>
                        ),
                        value: formulas?.A,
                    }}
                    //TODO
                    result={formatNumber(data.c)}
                    units='1/(H*мм)'
                />
            )}
        </>
    )
}
