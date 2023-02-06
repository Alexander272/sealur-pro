import React, { FC } from 'react'
import { Container } from '../../../../components/Container/Container'
import { ICapResult } from '../../../../types/res_cap_old'
import { formatNumber } from '../../../../utils/format'
import { Line } from '../../../Flange_old/Calc/components/Line'

type Props = {
	data: ICapResult
}

export const Cap: FC<Props> = ({ data }) => {
	return (
		<Container title='Исходные данные для крышки'>
			<Line
				title='Толщина крышки'
				designation={
					<i>
						h<sub>кр</sub>
					</i>
				}
				res={formatNumber(data.h)}
				units='мм'
			/>
			{data.delta && (
				<Line
					title='Толщина фланцевой части крышки'
					designation={
						<i>
							&delta;<sub>кр</sub>
						</i>
					}
					res={formatNumber(data.delta)}
					units='мм'
				/>
			)}
			{data.radius && (
				<Line
					title='Толщина фланцевой части крышки'
					designation={
						<i>
							R<sub>c</sub>
						</i>
					}
					res={formatNumber(data.radius)}
					units='мм'
				/>
			)}

			<Line
				title='Расчетная температура крышки'
				designation={
					<i>
						t<sub>кр</sub>
					</i>
				}
				res={formatNumber(data.t)}
				units='&#8451;'
			/>

			<Line title='Материал крышки' res={data.material} />
			<Line
				title='Температурный коэффициент линейного расширения материала крышки'
				designation={
					<i>
						&alpha;<sub>кр</sub>
					</i>
				}
				res={formatNumber(data.alpha)}
				units='1/&#8451;'
			/>
			<Line
				title='Модуль продольной упругости материала крышки при температуре 20 &#8451;'
				designation={
					<i>
						&#917;<sup>20</sup>
						<sub>кр</sub>
					</i>
				}
				res={formatNumber(data.epsilonAt20)}
				units='МПа'
			/>
			<Line
				title='Модуль продольной упругости материала крышки при расчетной температуре'
				designation={
					<i>
						&#917;<sub>кр</sub>
					</i>
				}
				res={formatNumber(data.epsilon)}
				units='МПа'
			/>
		</Container>
	)
}
