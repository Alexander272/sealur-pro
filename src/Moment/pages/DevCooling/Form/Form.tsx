import React, { FC, memo } from 'react'
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import { Button } from '../../../../components/UI/Button/Button'
import { Checkbox } from '../../../../components/UI/Checkbox/Checkbox'
import { Loader } from '../../../../components/UI/Loader/Loader'
import { Person } from '../../../components/Person/Person'
import { Detail } from '../../../components/Detail/Detail'
import { InitDataForCalc } from './components/InitDataForCalc'
import { InitDataForCap } from './components/InitDataForCap'
import ReadService from '../../../service/read'
import { IFormDevCooling } from '../../../types/devCooling'
import { IFloatData } from '../../../types/floatingHead'
import ServerError from '../../../../Error/ServerError'
import { InitDataForTubeSheet } from './components/InitDataForTubeSheet'
import { InitDataForTube } from './components/InitDataForTube'
import { InitDataForBolt } from './components/InitDataForBolt'
import { InitDataForGasket } from './components/InitDataForGasket'
import classes from '../../styles/page.module.scss'

type Props = {
	register: UseFormRegister<IFormDevCooling>
	control: Control<IFormDevCooling, any>
	setValue: UseFormSetValue<IFormDevCooling>
	errors: any
}

const FormFields: FC<Props> = ({ register, control, setValue, errors }) => {
	const { data: res, error } = useSWR<{ data: IFloatData }>('/sealur-moment/data/dev-cooling', ReadService.getData)

	if (!res)
		return (
			<div className={classes.wrapper}>
				<Loader isFull />
			</div>
		)

	if (error) {
		console.log(error)
		toast.error(error.response)
		return <ServerError />
	}

	return (
		<>
			<InitDataForCalc register={register} control={control} errors={errors} />
			<InitDataForCap
				materials={res.data.flangeMaterials}
				register={register}
				control={control}
				setValue={setValue}
				errors={errors}
			/>
			<InitDataForTubeSheet
				materials={res.data.flangeMaterials}
				register={register}
				control={control}
				setValue={setValue}
				errors={errors}
			/>
			<InitDataForTube
				materials={res.data.flangeMaterials}
				register={register}
				control={control}
				setValue={setValue}
				errors={errors}
			/>
			<InitDataForBolt
				materials={res.data.boltMaterials}
				register={register}
				control={control}
				setValue={setValue}
				errors={errors}
			/>
			<InitDataForGasket
				gasket={res.data.gaskets}
				env={res.data.env}
				register={register}
				control={control}
				setValue={setValue}
				errors={errors}
			/>

			<div className={classes.divider} />

			<Checkbox
				id='isNeedFormulas'
				name='isNeedFormulas'
				register={register}
				label={'Подставлять значения в формулы'}
			/>

			<Person register={register} errors={errors} control={control} />
			<Detail register={register} errors={errors} control={control} />

			<div className={classes['form-button']}>
				<Button fullWidth>Рассчитать</Button>
			</div>
		</>
	)
}

export const Form = memo(FormFields)
