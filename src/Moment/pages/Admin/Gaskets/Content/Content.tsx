import React, { FC } from 'react'
import useSWR from 'swr'
import { Loader } from '../../../../../components/UI/Loader/Loader'
import ReadService from '../../../../service/read'
import { IGasket } from '../../../../types/flange'
import { FullData } from '../../../../types/gasket'
import { GasketData } from './GasketData'
import { EnvTable } from './EnvTable'
import classes from '../gasket.module.scss'

type Props = {
	gasket: IGasket | null
}

export const Content: FC<Props> = ({ gasket }) => {
	const { data } = useSWR<{ data: FullData }>(
		gasket?.id ? `/sealur-moment/gasket/full-data?gasketId=${gasket?.id}` : null,
		ReadService.getData
	)

	if (!gasket)
		return (
			<div className={classes.content}>
				<Loader />
			</div>
		)

	return (
		<div className={classes.content}>
			<p className={classes['content-title']}>{gasket?.title}</p>
			<div className={classes['content-main']}>
				<GasketData data={data?.data.gasketData} types={data?.data.gasketType} gasket={gasket} />
				<EnvTable envData={data?.data.envData} types={data?.data.envType} gasket={gasket} />
			</div>
		</div>
	)
}
