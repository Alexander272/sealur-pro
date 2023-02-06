import React, { FC } from 'react'
import { Container } from '../../../../../components/Container/Container'
import { formatNumber } from '../../../../../utils/format'
import { ResLine } from '../../../../../components/ResLine/ResLine'
import { ConditionLine } from '../../../../../components/ConditionLine/ConditionLine'
import { IConditionsForStrength, IConditionsForStrengthFormulas } from '../../../../../types/res_flange'
import { IFlangeResult } from '../../../../../types/res_cap'
import classes from '../../../../styles/page.module.scss'

type Props = {
	data: IConditionsForStrength
	flange: IFlangeResult
	formulas?: IConditionsForStrengthFormulas
}

export const SealingCondition: FC<Props> = ({ data, flange, formulas }) => {
	return (
		<Container title='Условие герметичности фланцевого соединения'>
			<p className={classes.text}>- для фланца</p>
			<ResLine
				title='Угол поворота приварного встык фланца и бурта свободного фланца'
				imgUrl='/image/moment/formulas/flange/theta.svg'
				formula={{ designation: <>&Theta;</>, value: formulas?.teta }}
				result={formatNumber(data.teta)}
				units='рад'
			/>
			<ConditionLine
				imgUrl='/image/moment/formulas/flange/thetaCond.svg'
				result={
					<>
						{formatNumber(data.condTeta.x)}&nbsp;
						{data.condTeta.x <= data.condTeta.y ? <> &le; </> : ' > '}
						&nbsp;
						{formatNumber(data.condTeta.y)}
					</>
				}
			/>
			{flange?.type === 'free' && (
				<>
					<ResLine
						title='Угол поворота кольца свободного фланца'
						imgUrl='/image/moment/formulas/flange/thetaK.svg'
						result={formatNumber(data.tetaK)}
						units='рад'
					/>
					<ConditionLine
						imgUrl='/image/moment/formulas/flange/thetaCondK.svg'
						result={
							<>
								{formatNumber(data.condTetaK.x)}&nbsp;
								{data.condTetaK.x <= data.condTetaK.y ? <> &le; </> : ' > '}
								&nbsp;
								{formatNumber(data.condTetaK.y)}
							</>
						}
					/>
				</>
			)}
		</Container>
	)
}
