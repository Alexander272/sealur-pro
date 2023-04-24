import React, { FC, memo } from 'react'
import { Control, Controller, UseFormRegister, useWatch } from 'react-hook-form'
import { Input } from '../../../../../components/UI/Input/Input'
import { Select } from '../../../../../components/UI/Select/Select'
import { Checkbox } from '../../../../../components/UI/Checkbox/Checkbox'
import { Container } from '../../../../components/Container/Container'
import { IFormDevCooling } from '../../../../types/devCooling'
import classes from '../../../styles/page.module.scss'

const { Option } = Select

type Props = {
	register: UseFormRegister<IFormDevCooling>
	control: Control<IFormDevCooling, any>
	errors: any
}

const Calc: FC<Props> = ({ register, control, errors }) => {
	const cameraDiagram = useWatch({
		control,
		name: 'cameraDiagram',
	})
	const layout = useWatch({
		control,
		name: 'layout',
	})
	const hasFriction = useWatch({
		control,
		name: 'hasFriction',
	})

	return (
		<Container title='Исходные данные для расчета'>
			<div className={classes.line}>
				<p>Расчетное давление</p>
				<div className={classes['line-field']}>
					<Input
						name='pressure'
						id='pressure'
						type='number'
						step={0.001}
						register={register}
						suffix='МПа'
						rule={{ required: true }}
						error={errors.pressure}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Расчетная температура</p>
				<div className={classes['line-field']}>
					<Input
						name='temp'
						id='temp'
						type='number'
						step={0.001}
						register={register}
						suffix='&#8451;'
						rule={{ required: true }}
						error={errors.temp}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Способ крепления труб</p>
				<div className={classes['line-field']}>
					<Controller
						name='method'
						control={control}
						render={({ field }) => (
							<Select value={field.value} onChange={field.onChange}>
								<Option value={'AllThickness'}>На всю толщину решетки</Option>
								<Option value={'PartThickness'}>В части толщины решетки</Option>
								<Option value={'SteelSheet'}>Стальная решетка с трубами из цветных металлов</Option>
							</Select>
						)}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Тип соединения</p>
				<div className={classes['line-field']}>
					<Controller
						name='type'
						control={control}
						render={({ field }) => (
							<Select value={field.value} onChange={field.onChange}>
								<Option value='bolt'>Болт</Option>
								<Option value='pin'>Шпилька</Option>
							</Select>
						)}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Способ крепления труб в трубной решетке</p>
				<div className={classes['line-field']}>
					<Controller
						name='mounting'
						control={control}
						render={({ field }) => (
							<Select value={field.value} onChange={field.onChange}>
								<Option value={'flaring'}>Развальцовка</Option>
								<Option value={'welding'}>Приварка</Option>
								<Option value={'rolling'}>Приварка с подвальцовкой</Option>
							</Select>
						)}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Тип крепления труб в трубной решетке</p>
				<div className={classes['line-field']}>
					<Controller
						name='typeMounting'
						control={control}
						render={({ field }) => (
							<Select value={field.value} onChange={field.onChange}>
								<Option value={'flat'}>Гладкое соединение</Option>
								<Option value={'groove'}>Вальцовка в канавку</Option>
							</Select>
						)}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<Checkbox id='hasFriction' name='hasFriction' register={register} label='Коэффициент трения' />
				<div className={classes['line-field']}>
					{hasFriction && (
						<Input name='friction' id='friction' type='number' step={0.001} register={register} />
					)}
				</div>
			</div>

			<div className={classes.line}>
				<p>Схема камеры аппарата воздушного охлаждения</p>
				<div className={classes['line-field']}>
					<Controller
						name='cameraDiagram'
						control={control}
						render={({ field }) => (
							<Select value={field.value} onChange={field.onChange}>
								<Option value='schema1'>Черт. 1. ГОСТ 25822-83</Option>
								<Option value='schema2'>Черт. 2. ГОСТ 25822-83</Option>
								<Option value='schema3'>Черт. 3. ГОСТ 25822-83</Option>
								<Option value='schema4'>Черт. 4. ГОСТ 25822-83</Option>
								<Option value='schema5'>Черт. 5. ГОСТ 25822-83</Option>
							</Select>
						)}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Схема размещения отверстий</p>
				<div className={classes['line-field']}>
					<Controller
						name='layout'
						control={control}
						render={({ field }) => (
							<Select value={field.value} onChange={field.onChange}>
								<Option value='lSchema1'>Черт. 11. ГОСТ 25822-83</Option>
								<Option value='lSchema2'>Черт. 12. ГОСТ 25822-83</Option>
							</Select>
						)}
					/>
				</div>
			</div>

			<div>
				<p className={classes.title}>Чертеж камеры аппарата воздушного охлаждения</p>
				<div className={classes['line-image']}>
					<img src={`/image/moment/dev-cooling/${cameraDiagram}.webp`} alt={`${cameraDiagram}`} />
				</div>

				<p className={classes.title}>Схема размещения отверстий</p>
				<div className={classes['line-image']}>
					<img src={`/image/moment/dev-cooling/${layout}.webp`} alt={`${layout}`} />
				</div>
			</div>
		</Container>
	)
}

export const InitDataForCalc = memo(Calc)
