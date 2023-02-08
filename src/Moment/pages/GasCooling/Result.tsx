import { useEffect, useState } from 'react'
import { IGasCooling } from '../../types/res_gasCooling'
import { IDetail, IPersonData } from '../../types/flange'
import { Header } from '../../components/Header/HeaderNew'
import { ResultData } from './Result/Result'
import classes from '../styles/page.module.scss'

export default function Result() {
	const [result, setResult] = useState<IGasCooling | null>(null)
	const [person, setPerson] = useState<IPersonData | undefined>(undefined)
	const [detail, setDetail] = useState<IDetail | undefined>(undefined)

	useEffect(() => {
		const res = JSON.parse(localStorage.getItem('gas-cooling/result') || '')
		setResult(res.result)
		setPerson(res.person)
		setDetail(res.detail)
	}, [])

	return (
		<>
			<Header title='Результат расчета прокладки АВО (выбор по типоразмеру аппарата)' person={person} />
			<div className={classes.form}>
				{detail && (
					<div className={classes.detail}>
						<p>{detail.organization}</p>
						<p>{detail.facility}</p>
						<p>{detail.equipment}</p>
						<p>{detail.node}</p>
					</div>
				)}

				{result && <ResultData result={result} />}

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
	)
}
