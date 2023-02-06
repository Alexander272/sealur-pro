import React, { FC } from 'react'
import { IConditionsForStrength } from '../../../../../types/res_flange'
import { IFlangeResult } from '../../../../../types/res_cap'
import { Container } from '../../../../../components/Container/Container'
import { formatNumber } from '../../../../../utils/format'
import classes from '../../../../styles/page.module.scss'

type Props = {
	data: IConditionsForStrength
	flange: IFlangeResult
}

export const SealingConclusions: FC<Props> = ({ data, flange }) => {
	const renderConclusions = (d: IConditionsForStrength) => {
		let cons = `полностью герметично так как, ϴ=${formatNumber(d.condTeta.x)} ≤ ${formatNumber(
			d.condTeta.y
		)}, т.е. выполняется условие герметичности фланцевого соединения`
		if (flange.type === 'free') {
			if (!(d.condTeta.x <= d.condTeta.y && d.condTetaK.x <= d.condTetaK.y)) {
				let thetaK = ` и ϴₖ=${formatNumber(d.condTetaK.x)} ${
					d.condTetaK.x <= d.condTetaK.y ? '≤' : '>'
				} ${formatNumber(d.condTetaK.y)}`

				cons = `не герметично так как, ϴ=${formatNumber(d.condTeta.x)} ${
					d.condTeta.x <= d.condTeta.y ? '≤' : '>'
				} ${formatNumber(
					d.condTeta.y
				)}${thetaK}, т.е. не выполняется условие герметичности фланцевого соединения`
			}
		} else {
			if (!(d.condTeta.x <= d.condTeta.y)) {
				cons = `не герметично так как, ϴ=${formatNumber(d.condTeta.x)} ${
					d.condTeta.x <= d.condTeta.y ? '≤' : '>'
				} ${formatNumber(d.condTeta.y)}, т.е. не выполняется условие герметичности фланцевого соединения`
			}
		}

		return (
			<>
				<p className={classes.text}>- для фланца</p>
				<p className={classes.text}>
					Фланцевое соединение <b>{cons}</b>
				</p>
			</>
		)
	}

	return <Container title='Выводы о герметичности фланцевого соединения'>{renderConclusions(data)}</Container>
}
