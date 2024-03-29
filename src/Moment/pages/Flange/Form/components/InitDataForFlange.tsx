import React, { FC, lazy, memo, Suspense, useEffect, useState } from 'react'
import useSWR from 'swr'
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form'
import { Input } from '../../../../../components/UI/Input/Input'
import { Select } from '../../../../../components/UI/Select/Select'
import { Container } from '../../../../components/Container/Container'
import { IFormFlangeCalc, IMaterial, IStandart, ITypeFlange } from '../../../../types/flange'
import { Temp } from './Temp'
import { FlangeDefSize } from './FlangeDefSize'
import ReadService from '../../../../service/read'
import classes from '../../../styles/page.module.scss'
import { Loader } from '../../../../../components/UI/Loader/Loader'

const FlangeSize = lazy(() => import('./FlangeSize'))
const MaterialData = lazy(() => import('../../../../components/MaterialData/MaterialData'))

const { Option } = Select

const matTitles = {
	name: 'материала фланца',
	alpha: 'материала фланца',
	epsilonAt20: 'материала фланца',
	epsilon: 'материала фланца',
	sigmaAt20: 'Допускаемое напряжение для материала фланца или бурта свободного фланца при температуре 20 ℃',
	sigma: 'Допускаемое напряжение для материала фланца или бурта свободного фланца при расчетной температуре',
}

const ringMatTitles = {
	name: 'материала кольца свободного фланца',
	alpha: 'материала свободного кольца',
	epsilonAt20: 'материала свободного кольца',
	epsilon: 'материала свободного кольца',
	sigmaAt20: 'Допускаемое напряжение для материала кольца свободного фланца при температуре 20 ℃',
	sigma: 'Допускаемое напряжение для материала кольца свободного фланца при расчетной температуре',
}

const matDesignation = {
	alpha: (
		<i>
			&alpha;<sub>ф</sub>
		</i>
	),
	epsilonAt20: (
		<i>
			E<sup>20</sup>
		</i>
	),
	epsilon: <i>E</i>,
	sigmaAt20: (
		<>
			[<i>&sigma;</i>]<sup>20</sup>
		</>
	),
	sigma: (
		<>
			[<i>&sigma;</i>]
		</>
	),
}

const ringMatDesignation = {
	alpha: (
		<i>
			&alpha;<sub>к</sub>
		</i>
	),
	epsilonAt20: (
		<i>
			E<sup>20</sup>
			<sub>к</sub>
		</i>
	),
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
	id: 'first' | 'second'
	typeFlange: ITypeFlange[]
	standarts: IStandart[]
	materials: IMaterial[]
	register: UseFormRegister<IFormFlangeCalc>
	control: Control<IFormFlangeCalc, any>
	setValue: UseFormSetValue<IFormFlangeCalc>
	errors: any
}

const Flange: FC<Props> = ({ id, typeFlange, standarts, materials, register, control, setValue, errors }) => {
	const type = useWatch({
		control,
		name: `flangesData.${id}.type`,
	})
	const standartId = useWatch({
		control,
		name: `flangesData.${id}.standartId`,
	})

	const markId = useWatch({
		control,
		name: `flangesData.${id}.markId`,
	})
	const ringMarkId = useWatch({
		control,
		name: `flangesData.${id}.ringMarkId`,
	})

	const [stands, setStands] = useState(standarts)

	useEffect(() => {
		if (!standartId) {
			setValue(`flangesData.${id}.type`, 'welded')
			setValue(`flangesData.${id}.standartId`, standarts[0].id)
			setValue(`flangesData.${id}.markId`, materials[0].id)
			setValue(`flangesData.${id}.dy`, standarts[0].sizes.sizeRow1[0].dn)
			setValue(`flangesData.${id}.py`, standarts[0].sizes.sizeRow1[0].pn[0].pn)
			setValue(`flangesData.${id}.corrosion`, '2')
			setValue(`flangesData.${id}.row`, 0)
		}
	}, [setValue, id, standartId, standarts, materials])

	const condition = typeFlange.find(tf => tf.id === stands[0]?.typeId)?.label !== type && type
	// условная выборка
	const { data } = useSWR<{ data: IStandart[] }>(
		condition ? `/sealur-moment/standarts/size?typeId=${typeFlange.find(tf => tf.label === type)?.id}` : null,
		ReadService.getData
	)

	useEffect(() => {
		if (condition) {
			if (data && data.data) {
				setStands(data.data)
				setValue(`flangesData.${id}.standartId`, data.data[0].id)
			} else if (data && !data.data) {
				setStands([])
				setValue(`flangesData.${id}.standartId`, 'another')
			} else {
				setValue(`flangesData.${id}.standartId`, 'another')
			}
		}
	}, [data, id, setValue, condition])

	if (!typeFlange || !standarts || !materials) return null

	return (
		<Container title={`Исходные данные для ${id === 'first' ? 'первого' : 'второго'} фланца`}>
			<div className={classes.line}>
				<p>Тип фланца</p>
				<div className={classes['line-field']}>
					<Controller
						name={`flangesData.${id}.type`}
						control={control}
						render={({ field }) => (
							<Select value={field.value} onChange={field.onChange}>
								{typeFlange.map(tf => (
									<Option key={tf.id} value={tf.label}>
										{tf.title}
									</Option>
								))}
							</Select>
						)}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Параметры фланца</p>
				<div className={classes['line-field']}>
					<Controller
						name={`flangesData.${id}.standartId`}
						control={control}
						render={({ field }) => (
							<Select value={field.value} onChange={field.onChange}>
								{stands.map(s => (
									<Option key={s.id} value={s.id}>
										{s.title}
									</Option>
								))}
								<Option value={'another'}>Другое ...</Option>
							</Select>
						)}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Материал фланца</p>
				<div className={classes['line-field']}>
					<Controller
						name={`flangesData.${id}.markId`}
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
				title='фланца'
				letter='ф'
				path={`flangesData.${id}`}
			/>

			{standartId === 'another' ? (
				<Suspense fallback={<Loader background='fill' />}>
					<FlangeSize
						id={id}
						type={type}
						materials={materials}
						register={register}
						control={control}
						setValue={setValue}
						errors={errors}
					/>
				</Suspense>
			) : (
				<FlangeDefSize id={id} standarts={stands} register={register} control={control} setValue={setValue} />
			)}

			<div className={classes.line}>
				<p>Прибавка на коррозию</p>
				<p className={classes.designation}>
					<i>c</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`flangesData.${id}.corrosion`}
						id={`flangesData.${id}.corrosion`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
					/>
				</div>
			</div>

			{markId === 'another' && (
				<Suspense fallback={<Loader background='fill' />}>
					<MaterialData
						path={`flangesData.${id}.material`}
						register={register}
						titles={matTitles}
						designation={matDesignation}
						errors={errors}
					/>
				</Suspense>
			)}
			{ringMarkId === 'another' && (
				<Suspense fallback={<Loader background='fill' />}>
					<MaterialData
						path={`flangesData.${id}.ringMaterial`}
						register={register}
						titles={ringMatTitles}
						designation={ringMatDesignation}
						errors={errors}
					/>
				</Suspense>
			)}
		</Container>
	)
}

export const InitDataForFlange = memo(Flange)
