import React, { FC } from 'react'
import { Container } from '../../../../components/Container/Container'
import { IBoltResult } from '../../../../types/res_devCooling'
import { formatNumber } from '../../../../utils/format'
import { Line } from '../../../Flange_old/Calc/components/Line'

type Props = {
	data: IBoltResult
}

export const Bolt: FC<Props> = ({ data }) => {
	return (
		<Container title='Исходные данные для болтов/шпилек'>
			<Line
				title='Расстояние между осями болтов/шпилек в поперечном направлении'
				designation={
					<i>
						B<sub>3</sub>
					</i>
				}
				res={formatNumber(data.distance)}
				units='мм'
			/>
			<Line
				title='Наружный диаметр болта/шпильки'
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
				title='Длина болта/шпильки между опорными поверхностями'
				designation={
					<i>
						l<sub>б</sub>
					</i>
				}
				res={formatNumber(data.lenght)}
				units='мм'
			/>

			<Line title='Материал болта/шпильки' res={data.material} />
			<Line
				title='Модуль продольной упругости болта/шпильки'
				designation={
					<i>
						&#917;<sub>б</sub>
					</i>
				}
				res={formatNumber(data.epsilon)}
				units='МПа'
			/>
			<Line
				title='Допускаемое напряжение при температуре 20 &#8451;'
				designation={
					<i>
						[<i>&sigma;</i>]<sub>б</sub>
						<sup>20</sup>
					</i>
				}
				res={formatNumber(data.sigmaAt20)}
				units='МПа'
			/>
			<Line
				title='Допускаемое напряжение при расчетной температуре'
				designation={
					<i>
						[<i>&sigma;</i>]<sub>б</sub>
					</i>
				}
				res={formatNumber(data.sigma)}
				units='МПа'
			/>
		</Container>
	)
}
