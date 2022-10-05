import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import {
    IBoltResult,
    IDataResult,
    IFlangeResult,
    IGasketResult,
} from "../../../../../types/res_flange"
import { ICalculateCap, ICapResult, IFormulasCap } from "../../../../../types/res_cap"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { FlangeData } from "./FlangeData"
import { CapData } from "./CapData"

type Props = {
    data: ICalculateCap
    basis: IDataResult
    gasket: IGasketResult
    flange: IFlangeResult
    cap: ICapResult
    bolt: IBoltResult
    formulas: IFormulasCap | undefined
    typeGamma: "Gamma-any" | "Gamma-free"
}

const GammaLinks = {
    "Gamma-any": "/image/moment/formulas/cap/gamma.svg",
    "Gamma-free": "/image/moment/formulas/cap/gamma-free.svg",
}

export const Auxiliary: FC<Props> = ({
    data,
    basis,
    gasket,
    flange,
    cap,
    bolt,
    formulas,
    typeGamma,
}) => {
    return (
        <Container title='Расчет вспомогательных величин'>
            <ResLine
                title='Эффективная ширина прокладки'
                imgUrl={
                    gasket.type === "Восьмигранная"
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
                    gasket.type === "Восьмигранная"
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
                result={formatNumber(data.Dsp)}
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
                imgUrl={"/image/moment/formulas/flange/yb.svg"}
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
                        ? "/image/moment/formulas/flange/Lb1.svg"
                        : "/image/moment/formulas/flange/Lb2.svg"
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

            <FlangeData title='- для фланца' data={flange} formulas={formulas?.strength?.flange} />
            <CapData data={cap} formulas={formulas?.strength?.cap} />

            <ResLine
                title='Жесткость фланцевого соединения'
                imgUrl={GammaLinks[typeGamma]}
                formula={{
                    designation: <>&gamma;</>,
                    value: formulas?.strength.gamma,
                }}
                result={formatNumber(data.strength.gamma)}
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
        </Container>
    )
}
