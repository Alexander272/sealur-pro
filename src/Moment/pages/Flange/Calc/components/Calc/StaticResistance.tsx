import React, { FC } from 'react'
import { Container } from '../../../../../components/Container/Container'
import {
	IConditionsForStrength,
	IConditionsForStrengthFormulas,
	IFlangeResult,
	IStaticResistance,
	IStaticResistanceFormulas,
} from '../../../../../types/res_flange'
import { StaticResistanceCond } from './StaticResistanceCond'
import { StaticResistanceData } from './StaticResistanceData'

type Props = {
	data: IStaticResistance[]
	cond: IConditionsForStrength[]
	flanges: IFlangeResult[]
	title: string
	formulas?: IStaticResistanceFormulas[]
	condFormulas?: IConditionsForStrengthFormulas[]
}

export const StaticResistance: FC<Props> = ({ title, data, cond, flanges, formulas, condFormulas }) => {
	return (
		<>
			{data.map((d, i) => (
				<React.Fragment key={i}>
					<Container title={title}>
						<StaticResistanceData
							data={d}
							flange={flanges[i]}
							title='- для первого фланца'
							formulas={formulas && formulas[i]}
						/>
					</Container>
					<Container title='Условия статической прочности фланцев'>
						<StaticResistanceCond
							data={cond[i]}
							flange={flanges[i]}
							isEqualSigma={d.isEqualSigma}
							formulas={condFormulas && condFormulas[i]}
						/>
					</Container>
				</React.Fragment>
			))}
		</>
	)
}
