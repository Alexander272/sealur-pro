import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import {
    IBoltResult,
    ICalculate,
    IDataResult,
    IFlangeResult,
    IFormulas,
    IGasketResult,
} from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { alphaMLink } from "./ForcesInBolts"
import { FlangeData } from "./FlangeData"

type Props = {
    data: ICalculate
    basis: IDataResult
    gasket: IGasketResult
    flanges: IFlangeResult[]
    bolt: IBoltResult
    formulas: IFormulas | undefined
    typeAlpha: string
}

export const Auxiliary: FC<Props> = ({
    data,
    basis,
    gasket,
    flanges,
    bolt,
    formulas,
    typeAlpha,
}) => {
    return (
        <Container title='Расчет вспомогательных величин'>
            <ResLine
                title='Эффективная ширина прокладки'
                imgUrl={
                    gasket.type === "Восьмигранная"
                        ? "/image/moment/formulas/b0-oval.svg"
                        : "/image/moment/formulas/b0.svg"
                }
                formula={{
                    designation: (
                        <>
                            b<sub>0</sub>
                        </>
                    ),
                    value: formulas?.b0,
                }}
                result={formatNumber(data.b0)}
                units='мм'
            />
            <ResLine
                title='Расчетный диаметр прокладки'
                imgUrl={
                    gasket.type === "Восьмигранная"
                        ? "/image/moment/formulas/Dcp-oval.svg"
                        : "/image/moment/formulas/Dcp.svg"
                }
                formula={{
                    designation: (
                        <>
                            D<sub>сп</sub>
                        </>
                    ),
                    value: formulas?.Dcp,
                }}
                result={formatNumber(data.Dsp)}
                units='мм'
            />
            <ResLine
                title='Податливость прокладки'
                imgUrl={"/image/moment/formulas/yp.svg"}
                formula={{
                    designation: (
                        <>
                            y<sub>п</sub>
                        </>
                    ),
                    value: formulas?.strength?.yp,
                }}
                result={formatNumber(data.strength.yp)}
                units='мм/Н'
            />
            <ResLine
                title='Площадь поперечного сечения болта/шпильки по внутреннему диаметру резьбы или наружному сечению наименьшего диаметра'
                imgText={
                    <>
                        f<sub>б</sub>
                    </>
                }
                result={formatNumber(bolt.area)}
                units='мм&#178;'
            />
            <ResLine
                title='Податливость болтов/шпилек'
                imgUrl={"/image/moment/formulas/yb.svg"}
                formula={{
                    designation: (
                        <>
                            y<sub>б</sub>
                        </>
                    ),
                    value: formulas?.strength?.yb,
                }}
                result={formatNumber(data.strength.yb)}
                units='мм/Н'
            />
            <ResLine
                title='где'
                imgUrl={
                    basis.type === "Шпилька"
                        ? "/image/moment/formulas/Lb1.svg"
                        : "/image/moment/formulas/Lb2.svg"
                }
                formula={{
                    designation: (
                        <>
                            L<sub>б</sub>
                        </>
                    ),
                    value: formulas && formulas?.strength.Lb,
                }}
                result={formatNumber(data.strength.Lb)}
                units='мм'
            />
            <ResLine
                title='Суммарная площадь сечения болтов/шпилек по внутреннему диаметру резьбы или нагруженному сечению наименьшего диаметра'
                imgUrl='/image/moment/formulas/a.svg'
                formula={{
                    designation: (
                        <>
                            A<sub>в</sub>
                        </>
                    ),
                    value: formulas?.A,
                }}
                result={formatNumber(data.A)}
                units='мм&#178;'
            />

            {
                <FlangeData
                    title='- для первого фланца'
                    data={flanges[0]}
                    formulas={formulas?.strength?.flange[0]}
                />
            }
            {flanges.length > 1 && (
                <FlangeData
                    title='- для второго фланца'
                    data={flanges[1]}
                    formulas={formulas?.strength?.flange[1]}
                />
            )}

            <ResLine
                title='Жесткость фланцевого соединения'
                imgUrl='/image/moment/formulas/gamma.svg'
                formula={{
                    designation: <>&gamma;</>,
                    value: formulas?.strength.gamma,
                }}
                result={formatNumber(data.strength.gamma)}
                units='H/мм'
            />

            <ResLine
                title='Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой'
                imgUrl='/image/moment/formulas/alpha1.svg'
                formula={{
                    designation: <>&alpha;</>,
                    value: formulas?.alpha,
                }}
                result={formatNumber(data.alpha)}
            />

            <ResLine
                title='Коэффициент жесткости фланцевого соединения нагруженного внешним изгибающим моментом'
                imgUrl={alphaMLink[typeAlpha as "true-flat"]}
                formula={{
                    designation: (
                        <>
                            &alpha;<sub>м</sub>
                        </>
                    ),
                    value: formulas?.alphaM,
                }}
                result={formatNumber(data.alphaM)}
            />
        </Container>
    )
}
