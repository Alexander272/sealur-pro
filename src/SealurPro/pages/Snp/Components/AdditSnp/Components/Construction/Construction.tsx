import { ChangeEvent, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '../../../../../../../components/UI/Checkbox/Checkbox'
import { Jumper } from '../../../../../../components/Jumper/Jumper'
import { Mounting } from '../../../../../../components/Mounting/Mounting'
import { Dispatch, ProState } from '../../../../../../store/store'
import classes from '../../../../../style/pages.module.scss'

type Props = {}

export const Construction: FC<Props> = () => {
	const snp = useSelector((state: ProState) => state.snp.snp)
	const st = useSelector((state: ProState) => state.snp.st)
	const isJumper = useSelector((state: ProState) => state.snp.isJumper)
	const jumper = useSelector((state: ProState) => state.snp.jumper)
	const jumWidth = useSelector((state: ProState) => state.snp.jumWidth)
	const isHole = useSelector((state: ProState) => state.snp.isHole)
	const isMoun = useSelector((state: ProState) => state.snp.isMoun)
	const moun = useSelector((state: ProState) => state.snp.moun)

	const dispatch = useDispatch<Dispatch>()

	const checkedJumperHandler = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch.snp.setIsJumper(event.target.checked)
	}
	const changeJumperHandler = (value: string) => {
		dispatch.snp.setJumper(value)
	}
	const changeJumperWidthHandler = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch.snp.setJumperWidth(event.target.value)
	}

	const checkedHoleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch.snp.setIsHole(event.target.checked)
	}

	const checkedMounHandler = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch.snp.setIsMoun(event.target.checked)
	}
	const changeMounHandler = (value: string) => {
		dispatch.snp.setMoun(value)
	}

	return (
		<>
			<p className={classes.title}>Конструктивные элементы</p>
			<Jumper
				className={`${classes.group} ${classes.inline}`}
				checked={isJumper}
				checkedHandler={checkedJumperHandler}
				value={jumper}
				valueHandler={changeJumperHandler}
				width={jumWidth}
				widthHandler={changeJumperWidthHandler}
				disabled={st === '1' || st === '3'}
			/>

			<div className={classes.group}>
				<Checkbox
					id='holes'
					name='holes'
					label='Отверстия в наруж. ограничителе'
					checked={isHole}
					disabled={snp?.typePr === 'В'}
					onChange={checkedHoleHandler}
				/>
			</div>

			<Mounting
				className={`${classes.group} ${classes.inline}`}
				checked={isMoun}
				checkedHandler={checkedMounHandler}
				mounting={snp?.mounting || []}
				value={moun}
				valueHandler={changeMounHandler}
			/>
		</>
	)
}
