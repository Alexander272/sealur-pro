import React, { FC } from 'react'
import { Container } from '../../../../../components/Container/Container'
import { IFlangeResult } from '../../../../../types/res_cap'
import {
	IConditionsForStrength,
	IConditionsForStrengthFormulas,
	IStaticResistance,
	IStaticResistanceFormulas,
} from '../../../../../types/res_flange'
import { StaticResistanceCond } from './StaticResistanceCond'
import { StaticResistanceData } from './StaticResistanceData'

type Props = {
	data: IStaticResistance
	cond: IConditionsForStrength
	flange: IFlangeResult
	title: string
	formulas?: IStaticResistanceFormulas
	condFormulas?: IConditionsForStrengthFormulas
}

export const StaticResistance: FC<Props> = ({ data, cond, flange, title, formulas, condFormulas }) => {
	return (
		<>
			<Container title={title}>
				<StaticResistanceData data={data} flange={flange} title='- для фланца' formulas={formulas} />
			</Container>
			<Container title='Условия статической прочности фланцев'>
				<StaticResistanceCond
					isEqualSigma={data.isEqualSigma}
					data={cond}
					flange={flange}
					formulas={condFormulas}
				/>
			</Container>
		</>
	)
}
