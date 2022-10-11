import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { IResFloat } from "../../../../../types/res_float"
import { formatNumber } from "../../../../../utils/format"

type Props = {
    result: IResFloat
}

const b0Urls = {
    "true-true": "/image/moment/formulas/float/b0.svg",
    "true-false": "/image/moment/formulas/float/b0.svg",
    "false-true": "/image/moment/formulas/flange/b0-oval.svg",
    "false-false": "/image/moment/formulas/flange/b0.svg",
}

const DcpUrls = {
    "true-true": "/image/moment/formulas/float/Dcp.svg",
    "true-false": "/image/moment/formulas/float/Dcp.svg",
    "false-true": "/image/moment/formulas/flange/Dcp-oval.svg",
    "false-false": "/image/moment/formulas/flange/Dcp.svg",
}

export const Auxiliary: FC<Props> = ({ result }) => {
    return (
        <Container title='Расчет вспомогательных величин'>
            <ResLine
                title='Эффективная ширина прокладки'
                imgUrl={
                    b0Urls[`${result.data.hasThorn || false}-${result.gasket.type !== "Мягкая"}`]
                }
                formula={{
                    designation: (
                        <>
                            b<sub>0</sub>
                        </>
                    ),
                    value: result.formulas?.b0,
                }}
                result={formatNumber(result.calc.b0)}
                units='мм'
            />
            <ResLine
                title='Расчетный диаметр прокладки'
                imgUrl={
                    DcpUrls[`${result.data.hasThorn || false}-${result.gasket.type !== "Мягкая"}`]
                }
                formula={{
                    designation: (
                        <>
                            D<sub>сп</sub>
                        </>
                    ),
                    value: result.formulas?.Dcp,
                }}
                result={formatNumber(result.calc.Dcp)}
                units='мм'
            />
            <ResLine
                title='Податливость прокладки'
                imgUrl={"/image/moment/formulas/flange/yp.svg"}
                formula={{
                    designation: (
                        <>
                            y<sub>п</sub>
                        </>
                    ),
                    value: result.formulas?.yp,
                }}
                result={formatNumber(result.calc.yp)}
                units='мм/Н'
            />
            <ResLine
                title='Податливость болтов/шпилек'
                imgUrl={"/image/moment/formulas/flange/yb.svg"}
                formula={{
                    designation: (
                        <>
                            y<sub>б</sub>
                        </>
                    ),
                    value: result.formulas?.yb,
                }}
                result={formatNumber(result.calc.yb)}
                units='мм/Н'
            />
            <ResLine
                title='где'
                imgUrl={
                    result.data.type === "Шпилька"
                        ? "/image/moment/formulas/flange/Lb1.svg"
                        : "/image/moment/formulas/flange/Lb2.svg"
                }
                formula={{
                    designation: (
                        <>
                            L<sub>б</sub>
                        </>
                    ),
                    value: result.formulas?.Lb,
                }}
                result={formatNumber(result.calc.Lb)}
                units='мм'
            />
            <ResLine
                title='Суммарная площадь сечения болтов/шпилек по внутреннему диаметру резьбы или нагруженному сечению наименьшего диаметра'
                imgUrl='/image/moment/formulas/flange/a.svg'
                formula={{
                    designation: (
                        <>
                            A<sub>в</sub>
                        </>
                    ),
                    value: result.formulas?.A,
                }}
                result={formatNumber(result.calc.A)}
                units='мм&#178;'
            />

            <ResLine
                title='Плечи действия усилий в болтах/шпильках'
                imgUrl='/image/moment/formulas/flange/b.svg'
                formula={{
                    designation: <>b</>,
                    value: result.formulas?.flange.b,
                }}
                result={formatNumber(result.flange.b)}
                units='мм'
            />
            <ResLine
                title='Параметр длины обечайки'
                imgUrl='/image/moment/formulas/float/l0.svg'
                formula={{
                    designation: (
                        <>
                            l<sub>0</sub>
                        </>
                    ),
                    value: result.formulas?.flange.l0,
                }}
                result={formatNumber(result.flange.l0)}
                units='мм'
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
                    value: result.formulas?.flange.y,
                }}
                result={formatNumber(result.flange.y)}
                units='1/(H*мм)'
            />

            <ResLine
                title='Угловая податливость фланца со сферической неотбортованной крышкой'
                imgUrl='/image/moment/formulas/cap/ykr1.svg'
                formula={{
                    designation: (
                        <>
                            у<sub>кр</sub>
                        </>
                    ),
                    value: result.formulas?.cap.y,
                }}
                result={formatNumber(result.cap.y)}
                units='1/(H.мм)'
            />
            <ResLine
                title='где'
                imgUrl='/image/moment/formulas/cap/lambda.svg'
                formula={{
                    designation: (
                        <>
                            &lambda;<sub>1</sub>
                        </>
                    ),
                    value: result.formulas?.cap.lambda,
                }}
                result={formatNumber(result.cap.lambda)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/cap/omega.svg'
                formula={{
                    designation: (
                        <>
                            &omega;<sub>1</sub>
                        </>
                    ),
                    value: result.formulas?.cap.omega,
                }}
                result={formatNumber(result.cap.omega)}
            />

            <ResLine
                title='Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой'
                imgUrl={
                    result.gasket.type === "Мягкая"
                        ? "/image/moment/formulas/float/alpha1.svg"
                        : "/image/moment/formulas/float/alpha.svg"
                }
                formula={{
                    designation: <>&alpha;</>,
                    value: result.formulas?.alpha,
                }}
                result={formatNumber(result.calc.alpha)}
            />
        </Container>
    )
}
