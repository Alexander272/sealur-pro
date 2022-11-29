import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import {
    IAuxiliary,
    IDataResult,
    IFlangeResult,
    IAuxiliaryFormulas,
    IGasketResult,
} from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { alphaMLink } from "./ForcesInBolts"
import { FlangeData } from "./FlangeData"

type Props = {
    data: IAuxiliary
    basis: IDataResult
    gasket: IGasketResult
    flanges: IFlangeResult[]
    formulas?: IAuxiliaryFormulas
    typeAlpha: string
    typeGamma: string
}

const GammaLinks = {
    "Gamma-any": "/image/moment/formulas/flange/gamma.svg",
    "Gamma-free": "/image/moment/formulas/flange/gamma-free.svg",
    "Gamma-free-any": "/image/moment/formulas/flange/gamma-first.svg",
    "Gamma-any-free": "/image/moment/formulas/flange/gamma-second.svg",
    "Gamma-free-free": "/image/moment/formulas/flange/gamma-free.svg",
}

export const Auxiliary: FC<Props> = ({
    data,
    basis,
    gasket,
    flanges,
    formulas,
    typeAlpha,
    typeGamma,
}) => {
    return (
        <Container title='Расчет вспомогательных величин'>
            <ResLine
                title='Эффективная ширина прокладки'
                imgUrl={
                    gasket.type === "Oval"
                        ? "/image/moment/formulas/flange/b0-oval.svg"
                        : "/image/moment/formulas/flange/b0.svg"
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
                    gasket.type === "Oval"
                        ? "/image/moment/formulas/flange/Dcp-oval.svg"
                        : "/image/moment/formulas/flange/Dcp.svg"
                }
                formula={{
                    designation: (
                        <>
                            D<sub>сп</sub>
                        </>
                    ),
                    value: formulas?.Dcp,
                }}
                result={formatNumber(data.Dcp)}
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
                    value: formulas?.yp,
                }}
                result={formatNumber(data.yp)}
                units='мм/Н'
            />
            <ResLine
                title='Площадь поперечного сечения болта/шпильки по внутреннему диаметру резьбы или наружному сечению наименьшего диаметра'
                imgText={
                    <>
                        f<sub>б</sub>
                    </>
                }
                result={formatNumber(data.A)}
                units='мм&#178;'
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
                    value: formulas?.yb,
                }}
                result={formatNumber(data.yb)}
                units='мм/Н'
            />
            <ResLine
                title='где'
                imgUrl={
                    basis.type === "Шпилька"
                        ? "/image/moment/formulas/flange/Lb1.svg"
                        : "/image/moment/formulas/flange/Lb2.svg"
                }
                formula={{
                    designation: (
                        <>
                            L<sub>б</sub>
                        </>
                    ),
                    value: formulas && formulas?.Lb,
                }}
                result={formatNumber(data.Lb)}
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
                    value: formulas?.A,
                }}
                result={formatNumber(data.A)}
                units='мм&#178;'
            />

            <FlangeData
                title='- для первого фланца'
                data={data.flange1}
                type={flanges[0].type}
                formulas={formulas?.flange1}
            />
            {data.flange2 && (
                <FlangeData
                    title='- для второго фланца'
                    data={data.flange2}
                    type={flanges[1].type}
                    formulas={formulas?.flange2}
                />
            )}

            <ResLine
                title='Жесткость фланцевого соединения'
                imgUrl={GammaLinks[typeGamma as "Gamma-any"]}
                formula={{
                    designation: <>&gamma;</>,
                    value: formulas?.gamma,
                }}
                result={formatNumber(data.gamma)}
                units='H/мм'
            />

            <ResLine
                title='Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой'
                imgUrl='/image/moment/formulas/flange/alpha1.svg'
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
