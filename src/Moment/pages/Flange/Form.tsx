import { useRef, useState } from 'react'
import useSWR from 'swr'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { Loader } from '../../../components/UI/Loader/Loader'
import { MomentUrl } from '../../../components/routes'
import { Header } from '../../components/Header/HeaderNew'
import { IFlangeData, IFormFlangeCalc } from '../../types/flange'
import { IResFlange } from '../../types/res_flange_old'
import ServerError from '../../../Error/ServerError'
import ReadService from '../../service/read'
import CalcService from '../../service/calc'
import { Form } from './Form/Form'
import classes from '../styles/page.module.scss'

const initFormValue = {
	isWork: true,
	isSameFlange: true,
	isEmbedded: false,
	flanges: 'nonIsolated' as 'nonIsolated',
	type: 'pin' as 'pin',
	condition: 'controllable' as 'controllable',
	calculation: 'basis' as 'basis',
	isNeedFormulas: true,
	isUseWasher: false,
	personData: {
		hasPerson: false,
	},
	detailData: {
		hasDetail: false,
	},
}

export default function FormContainer() {
	const { data, error } = useSWR<{ data: IFlangeData }>('/sealur-moment/data/flange', ReadService.getData)

	const linkRef = useRef<HTMLAnchorElement | null>(null)

	const [isLoading, setLoading] = useState(false)
	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IFormFlangeCalc>({
		defaultValues: initFormValue,
	})

	if (!data)
		return (
			<div className={classes.wrapper}>
				<Loader isFull />
			</div>
		)

	if (error) return <ServerError />

	const calculateHandler: SubmitHandler<IFormFlangeCalc> = async data => {
		setLoading(true)
		const person = data.personData?.hasPerson ? data.personData : null
		const detail = data.detailData?.hasDetail ? data.detailData : null
		data.personData = undefined
		data.detailData = undefined

		try {
			const res = await CalcService.Calculate<IFormFlangeCalc, IResFlange>('/sealur-moment/calc/flange', data)
			if (!res.data) return

			localStorage.setItem('flange/result', JSON.stringify({ result: res.data, person, detail }))
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
			<Header title='Расчет соединения фланец-фланец' />
			{isLoading && <Loader background='fill' />}
			<Link to={MomentUrl + '/flange/result'} target='_blank' ref={linkRef} />

			<form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
				<Form data={data.data} register={register} control={control} setValue={setValue} errors={errors} />
			</form>
		</>
	)
}
