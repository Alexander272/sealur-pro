import React, { FC } from 'react'
import { Container } from '../../../../components/Container/Container'
import { IBoltResult } from '../../../../types/res_flange'
import { formatNumber } from '../../../../utils/format'
import { Line } from './Line'

type Props = {
	data: IBoltResult
}

export const Bolt: FC<Props> = ({ data }) => {
	return (
		<Container title='Исходные данные для болт/шпилька'>
			<Line
				title='Наружный диаметр болта (шпильки)'
				designation={<i>d</i>}
				res={formatNumber(data.diameter)}
				units='мм'
			/>
			<Line
				title='Площадь болта (шпильки)'
				designation={
					<i>
						f<sub>б</sub>
					</i>
				}
				res={formatNumber(data.area)}
				units='мм&#178;'
			/>
			<Line title='Число болтов (шпилек)' designation={<i>n</i>} res={formatNumber(data.count)} />
			<Line
				title='Расстояние между опорными поверхностями гайки и головки болта или опорными поверхностями гаек'
				designation={
					<i>
						L<sub>б0</sub>
					</i>
				}
				res={formatNumber(data.length)}
				units='мм'
			/>
			<Line
				title='Расчетная температура болта (шпильки)'
				designation={
					<i>
						t<sub>б</sub>
					</i>
				}
				res={formatNumber(data.temp)}
				units='&#8451;'
			/>
			<Line title='Материал фланца' res={data.material} />
			<Line
				title='Температурный коэффициент линейного расширения материала болта (шпильки)'
				designation={
					<i>
						&alpha;<sub>б</sub>
					</i>
				}
				res={formatNumber(data.alpha)}
				units='1/&#8451;'
			/>
			<Line
				title='Модуль продольной упругости материала болта (шпильки) при температуре 20 &#8451;'
				designation={
					<i>
						&#917;<sub>б</sub>
						<sup>20</sup>
					</i>
				}
				res={formatNumber(data.epsilonAt20)}
				units='МПа'
			/>
			<Line
				title='Модуль продольной упругости материала болта (шпильки) при расчетной температуре'
				designation={
					<i>
						&#917;<sub>б</sub>
					</i>
				}
				res={formatNumber(data.epsilon)}
				units='МПа'
			/>
			<Line
				title='Номинальное допускаемое напряжение для болтов (шпилек) при затяжке'
				designation={
					<>
						[<i>&sigma;</i>]<sup>б</sup>
						<sub>н</sub>
					</>
				}
				res={formatNumber(data.sigmaAt20)}
				units='МПа'
			/>
			<Line
				title='Номинальное допускаемое напряжение для болтов (шпилек) в рабочих условиях и при расчете на условия испытания'
				designation={
					<>
						[<i>&sigma;</i>]<sup>б</sup>
						<sub>н</sub>
					</>
				}
				res={formatNumber(data.sigma)}
				units='МПа'
			/>
		</Container>
	)
}
