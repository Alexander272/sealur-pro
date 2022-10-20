import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { IAuxiliaryFormulas, ICalcAuxiliary } from "../../../../../types/res_devCooling"
import { formatNumber } from "../../../../../utils/format"

type Props = {
    method: string
    res: ICalcAuxiliary
    formulas: IAuxiliaryFormulas
}

export const Auxiliary: FC<Props> = ({ method, res, formulas }) => {
    return (
        <Container title='Расчет вспомогательных величин'>
            <ResLine
                title='Расчетная ширина перфорированной зоны решетки'
                imgUrl={"/image/moment/formulas/dev-cooling/estimatedZoneWidth.svg"}
                formula={{
                    designation: (
                        <>
                            B<sub>T</sub>
                        </>
                    ),
                    value: formulas?.estimatedZoneWidth,
                }}
                result={formatNumber(res.estimatedZoneWidth)}
                units='мм'
            />
            <ResLine
                title='Относительная ширина беструбного края'
                imgUrl={"/image/moment/formulas/dev-cooling/relativeWidth.svg"}
                formula={{
                    designation: (
                        <>
                            &lambda;<sub>p</sub>
                        </>
                    ),
                    value: formulas?.relativeWidth,
                }}
                result={formatNumber(res.relativeWidth)}
                units='мм'
            />
            <ResLine
                title='Вспомогательные коэффициенты'
                imgUrl={"/image/moment/formulas/dev-cooling/upsilon.svg"}
                formula={{
                    designation: <>&upsilon;</>,
                    value: formulas?.upsilon,
                }}
                result={formatNumber(res.upsilon)}
            />
            <ResLine
                imgUrl={"/image/moment/formulas/dev-cooling/eta.svg"}
                formula={{
                    designation: <>&eta;</>,
                    value: formulas?.eta,
                }}
                result={formatNumber(res.eta)}
            />
            <ResLine
                title='Коэффициент ослабления решетки и задней стенки'
                imgUrl={"/image/moment/formulas/dev-cooling/phiP.svg"}
                formula={{
                    designation: <>&phi;</>,
                    value: formulas?.phi,
                }}
                result={formatNumber(res.phi)}
            />
            <ResLine
                title='где:'
                imgUrl={
                    method.includes("всю")
                        ? "/image/moment/formulas/dev-cooling/dE1.svg"
                        : method.includes("части")
                        ? "/image/moment/formulas/dev-cooling/dE2.svg"
                        : "/image/moment/formulas/dev-cooling/dE3.svg"
                }
                formula={{
                    designation: (
                        <>
                            d<sub>E</sub>
                        </>
                    ),
                    value: formulas?.d,
                }}
                result={formatNumber(res.d)}
                units='мм'
            />
            <ResLine
                title='Допускаемая нагрузка из условия прочности труб'
                imgUrl={"/image/moment/formulas/dev-cooling/loadTube.svg"}
                formula={{
                    designation: <>&lbrace;q&rbrace;</>,
                    value: formulas?.loadTube,
                }}
                result={formatNumber(res.loadTube)}
                units='МПа'
            />
        </Container>
    )
}
