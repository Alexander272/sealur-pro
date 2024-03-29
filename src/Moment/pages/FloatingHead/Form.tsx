import { AxiosError } from 'axios'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MomentUrl } from '../../../components/routes'
import { Loader } from '../../../components/UI/Loader/Loader'
import { Header } from '../../components/Header/HeaderNew'
import CalcService from '../../service/calc'
import { IFormFloatingHead } from '../../types/floatingHead'
import { IResFloat } from '../../types/res_float'
import { Form } from './Form/Form'
import classes from '../styles/page.module.scss'

const initFormValue = {
	isWork: true,
	hasThorn: false,
	type: 'pin' as 'pin',
	condition: 'controllable' as 'controllable',
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
	} = useForm<IFormFloatingHead>({
		defaultValues: initFormValue,
	})

	const [isLoading, setLoading] = useState(false)

	const calculateHandler: SubmitHandler<IFormFloatingHead> = async data => {
		setLoading(true)

		const person = data.personData?.hasPerson ? data.personData : null
		const detail = data.detailData?.hasDetail ? data.detailData : null
		data.personData = undefined
		data.detailData = undefined

		try {
			const res = await CalcService.Calculate<IFormFloatingHead, IResFloat>('/sealur-moment/calc/float', data)
			if (!res.data) return

			localStorage.setItem('floating-head/result', JSON.stringify({ result: res.data, person, detail }))
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
			<Header title='Расчет плавающей головки теплообменного аппарата' />
			{isLoading && <Loader background='fill' />}
			<Link to={MomentUrl + '/floating-head/result'} ref={linkRef} target='_blank' />

			<form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
				<Form
					// data={data.data}
					register={register}
					control={control}
					setValue={setValue}
					errors={errors}
				/>
			</form>
		</>
	)
}
