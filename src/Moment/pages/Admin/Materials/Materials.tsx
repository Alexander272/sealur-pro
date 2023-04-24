import { useEffect, useState } from 'react'
import useSWR from 'swr'
import ReadService from '../../../service/read'
import { IFullMaterial } from '../../../types/materials'
import ServerError from '../../../../Error/ServerError'
import { Tabs } from '../../../../components/Tabs/Tabs'
import { List } from './List'
import { Tables } from './Tables/Tables'
import classes from './materials.module.scss'

const tabs = {
	bolt: {
		width: 72,
		position: 0,
	},
	flange: {
		width: 89,
		position: 73,
	},
}

export default function Materials() {
	const [type, setType] = useState<'bolt' | 'flange'>('bolt')
	const [material, setMaterial] = useState<IFullMaterial | null>(null)

	const { data: materials, error } = useSWR<{ data: IFullMaterial[] }>(
		`/sealur-moment/materials/empty?type=${type}`,
		ReadService.getData
	)

	useEffect(() => {
		if (materials) setMaterial(materials.data[0])
	}, [materials])

	const changeType = (type: string) => {
		setType(type as 'bolt')
	}

	const changeMaterialHandler = (material: IFullMaterial) => setMaterial(material)

	if (error) return <ServerError />
	if (!material) return <div className={classes.container}></div>

	return (
		<div className={classes.container}>
			<div className={classes['tabs-container']}>
				<Tabs initWidth={tabs[type].width} initPos={tabs[type].position} onClick={changeType}>
					<p
						className={[classes['tabs-item'], type === 'bolt' ? classes.active : ''].join(' ')}
						data-type={'bolt'}
					>
						Болты
					</p>
					<p
						className={[classes['tabs-item'], type === 'flange' ? classes.active : ''].join(' ')}
						data-type={'flange'}
					>
						Фланцы
					</p>
				</Tabs>
			</div>

			<div className={classes['base-container']}>
				<List materials={materials?.data} material={material} type={type} onClick={changeMaterialHandler} />
				<Tables material={material} />
			</div>
		</div>
	)
}
