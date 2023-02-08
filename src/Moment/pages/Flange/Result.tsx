import { useEffect, useState } from 'react'
import { IResFlange } from '../../types/res_flange'
import { IDetail, IPersonData } from '../../types/flange'
import { Header } from '../../components/Header/HeaderNew'
import { Calc } from './Calc/Calc'
import classes from '../styles/page.module.scss'

export default function Result() {
	const [result, setResult] = useState<IResFlange | null>(null)
	const [person, setPerson] = useState<IPersonData | undefined>(undefined)
	const [detail, setDetail] = useState<IDetail | undefined>(undefined)

	useEffect(() => {
		const res = JSON.parse(localStorage.getItem('flange/result') || '')
		setResult(res.result)
		setPerson(res.person)
		setDetail(res.detail)
	}, [])

	return (
		// <div className={classes.wrapper}>
		<>
			<Header title='Результат расчета соединения фланец-фланец' person={person} />
			<div className={classes.form}>
				{detail && (
					<div className={classes.detail}>
						<p>{detail.organization}</p>
						<p>{detail.facility}</p>
						<p>{detail.equipment}</p>
						<p>{detail.node}</p>
					</div>
				)}

				{result && <Calc result={result} />}

				{person && (
					<div>
						<p>Расчет выполнил</p>
						<p className={classes.performer}>
							<span>{person.performer.position}</span> <span>{person.performer.name}</span>
						</p>
					</div>
				)}
			</div>
		</>
		// </div>
	)
}
