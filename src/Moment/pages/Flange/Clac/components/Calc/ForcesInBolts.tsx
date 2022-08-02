import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ICalculate, IFormulas } from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "./ResLine/ResLine"

const alphaMLink = {
    true: "/image/moment/formulas/alphaM.svg",
    "true-free": "/image/moment/formulas/alphaM-full.svg",
    false: "/image/moment/formulas/alphaM.svg",
    "false-first": "/image/moment/formulas/alphaM-part1.svg",
    "false-second": "/image/moment/formulas/alphaM-part2.svg",
    "false-free": "/image/moment/formulas/alphaM-full.svg",
}

type Props = {
    data: ICalculate
    formulas: IFormulas | undefined
}

export const ForcesInBolts: FC<Props> = ({ data, formulas }) => {
    return (
        <Container title='Усилия в болтах (шпильках) фланцевого соединения при затяжке и в рабочих условиях'>
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
            <ResLine
                title='Равнодействующая нагрузка от давления'
                imgUrl='/image/moment/formulas/Qd.svg'
                formula={{
                    designation: (
                        <>
                            Q<sub>Д</sub>
                        </>
                    ),
                    value: formulas?.Qd,
                }}
                result={formatNumber(data.Qd)}
                units='H'
            />
            <ResLine
                title='Приведенная нагрузка, вызванная воздействием внешней силы и изгибающего момента'
                imgUrl='/image/moment/formulas/Qfm.svg'
                formula={{
                    designation: (
                        <>
                            Q<sub>FM</sub>
                        </>
                    ),
                    value: formulas?.Qfm,
                }}
                result={formatNumber(data.Qfm)}
                units='H'
            />
            {/* //TODO как-то надо проверять какую формулу вставлять сюда (6 вариантов формул (с шайбой, без нее, с заклодной деталью)) */}
            <ResLine
                title='Нагрузка вызванная стесненностью температурных деформаций'
                imgUrl=''
                formula={{
                    designation: (
                        <>
                            Q<sub>t</sub>
                        </>
                    ),
                    value: formulas?.Qt,
                }}
                result={formatNumber(data.Qt)}
                units='H'
            />
            <ResLine
                title='Расчетная нагрузка на болты/шпильки фланцевых соединений'
                imgUrl='/image/moment/formulas/Pb.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б</sub>
                            <sup>м</sup>
                        </>
                    ),
                    value: formulas?.basis.Pb,
                }}
                result={formatNumber(data.basis.Pb)}
                units='H'
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
            {/* //TODO надо менять формулу в зависимости от типа фланцев */}
            <ResLine
                title='Коэффициент жесткости фланцевого соединения нагруженного внешним изгибающим моментом'
                imgUrl={alphaMLink["true"]}
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
            <ResLine
                title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления на прокладку достаточного для герметизации фланцевого соединения'
                imgUrl='/image/moment/formulas/Pb1.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б1</sub>
                        </>
                    ),
                    value: formulas?.basis.Pb1,
                }}
                result={formatNumber(data.basis.Pb1)}
                units='H'
            />
            {/*//TODO тут результат на клиенте считается возможно лучше считать на сервере (я и значения для расчетов не передаю) */}
            {/* <ResLine
                title='Минимальное начальное натяжение болтов (шпилек)'
                imgUrl=''
                formula={{
                    value: formulas?.basis.Pb1,
                }}
                result={formatNumber(0.4 * data.A * data.basis.s)}
                units='H'
            /> */}
            <ResLine
                title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки и минимального начального натяжения болтов/шпилек'
                imgUrl='/image/moment/formulas/Pb2.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б2</sub>
                        </>
                    ),
                    value: formulas?.basis.Pb2,
                }}
                result={formatNumber(data.basis.Pb2)}
                units='H'
            />
            <ResLine
                title='Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях'
                imgUrl='/image/moment/formulas/Pbr.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б</sub>
                            <sup>р</sup>
                        </>
                    ),
                    value: formulas?.basis.Pbr,
                }}
                result={formatNumber(data.basis.Pbr)}
                units='H'
            />
        </Container>
    )
}
