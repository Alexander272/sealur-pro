import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { IAuxiliaryFormulas, ICalcAuxiliary } from "../../../../../types/res_devCooling"
import { formatNumber } from "../../../../../utils/format"

const loadImgs = {
    Развальцовка: "/image/moment/formulas/dev-cooling/load1.svg",
    Приварка: "/image/moment/formulas/dev-cooling/load2.svg",
    "Приварка с подвальцовкой": "/image/moment/formulas/dev-cooling/load3.svg",
}

type Props = {
    method: string
    mounting: string
    res: ICalcAuxiliary
    formulas: IAuxiliaryFormulas | undefined
}

export const Auxiliary: FC<Props> = ({ method, mounting, res, formulas }) => {
    return (
        <Container title='Расчет вспомогательных величин'>
            <ResLine
                title='Расчетная ширина перфорированной зоны решетки'
                imgUrl='/image/moment/formulas/dev-cooling/estimatedZoneWidth.svg'
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
                imgUrl='/image/moment/formulas/dev-cooling/relativeWidth.svg'
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
                imgUrl='/image/moment/formulas/dev-cooling/upsilon.svg'
                formula={{
                    designation: <>&upsilon;</>,
                    value: formulas?.upsilon,
                }}
                result={formatNumber(res.upsilon)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/dev-cooling/eta.svg'
                formula={{
                    designation: <>&eta;</>,
                    value: formulas?.eta,
                }}
                result={formatNumber(res.eta)}
            />
            <ResLine
                title='Коэффициент ослабления решетки и задней стенки'
                imgUrl='/image/moment/formulas/dev-cooling/phiP.svg'
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
                imgUrl='/image/moment/formulas/dev-cooling/loadTube.svg'
                formula={{
                    designation: (
                        <>
                            {"{"}q{"}"}
                        </>
                    ),
                    value: formulas?.loadTube,
                }}
                result={formatNumber(res.loadTube)}
                units='МПа'
            />

            <ResLine
                title='Допускаемая нагрузка из условия прочности крепления трубы в решетке'
                imgUrl={loadImgs[mounting as "Приварка"]}
                formula={{
                    designation: (
                        <>
                            [q]<sub>s</sub>
                        </>
                    ),
                    value: formulas?.load,
                }}
                result={formatNumber(res.load)}
                units='МПа'
            />
            <ResLine
                title='где:'
                imgText={
                    <>
                        &mu;<sub>v</sub> = {formatNumber(res.mu)}
                    </>
                }
                result={""}
            />
            <ResLine
                title='Коэффициент уменьшения допускаемых напряжений при продольном изгибе'
                imgUrl='/image/moment/formulas/dev-cooling/phiT.svg'
                formula={{
                    designation: (
                        <>
                            &phi;<sub>T</sub>
                        </>
                    ),
                    value: formulas?.phiT,
                }}
                result={formatNumber(res.phiT)}
            />
            <ResLine
                title='Расчетная ширина плоской прокладки'
                imgUrl='/image/moment/formulas/dev-cooling/estimatedGasketWidth.svg'
                formula={{
                    designation: (
                        <>
                            b<sub>pR</sub>
                        </>
                    ),
                    value: formulas?.estimatedGasketWidth,
                }}
                result={formatNumber(res.estimatedGasketWidth)}
                units='мм'
            />

            <ResLine
                title='Плечи изгибающих моментов'
                imgUrl='/image/moment/formulas/dev-cooling/arm1.svg'
                formula={{
                    designation: (
                        <>
                            l<sub>1</sub>
                        </>
                    ),
                    value: formulas?.arm1,
                }}
                result={formatNumber(res.arm1)}
                units='мм'
            />
            <ResLine
                imgUrl='/image/moment/formulas/dev-cooling/arm2.svg'
                formula={{
                    designation: (
                        <>
                            l<sub>2</sub>
                        </>
                    ),
                    value: formulas?.arm2,
                }}
                result={formatNumber(res.arm2)}
                units='мм'
            />
            <ResLine
                title='где:'
                imgUrl='/image/moment/formulas/dev-cooling/Bp.svg'
                formula={{
                    designation: (
                        <>
                            B<sub>p</sub>
                        </>
                    ),
                    value: formulas?.Bp,
                }}
                result={formatNumber(res.Bp)}
                units='мм'
            />
        </Container>
    )
}
