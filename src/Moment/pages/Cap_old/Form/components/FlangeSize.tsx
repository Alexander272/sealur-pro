import React, { useEffect } from 'react'
import { Control, Controller, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Input } from '../../../../../components/UI/Input/Input'
import { Select } from '../../../../../components/UI/Select/Select'
import { IFormCapCalcOld } from '../../../../types/cap'
import { IMaterial } from '../../../../types/flange'
import classes from '../../../styles/page.module.scss'

const { Option } = Select

const imgs = {
	welded: '/image/moment/flange/welded.webp',
	flat: '/image/moment/flange/flat.webp',
	free: '/image/moment/flange/free.webp',
}

type Props = {
	type: 'welded' | 'flat' | 'free'
	materials: IMaterial[]
	register: UseFormRegister<IFormCapCalcOld>
	control: Control<IFormCapCalcOld, any>
	setValue: UseFormSetValue<IFormCapCalcOld>
	errors: any
}

export default function FlangeSize({ type, materials, register, control, setValue, errors }: Props) {
	useEffect(() => {
		setValue(`flangeData.ringMarkId`, materials[0].id)
	}, [setValue, materials])

	return (
		<>
			<div className={classes.line}>
				<p>Материал кольца свободного фланца</p>
				<div className={classes['line-field']}>
					<Controller
						name={`flangeData.ringMarkId`}
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

			<div className={classes['line-image']}>
				<img src={imgs[type]} alt={type} />
			</div>

			<div className={classes.line}>
				<p>Наружный диаметр фланца</p>
				<p className={classes.designation}>
					<i>
						D<sub>н</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`flangeData.size.dOut`}
						id={`flangeData.size.dOut`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`flangesData?.size?.dOut`]}
					/>
				</div>
			</div>

			<div className={classes.line}>
				<p>Внутренний диаметр фланца</p>
				<p className={classes.designation}>
					<i>D</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`flangeData.size.d`}
						id={`flangeData.size.d`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`flangeData?.size?.d`]}
					/>
				</div>
			</div>

			{type === 'free' && (
				<>
					<div className={classes.line}>
						<p>Наружный диаметр кольца свободного фланца</p>
						<p className={classes.designation}>
							<i>
								D<sub>н.к</sub>
							</i>
						</p>
						<div className={classes['line-field']}>
							<Input
								name={`flangeData.size.dnk`}
								id={`flangeData.size.dnk`}
								type='number'
								step={0.001}
								register={register}
								suffix='мм'
								rule={{ required: true }}
								error={errors[`flangeData?.size?.dnk`]}
							/>
						</div>
					</div>
					<div className={classes.line}>
						<p>Внутренний диаметр кольца свободного фланца</p>
						<p className={classes.designation}>
							<i>
								D<sub>к</sub>
							</i>
						</p>
						<div className={classes['line-field']}>
							<Input
								name={`flangeData.size.dk`}
								id={`flangeData.size.dk`}
								type='number'
								step={0.001}
								register={register}
								suffix='мм'
								rule={{ required: true }}
								error={errors[`flangeData?.size?.dk`]}
							/>
						</div>
					</div>
					<div className={classes.line}>
						<p>Наружный диаметр контакта бурта и кольца свободного фланца</p>
						<p className={classes.designation}>
							<i>
								D<sub>s</sub>
							</i>
						</p>
						<div className={classes['line-field']}>
							<Input
								name={`flangeData.size.ds`}
								id={`flangeData.size.ds`}
								type='number'
								step={0.001}
								register={register}
								suffix='мм'
								rule={{ required: true }}
								error={errors[`flangeData?.size?.ds`]}
							/>
						</div>
					</div>
				</>
			)}

			<div className={classes.line}>
				<p>Толщина тарелки фланца</p>
				<p className={classes.designation}>
					<i>h</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`flangeData.size.h`}
						id={`flangeData.size.h`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`flangeData?.size?.h`]}
					/>
				</div>
			</div>
			{type === 'free' && (
				<>
					<div className={classes.line}>
						<p>
							Расстояние от наружной поверхности обечайки до внутренней окружности контакта бурта и кольца
							свободного фланца
						</p>
						<p className={classes.designation}>
							<i>
								h<sub>0</sub>
							</i>
						</p>
						<div className={classes['line-field']}>
							<Input
								name={`flangeData.size.h0`}
								id={`flangeData.size.h0`}
								type='number'
								step={0.001}
								register={register}
								suffix='мм'
								rule={{ required: true }}
								error={errors[`flangeData?.size?.h0`]}
							/>
						</div>
					</div>
					<div className={classes.line}>
						<p>Толщина кольца свободного фланца</p>
						<p className={classes.designation}>
							<i>
								h<sub>к</sub>
							</i>
						</p>
						<div className={classes['line-field']}>
							<Input
								name={`flangeData.size.hk`}
								id={`flangeData.size.hk`}
								type='number'
								step={0.001}
								register={register}
								suffix='мм'
								rule={{ required: true }}
								error={errors[`flangeData?.size?.hk`]}
							/>
						</div>
					</div>
				</>
			)}

			{type === 'welded' && (
				<div className={classes.line}>
					<p>Толщина втулки приварного встык фланца в месте присоединения к тарелке</p>
					<p className={classes.designation}>
						<i>
							S<sub>1</sub>
						</i>
					</p>
					<div className={classes['line-field']}>
						<Input
							name={`flangeData.size.s1`}
							id={`flangeData.size.s1`}
							type='number'
							step={0.001}
							register={register}
							suffix='мм'
							rule={{ required: true }}
							error={errors[`flangeData?.size?.s1`]}
						/>
					</div>
				</div>
			)}

			<div className={classes.line}>
				<p>
					Толщина втулки приварного встык фланца в месте приварки к обечайке (трубе), толщина обечайки (трубы)
					плоского фланца или бурта свободного фланца
				</p>
				<p className={classes.designation}>
					<i>
						S<sub>0</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`flangeData.size.s0`}
						id={`flangeData.size.s0`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`flangeData?.size?.s0`]}
					/>
				</div>
			</div>

			{type === 'welded' && (
				<div className={classes.line}>
					<p>Длина конической втулки приварного встык фланца</p>
					<p className={classes.designation}>
						<i>l</i>
					</p>
					<div className={classes['line-field']}>
						<Input
							name={`flangeData.size.l`}
							id={`flangeData.size.l`}
							type='number'
							step={0.001}
							register={register}
							suffix='мм'
							rule={{ required: true }}
							error={errors[`flangeData?.size?.l`]}
						/>
					</div>
				</div>
			)}

			<div className={classes.line}>
				<p>Диаметр окружности расположения болтов (шпилек)</p>
				<p className={classes.designation}>
					<i>
						D<sub>6</sub>
					</i>
				</p>
				<div className={classes['line-field']}>
					<Input
						name={`flangeData.size.d6`}
						id={`flangeData.size.d6`}
						type='number'
						step={0.001}
						register={register}
						suffix='мм'
						rule={{ required: true }}
						error={errors[`flangeData?.size?.d6`]}
					/>
				</div>
			</div>
		</>
	)
}
