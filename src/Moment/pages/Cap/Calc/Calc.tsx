import { FC, memo } from 'react'
import { IResCap } from '../../../types/res_cap'
import { Flange } from './components/Flange'
import { Data } from './components/Data'
import { ForcesInBolts } from './components/Calc/ForcesInBolts'
import { TightnessLoad } from './components/Calc/TightnessLoad'
import { Tightness } from './components/Calc/Tightness'
import { StaticResistance } from './components/Calc/StaticResistance'
import { Auxiliary } from './components/Calc/Auxiliary'
import { SealingCondition } from './components/Calc/SealingCondition'
import { SealingConclusions } from './components/Calc/SealingConclusions'
import { Cap } from './components/Cap'
import { Deformation } from '../../Flange/Calc/components/Calc/Deformation'
import { Bolt } from '../../Flange/Calc/components/Bolt'
import { Washer } from '../../Flange/Calc/components/Washer'
import { Gasket } from '../../Flange/Calc/components/Gasket'
import { Embed } from '../../Flange/Calc/components/Embed'
import classes from '../../styles/page.module.scss'
import { Moment } from '../../Flange/Calc/components/Calc/Moment'
import { BoltStrength } from '../../Flange/Calc/components/Calc/BoltStrength'
import { Conclusions } from '../../Flange/Calc/components/Calc/Conclusions'

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
					<Deformation
						data={result.calc.basis.deformation}
						gasket={result.gasket}
						formulas={result.formulas?.basis.deformation}
					/>
					<ForcesInBolts
						data={result.calc.basis.forcesInBolts}
						formulas={result.formulas?.basis.forcesInBolts}
						typeQt={getTypeQt()}
					/>
					<BoltStrength
						data={result.calc.basis.boltStrength}
						formulas={result.formulas?.basis.boltStrength}
						gasket={result.gasket}
					/>
					<Conclusions data={result.calc.basis.boltStrength} gasket={result.gasket} temp={result.data.temp} />
					<Moment
						data={result.calc.basis.moment}
						formulas={result.formulas?.basis.moment}
						gasket={result.gasket}
					/>
				</>
			)}

			{result.calc.strength && (
				<>
					<Auxiliary
						data={result.calc.strength.auxiliary}
						basis={result.data}
						gasket={result.gasket}
						flange={result.flange}
						cap={result.cap}
						bolt={result.bolt}
						formulas={result.formulas?.strength.auxiliary}
						typeGamma={getTypeGamma()}
					/>
					<Tightness data={result.calc.strength.tightness} formulas={result.formulas?.strength.tightness} />
					<BoltStrength
						data={result.calc.strength.boltStrength1}
						formulas={result.formulas?.strength.boltStrength1}
						gasket={result.gasket}
					/>
					<Moment
						data={result.calc.strength.moment1}
						formulas={result.formulas?.strength.moment1}
						gasket={result.gasket}
					/>
					<StaticResistance
						data={result.calc.strength.staticResistance1}
						cond={result.calc.strength.conditionsForStrength1}
						flange={result.flange}
						title='Расчет фланца на статическую прочность'
						formulas={result.formulas?.strength.staticResistance1}
						condFormulas={result.formulas?.strength.conditionsForStrength1}
					/>
					<TightnessLoad
						data={result.calc.strength.tightnessLoad}
						typeQt={getTypeQt()}
						formulas={result.formulas?.strength.tightnessLoad}
					/>
					<BoltStrength
						data={result.calc.strength.boltStrength2}
						formulas={result.formulas?.strength.boltStrength2}
						gasket={result.gasket}
					/>
					<Moment
						data={result.calc.strength.moment2}
						formulas={result.formulas?.strength.moment2}
						gasket={result.gasket}
					/>
					<StaticResistance
						data={result.calc.strength.staticResistance2}
						cond={result.calc.strength.conditionsForStrength2}
						flange={result.flange}
						title='Расчет фланца на статическую прочность c учетом температурных деформаций'
						formulas={result.formulas?.strength.staticResistance2}
						condFormulas={result.formulas?.strength.conditionsForStrength2}
					/>
					<h5 className={classes.title}>Анализ результатов расчета</h5>
					<Deformation
						data={result.calc.strength.deformation}
						gasket={result.gasket}
						formulas={result.formulas?.strength.deformation}
					/>
					<ForcesInBolts
						data={result.calc.strength.forcesInBolts}
						formulas={result.formulas?.strength.forcesInBolts}
						typeQt={getTypeQt()}
					/>
					<BoltStrength
						data={result.calc.strength.boltStrength2}
						formulas={result.formulas?.strength.boltStrength2}
						gasket={result.gasket}
					/>
					<Conclusions
						data={result.calc.strength.boltStrength2}
						gasket={result.gasket}
						temp={result.data.temp}
					/>
					<SealingCondition
						data={result.calc.strength.conditionsForStrength2}
						flange={result.flange}
						formulas={result.formulas?.strength.conditionsForStrength2}
					/>
					<SealingConclusions data={result.calc.strength.conditionsForStrength2} flange={result.flange} />
					<Moment
						data={result.calc.strength.finalMoment}
						formulas={result.formulas?.strength.finalMoment}
						gasket={result.gasket}
					/>
				</>
			)}
		</>
	)
}

export const Calc = memo(ResCalc)
