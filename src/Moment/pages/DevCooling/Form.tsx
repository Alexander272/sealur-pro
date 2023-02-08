import { AxiosError } from 'axios'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MomentUrl } from '../../../components/routes'
import { Loader } from '../../../components/UI/Loader/Loader'
import { Header } from '../../components/Header/HeaderNew'
import CalcService from '../../service/calc'
import { IFormDevCooling } from '../../types/devCooling'
import { IResDevCooling } from '../../types/res_devCooling'
import { Form } from './Form/Form'
import classes from '../styles/page.module.scss'

const initFormValue = {
	type: 'pin' as 'pin',
	method: 'AllThickness' as 'AllThickness',
	mounting: 'flaring' as 'flaring',
	typeMounting: 'flat' as 'flat',
	cameraDiagram: 'schema1' as 'schema1',
	layout: 'lSchema1' as 'lSchema1',
	isNeedFormulas: true,
	personData: {
		hasPerson: false,
	},
	detailData: {
		hasDetail: false,
	},
}

export default function FormContainer() {
	const linkRef = useRef<HTMLAnchorElement | null>(null)

	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IFormDevCooling>({
		defaultValues: initFormValue,
	})

	const [isLoading, setLoading] = useState(false)

	const calculateHandler: SubmitHandler<IFormDevCooling> = async data => {
		setLoading(true)

		const person = data.personData?.hasPerson ? data.personData : undefined
		const detail = data.detailData?.hasDetail ? data.detailData : undefined
		data.personData = undefined
		data.detailData = undefined

		try {
			const res = await CalcService.Calculate<IFormDevCooling, IResDevCooling>(
				'/sealur-moment/calc/dev-cooling',
				data
			)
			if (!res.data) return

			localStorage.setItem('dev-cooling/result', JSON.stringify({ result: res.data, person, detail }))
			linkRef.current?.click()
		} catch (error) {
			const err = error as AxiosError

			if (err.response?.status === 500) {
				toast.error('На сервере произошла ошибка. Код ошибки: ' + (err.response?.data?.code || 'F000'), {
					autoClose: false,
				})
			} else if (err.response?.status === 400) {
				toast.error('Проверьте правильность заполнения полей')
			} else {
				toast.error('Произошла ошибка')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Header title='Расчет аппаратов воздушного охлаждения' />
			{isLoading && <Loader background='fill' />}
			<Link to={MomentUrl + '/dev-cooling/result'} ref={linkRef} target='_blank' />

			<form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
				<Form register={register} control={control} setValue={setValue} errors={errors} />
			</form>
		</>
	)
}
