import React, { FC } from 'react'
import { ConditionLine } from '../../../../../components/ConditionLine/ConditionLine'
import { ResLine } from '../../../../../components/ResLine/ResLine'
import { IFlangeResult } from '../../../../../types/res_cap'
import { IConditionsForStrength, IConditionsForStrengthFormulas } from '../../../../../types/res_flange'
import { formatNumber } from '../../../../../utils/format'
import classes from '../../../../styles/page.module.scss'

type Props = {
	isEqualSigma: boolean
	data: IConditionsForStrength
	flange: IFlangeResult
	formulas?: IConditionsForStrengthFormulas
}

export const StaticResistanceCond: FC<Props> = ({ data, flange, formulas, isEqualSigma }) => {
	return (
		<>
			{!isEqualSigma ? (
				<>
					<p className={classes.text}>
						Для приварных встык фланцев с конической втулкой в сечении S&#8321; условия статической
						прочности
					</p>
					<ConditionLine
						title='- при затяжке'
						imgUrl='/image/moment/formulas/flange/max1.svg'
						formula={{ value: formulas ? `${formulas.Max1.x} ≤ ${formulas.Max1.y}` : '' }}
						result={
							<>
								{formatNumber(data.Max1.x)}&nbsp;
								{data.Max1.x <= data.Max1.y ? <> &le; </> : ' > '}
								&nbsp;
								{formatNumber(data.Max1.y)}
							</>
						}
					/>
					<ConditionLine
						title='- в рабочих условиях'
						imgUrl='/image/moment/formulas/flange/max2.svg'
						formula={{ value: formulas ? `${formulas.Max2.x} ≤ ${formulas.Max2.y}` : '' }}
						result={
							<>
								{formatNumber(data.Max2.x)}&nbsp;
								{data.Max2.x <= data.Max2.y ? <> &le; </> : ' > '}&nbsp;
								{formatNumber(data.Max2.y)}
							</>
						}
					/>

					<p className={classes.text}>
						Для приварных встык фланцев с конической втулкой в сечении S&#8320; условия статической
						прочности
					</p>
					<ConditionLine
						title='- при затяжке'
						imgUrl='/image/moment/formulas/flange/max3.svg'
						formula={{ value: formulas ? `${formulas.Max3.x} ≤ ${formulas.Max3.y}` : '' }}
						result={
							<>
								{formatNumber(data.Max3.x)}&nbsp;
								{data.Max3.x <= data.Max3.y ? <> &le; </> : ' > '}&nbsp;
								{formatNumber(data.Max3.y)}
							</>
						}
					/>
					<ConditionLine
						title='- в рабочих условиях'
						imgUrl='/image/moment/formulas/flange/max4.svg'
						formula={{ value: formulas ? `${formulas.Max4.x} ≤ ${formulas.Max4.y}` : '' }}
						result={
							<>
								{formatNumber(data.Max4.x)}&nbsp;
								{data.Max4.x <= data.Max4.y ? <> &le; </> : ' > '}&nbsp;
								{formatNumber(data.Max4.y)}
							</>
						}
					/>
				</>
			) : (
				<>
					<p className={classes.text}>
						Для приварных встык фланцев с прямой втулкой плоских фланцев и буртов свободных фланцев в
						сечении S&#8321; условия статической прочности
					</p>
					<ConditionLine
						title='- при затяжке'
						imgUrl='/image/moment/formulas/flange/max1_0.svg'
						formula={{ value: formulas ? `${formulas.Max5.x} ≤ ${formulas.Max5.y}` : '' }}
						result={
							<>
								{formatNumber(data.Max5.x)}&nbsp;
								{data.Max5.x <= data.Max5.y ? <> &le; </> : ' > '}&nbsp;
								{formatNumber(data.Max5.y)}
							</>
						}
					/>
					<ConditionLine
						title='- в рабочих условиях'
						imgUrl='/image/moment/formulas/flange/max2_0.svg'
						formula={{ value: formulas ? `${formulas.Max6.x} ≤ ${formulas.Max6.y}` : '' }}
						result={
							<>
								{formatNumber(data.Max6.x)}&nbsp;
								{data.Max6.x <= data.Max6.y ? <> &le; </> : ' > '}&nbsp;
								{formatNumber(data.Max6.y)}
							</>
						}
					/>
				</>
			)}

			<ConditionLine
				title='Для фланцев всех типов в сечении S&#8320; должно выполняться условие'
				imgUrl='/image/moment/formulas/flange/max5.svg'
				formula={{ value: formulas ? `${formulas.Max7.x} ≤ ${formulas.Max7.y}` : '' }}
				result={
					<>
						{formatNumber(data.Max7.x)}&nbsp;
						{data.Max7.x <= data.Max7.y ? <> &le; </> : ' > '}&nbsp;
						{formatNumber(data.Max7.y)}
					</>
				}
			/>

			<p className={classes.text}>
				Для тарелок приварных встык фланцев, плоских фланцев и буртов свободных фланцев должны выполняться
				условия
			</p>
			<ConditionLine
				title='- при затяжке'
				imgUrl='/image/moment/formulas/flange/max6.svg'
				formula={{ value: formulas ? `${formulas.Max8.x} ≤ ${formulas.Max8.y}` : '' }}
				result={
					<>
						{formatNumber(data.Max8.x)}&nbsp;
						{data.Max8.x <= data.Max8.y ? <> &le; </> : ' > '}&nbsp;
						{formatNumber(data.Max8.y)}
					</>
				}
			/>
			<ConditionLine
				title='- в рабочих условиях'
				imgUrl='/image/moment/formulas/flange/max7.svg'
				formula={{ value: formulas ? `${formulas.Max9.x} ≤ ${formulas.Max9.y}` : '' }}
				result={
					<>
						{formatNumber(data.Max9.x)}&nbsp;
						{data.Max9.x <= data.Max9.y ? <> &le; </> : ' > '}&nbsp;
						{formatNumber(data.Max9.y)}
					</>
				}
			/>

			{flange.type === 'free' && (
				<>
					<p className={classes.text}>
						Для колец свободных фланцев условия статической прочности определяют по формулам
					</p>
					<ConditionLine
						title='- при затяжке'
						imgUrl='/image/moment/formulas/flange/max8.svg'
						formula={{ value: formulas ? `${formulas.Max10.x} ≤ ${formulas.Max10.y}` : '' }}
						result={
							<>
								{formatNumber(data.Max10.x)}&nbsp;
								{data.Max10.x <= data.Max10.y ? <> &le; </> : ' > '}&nbsp;
								{formatNumber(data.Max10.y)}
							</>
						}
					/>
					<ConditionLine
						title='- в рабочих условиях'
						imgUrl='/image/moment/formulas/flange/max9.svg'
						formula={{ value: formulas ? `${formulas.Max11.x} ≤ ${formulas.Max11.y}` : '' }}
						result={
							<>
								{formatNumber(data.Max11.x)}&nbsp;
								{data.Max11.x <= data.Max11.y ? <> &le; </> : ' > '}&nbsp;
								{formatNumber(data.Max11.y)}
							</>
						}
					/>
				</>
			)}

			<ResLine
				title='Угол поворота приварного встык фланца и бурта свободного фланца в рабочих условия'
				imgUrl='/image/moment/formulas/flange/theta.svg'
				formula={{
					designation: <>&theta;</>,
					value: formulas?.teta,
				}}
				result={formatNumber(data.teta)}
				units='рад'
			/>
			<ConditionLine
				imgUrl='/image/moment/formulas/flange/thetaCond.svg'
				result={
					<>
						{formatNumber(data.condTeta.x)}&nbsp;
						{data.condTeta.x <= data.condTeta.y ? <> &le; </> : ' > '}&nbsp;
						{formatNumber(data.condTeta.y)}
					</>
				}
			/>

			{flange.type === 'free' && (
				<>
					<ResLine
						title='Угол поворота кольца свободного фланца в рабочих условиях'
						imgUrl='/image/moment/formulas/flange/thetaK.svg'
						formula={{
							designation: (
								<>
									&theta;<sub>к</sub>
								</>
							),
							value: formulas?.tetaK,
						}}
						result={formatNumber(data.tetaK)}
						units='рад'
					/>
					<ConditionLine
						imgUrl='/image/moment/formulas/flange/thetaCondK.svg'
						result={
							<>
								{formatNumber(data.condTetaK.x)}&nbsp;
								{data.condTetaK.x <= data.condTetaK.y ? <> &le; </> : ' > '}&nbsp;
								{formatNumber(data.condTetaK.y)}
							</>
						}
					/>
				</>
			)}
		</>
	)
}
