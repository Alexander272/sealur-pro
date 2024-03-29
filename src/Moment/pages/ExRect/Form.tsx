import { AxiosError } from 'axios'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MomentUrl } from '../../../components/routes'
import { Loader } from '../../../components/UI/Loader/Loader'
import { Header } from '../../components/Header/HeaderNew'
import CalcService from '../../service/calc'
import { IFormExRect } from '../../types/exRect'
import { IResExRect } from '../../types/res_exRect'
import { Form } from './Form/Form'
import classes from '../styles/page.module.scss'

const initFormValue = {
	type: 'pin' as 'pin',
	condition: 'controllable' as 'controllable',
	hasTestPressure: false,
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
	} = useForm<IFormExRect>({
		defaultValues: initFormValue,
	})

	const [isLoading, setLoading] = useState(false)

	const calculateHandler: SubmitHandler<IFormExRect> = async data => {
		setLoading(true)

		const person = data.personData?.hasPerson ? data.personData : null
		const detail = data.detailData?.hasDetail ? data.detailData : null
		data.personData = undefined
		data.detailData = undefined

		try {
			const res = await CalcService.Calculate<IFormExRect, IResExRect>(
				'/sealur-moment/calc/express-rectangle',
				data
			)
			if (!res.data) return

			localStorage.setItem('express-rectangle/result', JSON.stringify({ result: res.data, person, detail }))
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
			<Header title='Экспресс оценка момента затяжки' />
			{isLoading && <Loader background='fill' />}
			<Link to={MomentUrl + '/express-rectangle/result'} target='_blank' ref={linkRef} />
			<form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
				<Form register={register} control={control} setValue={setValue} errors={errors} />
			</form>
		</>
	)
}
