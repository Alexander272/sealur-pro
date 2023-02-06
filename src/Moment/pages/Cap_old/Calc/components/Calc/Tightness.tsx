import React, { FC } from 'react'
import { Container } from '../../../../../components/Container/Container'
import { ICalculateCap, IFormulasCap } from '../../../../../types/res_cap_old'
import { formatNumber } from '../../../../../utils/format'
import { ResLine } from '../../../../../components/ResLine/ResLine'

type Props = {
	data: ICalculateCap
	formulas: IFormulasCap | undefined
}

export const Tightness: FC<Props> = ({ data, formulas }) => {
	return (
		<Container title='Расчет фланцевого соединения на прочность и герметичность без учета нагрузки вызванной стесненностью температурных деформаций'>
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
				result={formatNumber(data.Po)}
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
				result={formatNumber(data.Rp)}
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
				result={formatNumber(data.Qd)}
				units='H'
			/>
			<ResLine
				title='Приведенная нагрузка, вызванная воздействием внешней силы и изгибающего момента'
				imgUrl='/image/moment/formulas/flange/Qfm.svg'
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

			<ResLine
				title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки и минимального начального натяжения болтов/шпилек'
				imgUrl='/image/moment/formulas/flange/Pb2.svg'
				formula={{
					designation: (
						<>
							P<sub>б2</sub>
						</>
					),
					value: formulas?.strength?.fPb2,
				}}
				result={formatNumber(data.strength?.fPb2)}
				units='H'
			/>
			<ResLine
				title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления на прокладку достаточного для герметизации фланцевого соединения'
				imgUrl='/image/moment/formulas/cap/Pb1_0.svg'
				formula={{
					designation: (
						<>
							P<sub>б1</sub>
						</>
					),
					value: formulas?.strength?.fPb1,
				}}
				result={formatNumber(data.strength?.fPb1)}
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
					value: formulas?.strength?.fPb,
				}}
				result={formatNumber(data.strength?.fPb)}
				units='H'
			/>
			<ResLine
				title='Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях'
				imgUrl='/image/moment/formulas/cap/Pbr_0.svg'
				formula={{
					designation: (
						<>
							P<sub>б</sub>
							<sup>р</sup>
						</>
					),
					value: formulas?.strength?.fPbr,
				}}
				result={formatNumber(data.strength?.fPbr)}
				units='H'
			/>
		</Container>
	)
}
