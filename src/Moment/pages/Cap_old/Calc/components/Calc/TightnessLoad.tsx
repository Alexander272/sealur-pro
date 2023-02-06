import React, { FC } from 'react'
import { Container } from '../../../../../components/Container/Container'
import { ICalculateCap, IFormulasCap } from '../../../../../types/res_cap_old'
import { formatNumber } from '../../../../../utils/format'
import { ResLine } from '../../../../../components/ResLine/ResLine'
import { CapQtLink } from './ForcesInBolts'

type Props = {
	data: ICalculateCap
	typeQt: string
	formulas: IFormulasCap | undefined
}

export const TightnessLoad: FC<Props> = ({ data, typeQt, formulas }) => {
	return (
		<Container title='Расчет фланцевого соединения на прочность и герметичность c учетом нагрузки вызванной стесненностью температурных деформаций'>
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
				title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления на прокладку достаточного для герметизации фланцевого соединения'
				imgUrl='/image/moment/formulas/cap/Pb1.svg'
				formula={{
					designation: (
						<>
							P<sub>б1</sub>
						</>
					),
					value: formulas?.strength.sPb1,
				}}
				result={formatNumber(data.strength?.sPb1)}
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
					value: formulas?.strength.sPb,
				}}
				result={formatNumber(data.strength?.sPb)}
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
					value: formulas?.strength.sPbr,
				}}
				result={formatNumber(data.strength?.sPbr)}
				units='H'
			/>
		</Container>
	)
}
