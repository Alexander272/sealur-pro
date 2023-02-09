import { FC, lazy, memo, Suspense, useEffect } from 'react'
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form'
import { Container } from '../../../../components/Container/Container'
import { Input } from '../../../../../components/UI/Input/Input'
import { Select } from '../../../../../components/UI/Select/Select'
import { Loader } from '../../../../../components/UI/Loader/Loader'
import { IFormDevCooling } from '../../../../types/devCooling'
import { IMaterial } from '../../../../types/flange'
import classes from '../../../styles/page.module.scss'

const MaterialData = lazy(() => import('../../../../components/MaterialData/MaterialData'))

const { Option } = Select

const matTitles = {
	name: 'материала трубной решетки',
	epsilon: 'материала трубной решетки',
	sigmaAt20: 'Допускаемое напряжение для материала трубной решетки при температуре 20 ℃',
	sigma: 'Допускаемое напряжение для материала трубной решетки при расчетной температуре',
}

const matDesignation = {
	epsilon: (
		<i>
			E<sub>р</sub>
		</i>
	),
	sigmaAt20: (
		<>
			[<i>&sigma;</i>]<sup>20</sup>
			<sub>р</sub>
		</>
	),
	sigma: (
		<>
			[<i>&sigma;</i>]<sub>р</sub>
		</>
	),
}

type Props = {
	materials: IMaterial[]
	register: UseFormRegister<IFormDevCooling>
	control: Control<IFormDevCooling, any>
	setValue: UseFormSetValue<IFormDevCooling>
	errors: any
}

const TubeSheet: FC<Props> = ({ materials, register, control, setValue, errors }) => {
	const markId = useWatch({ control, name: `tubeSheet.markId` })

	useEffect(() => {
		if (!markId) {
			setValue(`tubeSheet.markId`, materials[0].id)
		}
	}, [setValue, materials, markId])

	return (
		<Container title='Исходные данные для трубной решетки'>
			<div className={classes.line}>
				<p>Толщина трубной решетки в пределах зоны перфорации</p>
				<p className={classes.designation}>
					<i>
						s<sub>1</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name='tubeSheet.zoneThick'
						id='tubeSheet.zoneThick'
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`tubeSheet?.zoneThick`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Толщина трубной решетки в месте уплотнения</p>
				<p className={classes.designation}>
					<i>
						s<sub>2</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`tubeSheet.placeThick`}
						id={`tubeSheet.placeThick`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`tubeSheet?.placeThick`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Толщина трубной решетки вне зоны уплотнения</p>
				<p className={classes.designation}>
					<i>
						s<sub>3</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`tubeSheet.outZoneThick`}
						id={`tubeSheet.outZoneThick`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`tubeSheet?.outZoneThick`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>
					Ширина зоны решетки толщиной s<sub>1</sub>
				</p>
				<p className={classes.designation}>
					<i>
						B<sub>1</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`tubeSheet.width`}
						id={`tubeSheet.width`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`tubeSheet?.width`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Шаг отверстий под трубы в продольном направлении</p>
				<p className={classes.designation}>
					<i>
						t<sub>1</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`tubeSheet.stepLong`}
						id={`tubeSheet.stepLong`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`tubeSheet?.stepLong`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Шаг отверстий под трубы в поперечном направлении</p>
				<p className={classes.designation}>
					<i>
						t<sub>2</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`tubeSheet.stepTrans`}
						id={`tubeSheet.stepTrans`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`tubeSheet?.stepTrans`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Число рядов труб в поперечном направлении</p>
				<p className={classes.designation}>
					<i>z</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`tubeSheet.count`}
						id={`tubeSheet.count`}
						type='number'
						step={0.001}
						register={register}
						rule={{ required: true }}
						error={errors[`tubeSheet?.count`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Диаметр трубных отверстий в решетках</p>
				<p className={classes.designation}>
					<i>
						d<sub>0</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`tubeSheet.diameter`}
						id={`tubeSheet.diameter`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`tubeSheet?.diameter`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Прибавка на коррозию</p>
				<p className={classes.designation}>
					<i>
						c<sub>р</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`tubeSheet.corrosion`}
						id={`tubeSheet.corrosion`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`tubeSheet?.corrosion`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Материал фланца</p>
				<div className={classes['line-field']}>
					<Controller
						name={`tubeSheet.markId`}
						control={control}
						render={({ field }) => (
							<Select value={field.value} onChange={field.onChange}>
								{materials.map(m => (
									<Option key={m.id} value={m.id}>
										{m.title}
									</Option>
								))}
								<Option value={'another'}>Другое ...</Option>
							</Select>
						)}
					/>
				</div>
			</div>
			{markId === 'another' && (
				<Suspense fallback={<Loader background='fill' />}>
					<MaterialData
						path={`tubeSheet.material`}
						register={register}
						titles={matTitles}
						designation={matDesignation}
						errors={errors}
					/>
				</Suspense>
			)}
		</Container>
	)
}

export const InitDataForTubeSheet = memo(TubeSheet)
