import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useModal } from '../../../components/Modal/hooks/useModal'
import { Modal } from '../../../components/Modal/Modal'
import { Button } from '../../../components/UI/Button/Button'
import { Input } from '../../../components/UI/Input/Input'
import { Select } from '../../../components/UI/Select/Select'
import classes from '../../pages/styles/page.module.scss'

type Props = {
	path: string
	register: UseFormRegister<any>
	// control: Control<any, any>
	setValue: UseFormSetValue<any>
	errors: any
	titles: {
		name: string
		alpha?: string
		epsilonAt20?: string
		epsilon?: string
		limitAt20?: string
		limit?: string
		sigmaAt20?: string
		sigma?: string
	}
	designation: {
		alpha?: JSX.Element
		epsilonAt20?: JSX.Element
		epsilon?: JSX.Element
		limitAt20?: JSX.Element
		limit?: JSX.Element
		sigmaAt20?: JSX.Element
		sigma?: JSX.Element
	}
}

const safetyFactor = {
	austenite: 1.9,
	carbonMax: 2.7,
	carbonMin: 2.3,
}

export default function BoltMaterialData({ path, register, setValue, titles, designation, errors }: Props) {
	const [limitAt20, setLimitAt20] = useState('')
	const [limit, setLimit] = useState('')
	const [steel, setSteel] = useState<'austenite' | 'carbon'>('austenite')
	const [carbon, setCarbon] = useState<'Min' | 'Max'>('Max')

	const { isOpen, toggle } = useModal()
	const { register: regInput, handleSubmit } = useForm<{ sigmaT: string; sigmaB: string }>()

	const steelHandler = (value: 'austenite' | 'carbon') => {
		setSteel(value)
		if (value === 'carbon') toggle()
	}
	const limitHandler = (event: ChangeEvent<HTMLInputElement>) => {
		let safety = safetyFactor['austenite']
		if (steel === 'carbon') safety = safetyFactor[(steel + carbon) as 'carbonMax']

		if (event.target.name === `${path}.limit`) {
			setLimit(event.target.value)
			setValue(`${path}.sigma`, (+event.target.value / safety).toFixed(2).toString())
		} else {
			setLimitAt20(event.target.value)
			setValue(`${path}.sigmaAt20`, (+event.target.value / safety).toFixed(2).toString())
		}
	}

	const closeHandler = () => {
		setSteel('austenite')
		toggle()
	}
	const safetyHandler: SubmitHandler<{ sigmaT: string; sigmaB: string }> = data => {
		let safety = 0
		if (+data.sigmaT / +data.sigmaB >= 0.7) {
			setCarbon('Max')
			safety = safetyFactor[(steel + 'Max') as 'carbonMax']
		} else {
			setCarbon('Min')
			safety = safetyFactor[(steel + 'Min') as 'carbonMax']
		}

		setValue(`${path}.sigma`, (+limit / safety).toFixed(2).toString())
		setValue(`${path}.sigmaAt20`, (+limitAt20 / safety).toFixed(2).toString())
		toggle()
	}

	return (
		<>
			<Modal isOpen={isOpen} toggle={toggle}>
				<Modal.Header title='Введите параметры' onClose={closeHandler} />
				<Modal.Content>
					<p>
						&sigma;<sup>20</sup>
						<sub>T</sub>
					</p>
					<Input name='sigmaT' id='sigmaT' type='number' step={0.001} register={regInput} />
					<p>
						&sigma;<sup>20</sup>
						<sub>B</sub>
					</p>
					<Input name='sigmaB' id='sigmaB' type='number' step={0.001} register={regInput} />
				</Modal.Content>
				<Modal.Footer>
					<Button onClick={handleSubmit(safetyHandler)} fullWidth>
						Рассчитать
					</Button>
					<div className={classes.divider} />
					<Button onClick={closeHandler} variant='grayPrimary' fullWidth>
						Отмена
					</Button>
				</Modal.Footer>
			</Modal>

			<div className={classes.line}>
				<p>Название {titles.name}</p>
				<div className={classes['line-field']}>
					<Input
						name={`${path}.title`}
						id={`${path}.title`}
						register={register}
						rule={{ required: true }}
						error={errors[`${path}?.title`]}
					/>
				</div>
			</div>

			{titles.alpha && designation.alpha ? (
				<div className={classes.line}>
					<p>Температурный коэффициент линейного расширения {titles.alpha}</p>
					<p className={classes.designation}>{designation.alpha}</p>
					<div className={classes['line-field']}>
						<Input
							name={`${path}.alphaF`}
							id={`${path}.alphaF`}
							type='number'
							step={0.001}
							register={register}
							suffix='*10^-6 1/&#8451;'
							rule={{ required: true }}
							error={errors[`${path}?.alphaF`]}
						/>
					</div>
				</div>
			) : null}

			{titles.epsilonAt20 && designation.epsilonAt20 ? (
				<div className={classes.line}>
					<p>Модуль продольной упругости {titles.epsilonAt20} при температуре 20 &#8451;</p>
					<p className={classes.designation}>{designation.epsilonAt20}</p>
					<div className={classes['line-field']}>
						<Input
							name={`${path}.epsilonAt20`}
							id={`${path}.epsilonAt20`}
							type='number'
							step={0.001}
							register={register}
							suffix='МПа'
							rule={{ required: true }}
							error={errors[`${path}?.epsilonAt20`]}
						/>
					</div>
				</div>
			) : null}

			{titles.epsilon && designation.epsilon ? (
				<div className={classes.line}>
					<p>Модуль продольной упругости {titles.epsilon} при расчетной температуре</p>
					<p className={classes.designation}>{designation.epsilon}</p>
					<div className={classes['line-field']}>
						<Input
							name={`${path}.epsilon`}
							id={`${path}.epsilon`}
							type='number'
							step={0.001}
							register={register}
							suffix='МПа'
							rule={{ required: true }}
							error={errors[`${path}?.epsilon`]}
						/>
					</div>
				</div>
			) : null}

			{/* {titles.sigmaAt20 && designation.sigmaAt20 ? (
				<div className={classes.line}>
					<p>{titles.sigmaAt20}</p>
					<p className={classes.designation}>{designation.sigmaAt20}</p>
					<div className={classes['line-field']}>
						<Input
							name={`${path}.sigmaAt20`}
							id={`${path}.sigmaAt20`}
							type='number'
							step={0.001}
							register={register}
							suffix='МПа'
							rule={{ required: true }}
							error={errors[`${path}?.sigmaAt20`]}
						/>
					</div>
				</div>
			) : null} */}

			{/* {titles.sigma && designation.sigma ? (
				<div className={classes.line}>
					<p>{titles.sigma}</p>
					<p className={classes.designation}>{designation.sigma}</p>
					<div className={classes['line-field']}>
						<Input
							name={`${path}.sigma`}
							id={`${path}.sigma`}
							type='number'
							step={0.001}
							register={register}
							suffix='МПа'
							rule={{ required: true }}
							error={errors[`${path}?.sigma`]}
						/>
					</div>
				</div>
			) : null} */}

			{titles.limitAt20 && designation.limitAt20 ? (
				<div className={classes.line}>
					<p>{titles.limitAt20}</p>
					<p className={classes.designation}>{designation.limitAt20}</p>
					<div className={classes['line-field']}>
						{/* <Input
							name={`${path}.sigmaAt20`}
							id={`${path}.sigmaAt20`}
							type='number'
							step={0.001}
							register={register}
							suffix='МПа'
							rule={{ required: true }}
							error={errors[`${path}?.sigmaAt20`]}
						/> */}
						<Input
							name={`${path}.limitAt20`}
							id={`${path}.limitAt20`}
							value={limitAt20}
							onChange={limitHandler}
							type='number'
							step={0.001}
							suffix='МПа'
						/>
					</div>
				</div>
			) : null}

			{titles.limit && designation.limit ? (
				<div className={classes.line}>
					<p>{titles.limit}</p>
					<p className={classes.designation}>{designation.limit}</p>
					<div className={classes['line-field']}>
						{/* <Input
							name={`${path}.sigma`}
							id={`${path}.sigma`}
							type='number'
							step={0.001}
							register={register}
							suffix='МПа'
							rule={{ required: true }}
							error={errors[`${path}?.sigma`]}
						/> */}
						<Input
							name={`${path}.limit`}
							id={`${path}.limit`}
							value={limit}
							onChange={limitHandler}
							type='number'
							step={0.001}
						/>
					</div>
				</div>
			) : null}

			{titles.limit || titles.limitAt20 ? (
				<div className={classes.line}>
					<p>Класс стали</p>
					<div className={classes['line-field']}>
						<Select value={steel} onChange={steelHandler}>
							<Select.Option value={'austenite'}>аустенитный класс</Select.Option>
							<Select.Option value={'carbon'}>углеродистая сталь</Select.Option>
						</Select>
					</div>
				</div>
			) : null}
		</>
	)
}
