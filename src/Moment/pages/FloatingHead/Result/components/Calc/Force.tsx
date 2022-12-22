import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ICalculate, IFormulas } from "../../../../../types/res_float"
import { formatNumber } from "../../../../../utils/format"

type Props = {
    calc: ICalculate
    formulas: IFormulas | undefined
}

export const Force: FC<Props> = ({ calc, formulas }) => {
    return (
        <Container title='Расчет сил действующих на плавающую головку'>
            <ResLine
                title='Усилие необходимое для смятия прокладки при затяжке'
                imgUrl='/image/moment/formulas/flange/Po.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>обж</sub>
                        </>
                    ),
                    value: formulas?.Po,
                }}
                result={formatNumber(calc.Po)}
                units='H'
            />
            <ResLine
                title='Усилие на прокладке в рабочих условиях необходимое для обеспечения герметичности фланцевого соединения'
                imgUrl='/image/moment/formulas/flange/Rp.svg'
                formula={{
                    designation: (
                        <>
                            R<sub>п</sub>
                        </>
                    ),
                    value: formulas?.Rp,
                }}
                result={formatNumber(calc.Rp)}
                units='H'
            />
            <ResLine
                title='Равнодействующая нагрузка от давления'
                imgUrl='/image/moment/formulas/flange/Qd.svg'
                formula={{
                    designation: (
                        <>
                            Q<sub>Д</sub>
                        </>
                    ),
                    value: formulas?.Qd,
                }}
                result={formatNumber(calc.Qd)}
                units='H'
            />

            <ResLine
                title='Минимальное начальное натяжение болтов (шпилек)'
                imgUrl='/image/moment/formulas/flange/minB.svg'
                result={formatNumber(calc.minB)}
                units='H'
            />
            <ResLine
                title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки и 
                    минимального начального натяжения болтов/шпилек'
                imgUrl='/image/moment/formulas/flange/Pb2.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б2</sub>
                        </>
                    ),
                    value: formulas?.Pb2,
                }}
                result={formatNumber(calc.Pb2)}
                units='H'
            />
            <ResLine
                title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления 
                    на прокладку достаточного для герметизации фланцевого соединения'
                imgUrl='/image/moment/formulas/float/Pb1.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б1</sub>
                        </>
                    ),
                    value: formulas?.Pb1,
                }}
                result={formatNumber(calc.Pb1)}
                units='H'
            />
            <ResLine
                title='Расчетная нагрузка на болты/шпильки фланцевых соединений'
                imgUrl='/image/moment/formulas/flange/Pb.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б</sub>
                            <sup>м</sup>
                        </>
                    ),
                    value: formulas?.Pb,
                }}
                result={formatNumber(calc.Pb)}
                units='H'
            />
            <ResLine
                title='Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях'
                imgUrl='/image/moment/formulas/float/Pbr.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б</sub>
                            <sup>р</sup>
                        </>
                    ),
                    value: formulas?.Pbr,
                }}
                result={formatNumber(calc.Pbr)}
                units='H'
            />
        </Container>
    )
}
