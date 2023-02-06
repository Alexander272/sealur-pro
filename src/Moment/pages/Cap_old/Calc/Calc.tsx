import { FC, memo } from 'react'
import { IResCap } from '../../../types/res_cap_old'
import { Flange } from './components/Flange'
import { Data } from './components/Data'
import { Deformation } from './components/Calc/Deformation'
import { ForcesInBolts } from './components/Calc/ForcesInBolts'
import { BoltStrength } from './components/Calc/BoltStrength'
import { Conclusions } from './components/Calc/Conclusions'
import { Moment } from './components/Calc/Moment'
import { Auxiliary } from './components/Calc/Auxiliary'
import { Tightness } from './components/Calc/Tightness'
import { StrengthMoment } from './components/Calc/StrengthMoment'
import { StaticResistance } from './components/Calc/StaticResistance'
import { TightnessLoad } from './components/Calc/TightnessLoad'
import { SealingCondition } from './components/Calc/SealingCondition'
import { SealingConclusions } from './components/Calc/SealingConclusions'
import { Cap } from './components/Cap'
import { Bolt } from '../../Flange_old/Calc/components/Bolt'
import { Washer } from '../../Flange_old/Calc/components/Washer'
import { Gasket } from '../../Flange_old/Calc/components/Gasket'
import { Embed } from '../../Flange_old/Calc/components/Embed'
import classes from '../../styles/page.module.scss'

type Props = {
	result: IResCap
}

const ResCalc: FC<Props> = ({ result }) => {
	const getTypeQt = () => {
		let washer = ''
		if (result.washers) washer = '-washer'

		let embed = ''
		if (result.embed) embed = '-embed'

		let flange = result.flange.type === 'free' ? '-free' : '-any'

		return `Qt${washer}${flange}${embed}`
	}

	const getTypeGamma = () => {
		let flange = result.flange.type === 'free' ? '-free' : '-any'
		return `Gamma${flange}` as 'Gamma-any'
	}

	return (
		<>
			<Data data={result.data} />

			<Flange data={result.flange} />
			<Cap data={result.cap} />

			<Bolt data={result.bolt} />
			{result.washers && <Washer data={result.washers} />}
			<Gasket data={result.gasket} />
			{result.embed && <Embed data={result.embed} />}

			{result.calc.basis && (
				<>
					<Deformation data={result.calc} gasket={result.gasket} formulas={result.formulas} />
					<ForcesInBolts
						data={result.calc}
						formulas={result.formulas}
						typeQt={getTypeQt()}
						path='basis'
						pb='Pb'
						pb1='Pb1'
						pb2='Pb2'
						pbr='Pbr'
					/>
					<BoltStrength
						data={result.calc}
						res={result.gasket}
						formulas={result.formulas}
						path='basis'
						sigmaB1='sigmaB1'
						sigmaB2='sigmaB2'
						dSigmaM='dSigmaM'
						dSigmaR='dSigmaR'
						q='q'
					/>
					<Conclusions
						data={result.calc}
						gasket={result.gasket}
						temp={result.data.temp}
						pathBasis='basis'
						pathQ='q'
					/>
					<Moment
						data={result.calc}
						formulas={result.formulas}
						gasket={result.gasket}
						path='basis'
						mkp='Mkp'
						mkp1='Mkp1'
					/>
				</>
			)}
			{result.calc.strength && (
				<>
					<Auxiliary
						data={result.calc}
						basis={result.data}
						gasket={result.gasket}
						flange={result.flange}
						cap={result.cap}
						bolt={result.bolt}
						formulas={result.formulas}
						typeGamma={getTypeGamma()}
					/>
					<Tightness data={result.calc} formulas={result.formulas} />
					<BoltStrength
						data={result.calc}
						res={result.gasket}
						formulas={result.formulas}
						path='strength'
						sigmaB1='fSigmaB1'
						sigmaB2='fSigmaB2'
						dSigmaM='fDSigmaM'
						dSigmaR='fDSigmaR'
						q='fQ'
					/>
					<StrengthMoment data={result.calc.strength} formulas={result.formulas} mkp='fMkp' mkp1='fMkp1' />
					<StaticResistance
						data={result.calc.strength.strength}
						flange={result.flange}
						index={0}
						title='Расчет фланца на статическую прочность'
						formulas={result.formulas}
					/>
					<TightnessLoad data={result.calc} typeQt={getTypeQt()} formulas={result.formulas} />
					<BoltStrength
						data={result.calc}
						res={result.gasket}
						formulas={result.formulas}
						path='strength'
						sigmaB1='sSigmaB1'
						sigmaB2='sSigmaB2'
						dSigmaM='sDSigmaM'
						dSigmaR='sDSigmaR'
						q='sQ'
					/>
					<StrengthMoment data={result.calc.strength} formulas={result.formulas} mkp='sMkp' mkp1='sMkp1' />
					<StaticResistance
						data={result.calc.strength.strength}
						flange={result.flange}
						index={1}
						title='Расчет фланца на статическую прочность c учетом температурных деформаций'
						formulas={result.formulas}
					/>
					<h5 className={classes.title}>Анализ результатов расчета</h5>
					<Deformation data={result.calc} gasket={result.gasket} formulas={result.formulas} />
					<ForcesInBolts
						data={result.calc}
						formulas={result.formulas}
						typeQt={getTypeQt()}
						path='strength'
						pb='sPb'
						pb1='sPb1'
						pb2='sPb2'
						pbr='sPbr'
					/>
					<BoltStrength
						data={result.calc}
						res={result.gasket}
						formulas={result.formulas}
						path='strength'
						sigmaB1='sSigmaB1'
						sigmaB2='sSigmaB2'
						dSigmaM='sDSigmaM'
						dSigmaR='sDSigmaR'
						q='sQ'
					/>
					<Conclusions
						data={result.calc}
						gasket={result.gasket}
						temp={result.data.temp}
						pathBasis='strength'
						pathQ='sQ'
					/>
					<SealingCondition
						data={result.calc.strength}
						flange={result.flange}
						formulas={result.formulas?.strength}
					/>
					<SealingConclusions data={result.calc.strength} flange={result.flange} />
					<Moment
						data={result.calc}
						formulas={result.formulas}
						gasket={result.gasket}
						path='strength'
						mkp='sMkp'
						mkp1='sMkp1'
					/>
				</>
			)}
		</>
	)
}

export const Calc = memo(ResCalc)
