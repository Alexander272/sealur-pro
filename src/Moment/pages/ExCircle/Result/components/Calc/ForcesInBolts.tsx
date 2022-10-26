import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ICalcForcesInBolts, IForcesInBoltsFormulas } from "../../../../../types/res_exCircle"
import { formatNumber } from "../../../../../utils/format"

type Props = {
    res: ICalcForcesInBolts
    formulas?: IForcesInBoltsFormulas
}

export const ForcesInBolts: FC<Props> = ({ res, formulas }) => {
    return (
        <Container title='Усилия в болтах (шпильках) фланцевого соединения при затяжке и в рабочих условиях'>
            <ResLine
                title='Суммарная площадь сечения болтов/шпилек по внутреннему диаметру резьбы или нагруженному сечению наименьшего диаметра'
                imgUrl='/image/moment/formulas/flange/a.svg'
                formula={{
                    designation: (
                        <>
                            A<sub>в</sub>
                        </>
                    ),
                    value: formulas?.area,
                }}
                result={formatNumber(res.area)}
                units='мм&#178;'
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
                    value: formulas?.resultantLoad,
                }}
                result={formatNumber(res.resultantLoad)}
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
                    value: formulas?.designLoad,
                }}
                result={formatNumber(res.designLoad)}
                units='H'
            />
            <ResLine
                title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления на прокладку 
                достаточного для герметизации фланцевого соединения'
                imgUrl='/image/moment/formulas/float/Pb1.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б1</sub>
                        </>
                    ),
                    value: formulas?.estimatedLoad1,
                }}
                result={formatNumber(res.estimatedLoad1)}
                units='H'
            />
            <ResLine
                title='Минимальное начальное натяжение болтов (шпилек)'
                imgUrl='/image/moment/formulas/flange/minB.svg'
                result={formatNumber(res.tension)}
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
                    value: formulas?.estimatedLoad2,
                }}
                result={formatNumber(res.estimatedLoad2)}
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
                    value: formulas?.workDesignLoad,
                }}
                result={formatNumber(res.workDesignLoad)}
                units='H'
            />
        </Container>
    )
}
