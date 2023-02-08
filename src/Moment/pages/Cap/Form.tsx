import { useRef, useState } from 'react'
import useSWR from 'swr'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Loader } from '../../../components/UI/Loader/Loader'
import { MomentUrl } from '../../../components/routes'
import { Header } from '../../components/Header/HeaderNew'
import ServerError from '../../../Error/ServerError'
import ReadService from '../../service/read'
import CalcService from '../../service/calc'
import { IFormCapCalc } from '../../types/cap'
import { IResCap } from '../../types/res_cap'
import { IFlangeData } from '../../types/flange'
import { Form } from './Form/Form'
import classes from '../styles/page.module.scss'

const initFormValue = {
	data: {
		isWork: true,
		isEmbedded: false,
		flanges: 'nonIsolated' as 'nonIsolated',
		type: 'pin' as 'pin',
		condition: 'controllable' as 'controllable',
		calculation: 'basis' as 'basis',
	},
	isNeedFormulas: true,
	isUseWasher: false,
	capData: {
		type: 'flat' as 'flat',
	},
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
	} = useForm<IFormCapCalc>({
		defaultValues: initFormValue,
	})

	if (!data)
		return (
			<div className={classes.wrapper}>
				<Loader isFull />
			</div>
		)

	if (error) return <ServerError />

	const calculateHandler: SubmitHandler<IFormCapCalc> = async data => {
		setLoading(true)
		const person = data.personData?.hasPerson ? data.personData : null
		const detail = data.detailData?.hasDetail ? data.detailData : null
		data.personData = undefined
		data.detailData = undefined
		try {
			const res = await CalcService.Calculate<IFormCapCalc, IResCap>('/sealur-moment/calc/cap', data)
			if (!res.data) return

			localStorage.setItem('cap/result', JSON.stringify({ result: res.data, person, detail }))
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
			<Header title='Расчет соединения фланец-крышка' />
			{isLoading && <Loader background='fill' />}
			<Link to={MomentUrl + '/cap/result'} ref={linkRef} target='_blank' />

			<form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
				<Form data={data.data} register={register} control={control} setValue={setValue} errors={errors} />
			</form>
		</>
	)
}
