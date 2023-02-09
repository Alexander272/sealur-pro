import React, { FC, lazy, memo, Suspense, useEffect } from 'react'
import useSWR from 'swr'
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form'
import { Input } from '../../../../../components/UI/Input/Input'
import { Select } from '../../../../../components/UI/Select/Select'
import { Container } from '../../../../components/Container/Container'
import { Loader } from '../../../../../components/UI/Loader/Loader'
import { IBolt, IMaterial } from '../../../../types/flange'
import { IFormFloatingHead } from '../../../../types/floatingHead'
import ReadService from '../../../../service/read'
import classes from '../../../styles/page.module.scss'

const BoltMaterialData = lazy(() => import('../../../../components/BoltMaterialData/BoltMaterialData'))
// const MaterialData = lazy(() => import('../../../../components/MaterialData/MaterialData'))
const BoltData = lazy(() => import('../../../../components/BoltData/BoltData'))

const { Option } = Select

const boltTitles = {
	name: 'материала болта (шпильки)',
	epsilonAt20: 'материала болта (шпильки)',
	epsilon: 'материала болта (шпильки)',
	limitAt20: 'Предел текучести стали при температуре 20 ℃',
	limit: 'Предел текучести стали при расчетной температуре',
	// sigmaAt20: 'Номинальное допускаемое напряжение для болтов (шпилек) при затяжке',
	// sigma: 'Номинальное допускаемое напряжение для болтов (шпилек) в рабочих условиях и при расчете на условия испытания',
}

const boltDesignation = {
	epsilonAt20: (
		<i>
			E<sup>20</sup>
			<sub>б</sub>
		</i>
	),
	epsilon: (
		<i>
			E<sub>б</sub>
		</i>
	),
	limitAt20: (
		<>
			<i>&sigma;</i>
			<sub>Т</sub>
		</>
	),
	limit: (
		<>
			<i>&sigma;</i>
			<sub>Т</sub>
		</>
	),
	// sigmaAt20: (
	// 	<>
	// 		[<i>&sigma;</i>]<sup>б</sup>
	// 		<sub>н</sub>
	// 	</>
	// ),
	// sigma: (
	// 	<>
	// 		[<i>&sigma;</i>]<sup>б</sup>
	// 		<sub>н</sub>
	// 	</>
	// ),
}

type Props = {
	materials: IMaterial[]
	register: UseFormRegister<IFormFloatingHead>
	control: Control<IFormFloatingHead, any>
	setValue: UseFormSetValue<IFormFloatingHead>
	errors: any
}

const Bolt: FC<Props> = ({ materials, register, control, setValue, errors }) => {
	const markId = useWatch({
		control,
		name: `bolts.markId`,
	})
	const boltId = useWatch({
		control,
		name: `bolts.boltId`,
	})

	useEffect(() => {
		if (!markId) setValue('bolts.markId', materials[0].id)
	}, [setValue, markId, materials])

	const { data, isValidating } = useSWR<{ data: IBolt[] }>('/sealur-moment/bolts/all', ReadService.getData)

	useEffect(() => {
		if (data) setValue('bolts.boltId', data.data[0].id)
	}, [setValue, data])

	if (isValidating) return null

	return (
		<Container title='Исходные данные для болт/шпилька'>
			<div className={classes.line}>
				<p>Материал болта (шпильки)</p>
				<div className={classes['line-field']}>
					<Controller
						name='bolts.markId'
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
					<BoltMaterialData
						path='bolts.material'
						register={register}
						setValue={setValue}
						titles={boltTitles}
						designation={boltDesignation}
						errors={errors}
					/>
				</Suspense>
			)}

			<div className={classes.line}>
				<p>Наружный диаметр болта (шпильки)</p>
				<div className={classes['line-field']}>
					<Controller
						name='bolts.boltId'
						control={control}
						render={({ field }) => (
							<Select value={field.value} onChange={field.onChange}>
								{data?.data.map(b => (
									<Option key={b.id} value={b.id}>
										{b.title}
									</Option>
								))}
								<Option value={'another'}>Другое ...</Option>
							</Select>
						)}
					/>
				</div>
			</div>
			{boltId === 'another' && (
				<Suspense fallback={<Loader background='fill' />}>
					<BoltData register={register} />
				</Suspense>
			)}

			<div className={classes.line}>
				<p>Число болтов (шпилек)</p>
				<p className={classes.designation}>
					<i>n</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name='bolts.count'
						id='bolts.count'
						type='number'
						register={register}
						rule={{ required: true }}
						error={errors.bolts?.count}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Температура болтов (шпилек)</p>
				<p className={classes.designation}>
					<i>
						t<sub>б</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`bolts.temp`}
						id={`bolts.temp`}
						type='number'
						step={0.001}
						register={register}
						suffix='&#8451;'
						rule={{ required: true }}
						error={errors.bolts?.temp}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Расстояние между опорными поверхностями гайки и головки болта или опорными поверхностями гаек</p>
				<p className={classes.designation}>
					<i>
						L<sub>б0</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`bolts.distance`}
						id={`bolts.distance`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм;'
						rule={{ required: true }}
						error={errors.bolts?.distance}
					/>
				</div>
			</div>
		</Container>
	)
}

export const InitDataForBolt = memo(Bolt)
