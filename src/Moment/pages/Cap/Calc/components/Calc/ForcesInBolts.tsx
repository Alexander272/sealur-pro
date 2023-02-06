import React, { FC } from 'react'
import { Container } from '../../../../../components/Container/Container'
import { formatNumber } from '../../../../../utils/format'
import { ResLine } from '../../../../../components/ResLine/ResLine'
import { IForcesInBolts } from '../../../../../types/res_cap'
import { IForcesInBoltsFormulas } from '../../../../../types/res_flange'

export const CapQtLink = {
	'Qt-any': '/image/moment/formulas/cap/Qt.svg',
	'Qt-free': '/image/moment/formulas/cap/Qt-free.svg',
	'Qt-any-embed': '/image/moment/formulas/cap/Qt-embed.svg',
	'Qt-free-embed': '/image/moment/formulas/cap/Qt-free-embed.svg',
	'Qt-washer-any': '/image/moment/formulas/cap/Qt-washer.svg',
	'Qt-washer-free': '/image/moment/formulas/cap/Qt-washer-free.svg',
	'Qt-washer-any-embed': '/image/moment/formulas/cap/Qt-washer-embed.svg',
	'Qt-washer-free-embed': '/image/moment/formulas/cap/Qt-washer-free-embed.svg',
}

type Props = {
	data: IForcesInBolts
	formulas: IForcesInBoltsFormulas | undefined
	typeQt: string
}

export const ForcesInBolts: FC<Props> = ({ data, formulas, typeQt }) => {
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
					value: formulas?.A,
				}}
				result={formatNumber(data.A)}
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
				title='Нагрузка вызванная стесненностью температурных деформаций'
				imgUrl={CapQtLink[typeQt as 'Qt-any']}
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
				result={formatNumber(data.Pb)}
				units='H'
			/>
			<ResLine
				title='Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой'
				imgUrl='/image/moment/formulas/cap/alpha.svg'
				formula={{
					designation: <>&alpha;</>,
					value: formulas?.alpha,
				}}
				result={formatNumber(data.alpha)}
			/>

			<ResLine
				title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления 
                    на прокладку достаточного для герметизации фланцевого соединения'
				imgUrl='/image/moment/formulas/cap/Pb1.svg'
				formula={{
					designation: (
						<>
							P<sub>б1</sub>
						</>
					),
					value: formulas?.Pb1,
				}}
				result={formatNumber(data.Pb1)}
				units='H'
			/>

			<ResLine
				title='Минимальное начальное натяжение болтов (шпилек)'
				imgUrl='/image/moment/formulas/flange/minB.svg'
				result={formatNumber(data?.minB)}
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
				result={formatNumber(data.Pb2)}
				units='H'
			/>
			<ResLine
				title='Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях'
				imgUrl='/image/moment/formulas/cap/Pbr.svg'
				formula={{
					designation: (
						<>
							P<sub>б</sub>
							<sup>р</sup>
						</>
					),
					value: formulas?.Pbr,
				}}
				result={formatNumber(data.Pbr)}
				units='H'
			/>
		</Container>
	)
}
