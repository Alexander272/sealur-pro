import React, { FC } from "react"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { IFlangeResult, IStrengthFormulas_Flange } from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    title: string
    data: IFlangeResult
    formulas: IStrengthFormulas_Flange | undefined
}

export const FlangeData: FC<Props> = ({ title, data, formulas }) => {
    return (
        <>
            <p className={classes.text}>{title}</p>
            <ResLine
                title='Плечи действия усилий в болтах/шпильках'
                imgUrl='/image/moment/formulas/flange/b.svg'
                formula={{
                    designation: <>b</>,
                    value: formulas?.b,
                }}
                result={formatNumber(data.b)}
                units='мм'
            />
            <ResLine
                title='Плечо усилия от действия давления на фланец'
                imgUrl='/image/moment/formulas/flange/e.svg'
                formula={{
                    designation: <>e</>,
                    value: formulas?.e,
                }}
                result={formatNumber(data.e)}
                units='мм'
            />
            <ResLine
                title='Эквивалентная толщина втулки'
                imgUrl='/image/moment/formulas/flange/S.svg'
                formula={{
                    designation: (
                        <>
                            S<sub>э</sub>
                        </>
                    ),
                    value: formulas?.Se,
                }}
                result={formatNumber(data.Se)}
                units='мм'
            />
            {data.type === "welded" && (
                <>
                    <ResLine
                        title='Коэффициент зависящий от соотношения размеров конической втулки фланца'
                        imgUrl='/image/moment/formulas/flange/xi.svg'
                        formula={{
                            designation: <>&xi;</>,
                            value: formulas?.xi,
                        }}
                        result={formatNumber(data.xi)}
                    />
                    <ResLine
                        title='где'
                        imgUrl='/image/moment/formulas/flange/beta.svg'
                        formula={{
                            designation: <>&beta;</>,
                            value: formulas?.beta,
                        }}
                        result={formatNumber(data.beta)}
                    />
                    <ResLine
                        imgUrl='/image/moment/formulas/flange/x.svg'
                        formula={{
                            designation: <>x</>,
                            value: formulas?.x,
                        }}
                        result={formatNumber(data.x)}
                    />
                </>
            )}
            <ResLine
                title='где'
                imgUrl='/image/moment/formulas/flange/l0.svg'
                formula={{
                    designation: (
                        <>
                            l<sub>0</sub>
                        </>
                    ),
                    value: formulas?.l0,
                }}
                result={formatNumber(data.l0)}
                units='мм'
            />
            <ResLine
                title='Отношение наружного диаметра тарелки фланца к внутреннему диаметру'
                imgUrl='/image/moment/formulas/flange/K.svg'
                formula={{
                    designation: <>K</>,
                    value: formulas?.k,
                }}
                result={formatNumber(data.k)}
            />

            <p className={classes.text}>Расчетные коэффициенты</p>
            <ResLine
                imgUrl='/image/moment/formulas/flange/betaT.svg'
                result={formatNumber(data.betaT)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/flange/betaU.svg'
                result={formatNumber(data.betaU)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/flange/betaY.svg'
                result={formatNumber(data.betaY)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/flange/betaZ.svg'
                result={formatNumber(data.betaZ)}
            />
            <ResLine
                imgText={
                    <>
                        &beta;<sub>F</sub>
                    </>
                }
                result={formatNumber(data.betaF)}
            />
            <ResLine
                imgText={
                    <>
                        &beta;<sub>V</sub>
                    </>
                }
                result={formatNumber(data.betaV)}
            />
            <ResLine imgText={<>f</>} result={formatNumber(data.f)} />

            <ResLine
                title='Коэффициент'
                imgUrl='/image/moment/formulas/flange/lambda.svg'
                formula={{
                    designation: <>&lambda;</>,
                    value: formulas?.lymda,
                }}
                result={formatNumber(data.lymda)}
            />
            <ResLine
                title='Угловая податливость фланца при затяжке'
                imgUrl='/image/moment/formulas/flange/yf.svg'
                formula={{
                    designation: (
                        <>
                            y<sub>ф</sub>
                        </>
                    ),
                    value: formulas?.yf,
                }}
                result={formatNumber(data.yf)}
                units='1/(H*мм)'
            />

            {data.type === "free" && (
                <>
                    <ResLine
                        title='Угловая податливость кольца свободного фланца при затяжке'
                        imgUrl='/image/moment/formulas/flange/yk.svg'
                        formula={{
                            designation: (
                                <>
                                    y<sub>к</sub>
                                </>
                            ),
                            value: formulas?.yk,
                        }}
                        result={formatNumber(data.yk)}
                        units='1/(H*мм)'
                    />
                    <ResLine
                        title='где'
                        imgUrl='/image/moment/formulas/flange/psi.svg'
                        formula={{
                            designation: (
                                <>
                                    &psi;<sub>к</sub>
                                </>
                            ),
                            value: formulas?.psik,
                        }}
                        result={formatNumber(data.psik)}
                    />
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
                imgUrl='/image/moment/formulas/flange/yfn.svg'
                formula={{
                    designation: (
                        <>
                            y<sub>ф.н</sub>
                        </>
                    ),
                    value: formulas?.yfn,
                }}
                result={formatNumber(data.yfn)}
                units='1/(H*мм)'
            />
            {data.type === "free" && (
                <ResLine
                    title='для свободного фланца'
                    imgUrl='/image/moment/formulas/flange/yfc.svg'
                    formula={{
                        designation: (
                            <>
                                y<sub>ф.с</sub>
                            </>
                        ),
                        value: formulas?.yfc,
                    }}
                    result={formatNumber(data.yfc)}
                    units='1/(H*мм)'
                />
            )}
        </>
    )
}
