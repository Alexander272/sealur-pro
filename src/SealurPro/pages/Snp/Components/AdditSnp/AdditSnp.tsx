import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Dispatch, ProState } from '../../../../store/store'
import { Construction } from './Components/Construction/Construction'
import { Fillers } from './Components/Fillers/Fillers'
import { Material } from './Components/Materials/Materials'
import { FileInput } from '../../../../../components/UI/FileInput/FileInput'
import { FileDownload } from '../../../../../components/UI/FileInput/FileDownload'
import { IDrawing } from '../../../../types/drawing'
import FileService from '../../../../service/file'
import classes from '../../../style/pages.module.scss'

type Props = {}

export const AdditSnp: FC<Props> = () => {
	const isJumper = useSelector((state: ProState) => state.snp.isJumper)
	const jumper = useSelector((state: ProState) => state.snp.jumper)
	const isHole = useSelector((state: ProState) => state.snp.isHole)

	const drawing = useSelector((state: ProState) => state.snp.drawing)
	const orderId = useSelector((state: ProState) => state.list.orderId)

	const { snp, list } = useDispatch<Dispatch>()

	const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (!files) return

		const formData = new FormData()
		formData.append('drawing', files[0])
		formData.append('group', orderId)

		try {
			const res: IDrawing = await FileService.create(formData, '/files/drawings/pro/')
			snp.setDrawing(res)
			if (orderId === '') {
				list.setOrderId(res.group)
			}
		} catch (error) {
			console.log(error)
			toast.error('Не удалось загрузить файл')
		}
	}

	const deleteFile = async () => {
		try {
			await FileService.delete(`/files/drawings/pro/${drawing?.group}/${drawing?.id}/${drawing?.origName}`)
			snp.setDrawing(null)
		} catch (error) {
			console.log(error)
			toast.error('Не удалось удалить файл')
		}
	}

	return (
		<div className={classes.sideContainer}>
			<Fillers />
			<Material />
			<Construction />

			{drawing ? (
				<FileDownload text={drawing.origName} name='drawing' link={drawing.link} onDelete={deleteFile} />
			) : (
				<FileInput name='drawing' id='file' label={'Прикрепить чертеж'} onChange={uploadFile} />
			)}

			<div className={classes.message}>
				{!drawing && ((isJumper && !['A', 'M', 'J'].includes(jumper)) || isHole) ? (
					<p className={classes.warn}>К заявке приложите файл с чертежом.</p>
				) : null}
			</div>
		</div>
	)
}
