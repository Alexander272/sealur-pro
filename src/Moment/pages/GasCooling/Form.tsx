import { AxiosError } from 'axios'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MomentUrl } from '../../../components/routes'
import { Loader } from '../../../components/UI/Loader/Loader'
import { Header } from '../../components/Header/HeaderNew'
import CalcService from '../../service/calc'
import { IGasCoolingForm } from '../../types/gasCooling'
import { IGasCooling } from '../../types/res_gasCooling'
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
	const [isLoading, setLoading] = useState(false)

	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IGasCoolingForm>({
		defaultValues: initFormValue,
	})

	const calculateHandler: SubmitHandler<IGasCoolingForm> = async data => {
		setLoading(true)
		const person = data.personData?.hasPerson ? data.personData : null
		data.personData = undefined
		const detail = data.detailData?.hasDetail ? data.detailData : null
		data.detailData = undefined

		try {
			const res = await CalcService.Calculate<IGasCoolingForm, IGasCooling>(
				'/sealur-moment/calc/gas-cooling',
				data
			)
			if (!res.data) return

			localStorage.setItem('gas-cooling/result', JSON.stringify({ result: res.data, person, detail }))
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

	/*
    
    Коэффициент оребрения зависит от Модификация аппарата
    Материальное исполнение секции зависит от Модификация аппарата (почему-то вызывается при изменении Условное давление)
    Длина оребренных труб в секции зависит от Модификация аппарата
    Число ходов по трубному пространству зависит от Модификация аппарата и Число рядов труб в секции

    Тип прокладки зависит от Коэффициент оребрения и Условное давление и Число рядов труб в секции и Число ходов по трубному пространству
    
    */

	return (
		<>
			<Header title='Расчет прокладки АВО (выбор по типоразмеру аппарата)' />
			{isLoading && <Loader background='fill' />}
			<Link to={MomentUrl + '/gas-cooling/result'} ref={linkRef} target='_blank' />

			<form className={classes.form} onSubmit={handleSubmit(calculateHandler)}>
				<Form register={register} control={control} setValue={setValue} errors={errors} />
			</form>
		</>
	)
}
