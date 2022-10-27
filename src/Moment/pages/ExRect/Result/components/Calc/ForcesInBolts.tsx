import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ICalcForcesInBolts, IForcesInBoltsFormulas } from "../../../../../types/res_exRect"
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
                title='Расчетное усилие в болтах (шпильках) в условиях эксплуатации'
                imgUrl='/image/moment/formulas/dev-cooling/workEffort.svg'
                formula={{
                    designation: (
                        <>
                            F<sub>B</sub>
                        </>
                    ),
                    value: formulas?.workEffort,
                }}
                result={formatNumber(res.workEffort)}
                units='H'
            />
            <ResLine
                title='Расчетно усилие в болтах (шпильках) в условиях испытаний или монтажа'
                imgUrl='/image/moment/formulas/dev-cooling/effort.svg'
                formula={{
                    designation: (
                        <>
                            F<sub>0</sub>
                        </>
                    ),
                    value: formulas?.effort,
                }}
                result={formatNumber(res.effort)}
                units='H'
            />
        </Container>
    )
}
