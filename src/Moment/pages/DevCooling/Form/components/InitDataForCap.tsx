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
	name: 'материала крышки',
	epsilon: 'материала крышки',
	sigmaAt20: 'Допускаемое напряжение для материала крышки при температуре 20 ℃',
	sigma: 'Допускаемое напряжение для материала крышки при расчетной температуре',
}

const matDesignation = {
	epsilon: (
		<i>
			E<sub>к</sub>
		</i>
	),
	sigmaAt20: (
		<>
			[<i>&sigma;</i>]<sup>20</sup>
			<sub>к</sub>
		</>
	),
	sigma: (
		<>
			[<i>&sigma;</i>]<sub>к</sub>
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

const Cap: FC<Props> = ({ materials, register, control, setValue, errors }) => {
	const markId = useWatch({ control, name: `cap.markId` })
	const cameraDiagram = useWatch({ control, name: `cameraDiagram` })

	useEffect(() => {
		if (!markId) {
			setValue(`cap.markId`, materials[0].id)
		}
	}, [setValue, materials, markId])

	return (
		<Container title='Исходные данные для крышки'>
			<div className={classes.line}>
				<p>Толщина донышка крышки</p>
				<p className={classes.designation}>
					<i>
						s<sub>4</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`cap.bottomThick`}
						id={`cap.bottomThick`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`cap?.bottomThick`]}
					/>
				</div>
			</div>

			{cameraDiagram === 'schema1' || cameraDiagram === 'schema2' || cameraDiagram === 'schema3' ? (
				<div className={classes.line}>
					<p>Толщина стенки крышки в месте присоединения к фланцу</p>
					<p className={classes.designation}>
						<i>
							s<sub>5</sub>
						</i>
					</p>
					<div className={classes['line-field']}>
						<Input
							name={`cap.wallThick`}
							id={`cap.wallThick`}
							type='number'
							step={0.001}
							register={register}
							suffix='мм'
							rule={{ required: true }}
							error={errors[`cap?.wallThick`]}
						/>
					</div>
				</div>
			) : null}

			<div className={classes.line}>
				<p>Толщина фланца крышки</p>
				<p className={classes.designation}>
					<i>
						s<sub>6</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`cap.flangeThick`}
						id={`cap.flangeThick`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`cap?.flangeThick`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Толщина боковой стенки</p>
				<p className={classes.designation}>
					<i>
						s<sub>7</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`cap.sideWallThick`}
						id={`cap.sideWallThick`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`cap?.sideWallThick`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Внутренний размер камеры в поперечном направлении</p>
				<p className={classes.designation}>
					<i>
						B<sub>0</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`cap.innerSize`}
						id={`cap.innerSize`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`cap?.innerSize`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Наружный размер камеры в поперечном направлении</p>
				<p className={classes.designation}>
					<i>
						B<sub>4</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`cap.outerSize`}
						id={`cap.outerSize`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`cap?.outerSize`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Глубина камеры (крышки)</p>
				<p className={classes.designation}>
					<i>H</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`cap.depth`}
						id={`cap.depth`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`cap?.depth`]}
					/>
				</div>
			</div>

			{cameraDiagram === 'schema2' || cameraDiagram === 'schema3' ? (
				<div className={classes.line}>
					<p>Радиус гиба в углу крышки камеры</p>
					<p className={classes.designation}>
						<i>R</i>
					</p>
					<div className={classes['line-field']}>
						<Input
							name={`cap.radius`}
							id={`cap.radius`}
							type='number'
							step={0.001}
							register={register}
							suffix='мм'
							rule={{ required: true }}
							error={errors[`cap?.radius`]}
						/>
					</div>
				</div>
			) : null}
			<div className={classes.line}>
				<p>Внутренний размер камеры в продольном направлении</p>
				<p className={classes.designation}>
					<i>
						L<sub>0</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`cap.L`}
						id={`cap.L`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`cap?.L`]}
					/>
				</div>
			</div>

			{cameraDiagram === 'schema5' || cameraDiagram === 'schema1' ? (
				<div className={classes.line}>
					<p>Коэффициент прочности сварного шва</p>
					<p className={classes.designation}>
						<i>&phi;</i>
					</p>
					<div className={classes['line-field']}>
						<Input
							name={`cap.strength`}
							id={`cap.strength`}
							type='number'
							step={0.001}
							register={register}
							rule={{ required: true }}
							error={errors[`cap?.strength`]}
						/>
					</div>
				</div>
			) : null}

			<div className={classes.line}>
				<p>Прибавка на коррозию</p>
				<p className={classes.designation}>
					<i>
						c<sub>к</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`cap.corrosion`}
						id={`cap.corrosion`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`cap?.corrosion`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Материал фланца</p>
				<div className={classes['line-field']}>
					<Controller
						name={`cap.markId`}
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
						path={`cap.material`}
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

export const InitDataForCap = memo(Cap)
