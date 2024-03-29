import React, { FC, lazy, memo, Suspense, useEffect } from 'react'
import useSWR from 'swr'
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form'
import { Input } from '../../../../../components/UI/Input/Input'
import { Select } from '../../../../../components/UI/Select/Select'
import { Container } from '../../../../components/Container/Container'
import { Loader } from '../../../../../components/UI/Loader/Loader'
import { IBolt, IFormFlangeCalc, IMaterial } from '../../../../types/flange'
import { Temp } from './Temp'
import ReadService from '../../../../service/read'
import classes from '../../../styles/page.module.scss'

const BoltMaterialData = lazy(() => import('../../../../components/BoltMaterialData/BoltMaterialData'))
const BoltData = lazy(() => import('../../../../components/BoltData/BoltData'))

const { Option } = Select

const boltTitles = {
	name: 'материала болта (шпильки)',
	alpha: 'материала болта (шпильки)',
	epsilonAt20: 'материала болта (шпильки)',
	epsilon: 'материала болта (шпильки)',
	limitAt20: 'Предел текучести стали при температуре 20 ℃',
	limit: 'Предел текучести стали при расчетной температуре',
	// sigmaAt20: 'Номинальное допускаемое напряжение для болтов (шпилек) при затяжке',
	// sigma: 'Номинальное допускаемое напряжение для болтов (шпилек) в рабочих условиях и при расчете на условия испытания',
}

const boltDesignation = {
	alpha: (
		<i>
			&alpha;<sub>б</sub>
		</i>
	),
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
			<sup>20</sup>
			<sub>Т</sub>
		</>
	),
	limit: (
		<>
			<i>&sigma;</i>
			<sup>р</sup>
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
	isFull?: boolean
	materials: IMaterial[]
	register: UseFormRegister<IFormFlangeCalc>
	control: Control<IFormFlangeCalc, any>
	setValue: UseFormSetValue<IFormFlangeCalc>
	errors: any
}

const Bolt: FC<Props> = ({ isFull, materials, register, control, setValue, errors }) => {
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

	const { data } = useSWR<{ data: IBolt[] }>(isFull ? '/sealur-moment/bolts/all' : null, ReadService.getData)

	useEffect(() => {
		if (data) setValue('bolts.boltId', data.data[0].id)
	}, [setValue, data])

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

			<Temp
				register={register}
				control={control}
				errors={errors}
				title='болта (шпильки)'
				letter='б'
				path='bolts'
			/>

			{isFull && data ? (
				<>
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

					{boltId === 'another' && (
						<Suspense fallback={<Loader background='fill' />}>
							<BoltData register={register} />
						</Suspense>
					)}
				</>
			) : null}

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
		</Container>
	)
}

export const InitDataForBolt = memo(Bolt)
