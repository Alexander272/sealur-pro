import { FC } from 'react'
import { IPersonData } from '../../types/flange'
import classes from './header.module.scss'

type Props = {
	title: string
	person?: IPersonData
}

export const Header: FC<Props> = ({ title, person }) => {
	if (person)
		return (
			<header className={classes.confirm}>
				<img className={classes.logo} width='192' height='192' src='/logo192.webp' alt='logo' />
				<div className={classes.person}>
					<p className={classes.company}>"УТВЕРЖДАЮ"</p>
					<p>{person.supervisor.position}</p>
					<p>______________ {person.supervisor.name}</p>
					<p>"_____" _______________ {new Date().getFullYear()} г.</p>
				</div>
				<p className={`${classes.name} ${classes.title}`}>{title}</p>
			</header>
		)

	return (
		<header className={classes.header}>
			<img className={classes.logo} width='192' height='192' src='/logo192.webp' alt='logo' />
			<div className={classes.info}>
				<p className={classes.company}>ООО "СИЛУР"</p>
				<p className={classes.name}>{title}</p>
			</div>
		</header>
	)
}
