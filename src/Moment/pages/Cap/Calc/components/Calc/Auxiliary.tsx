import React, { FC } from 'react'
import { Container } from '../../../../../components/Container/Container'
import { IBoltResult, IDataResult, IGasketResult } from '../../../../../types/res_flange'
import { formatNumber } from '../../../../../utils/format'
import { ResLine } from '../../../../../components/ResLine/ResLine'
import { CapData } from './CapData'
import { IAuxiliary, IAuxiliaryFormulas, ICapResult, IFlangeResult } from '../../../../../types/res_cap'
import { FlangeData } from '../../../../Flange/Calc/components/Calc/FlangeData'

type Props = {
	data: IAuxiliary
	basis: IDataResult
	gasket: IGasketResult
	flange: IFlangeResult
	cap: ICapResult
	bolt: IBoltResult
	formulas?: IAuxiliaryFormulas
	typeGamma: 'Gamma-any' | 'Gamma-free'
}

const GammaLinks = {
	'Gamma-any': '/image/moment/formulas/cap/gamma.svg',
	'Gamma-free': '/image/moment/formulas/cap/gamma-free.svg',
}

export const Auxiliary: FC<Props> = ({ data, basis, gasket, flange, cap, bolt, formulas, typeGamma }) => {
	return (
		<Container title='Расчет вспомогательных величин'>
			<ResLine
				title='Эффективная ширина прокладки'
				imgUrl={
					gasket.type === 'Oval'
						? '/image/moment/formulas/flange/b0-oval.svg'
						: '/image/moment/formulas/flange/b0.svg'
				}
				formula={{
					designation: (
						<>
							b<sub>0</sub>
						</>
					),
					value: formulas?.b0,
				}}
				result={formatNumber(data.b0)}
				units='мм'
			/>
			<ResLine
				title='Расчетный диаметр прокладки'
				imgUrl={
					gasket.type === 'Oval'
						? '/image/moment/formulas/flange/Dcp-oval.svg'
						: '/image/moment/formulas/flange/Dcp.svg'
				}
				formula={{
					designation: (
						<>
							D<sub>сп</sub>
						</>
					),
					value: formulas?.Dcp,
				}}
				result={formatNumber(data.Dcp)}
				units='мм'
			/>
			<ResLine
				title='Податливость прокладки'
				imgUrl={'/image/moment/formulas/flange/yp.svg'}
				formula={{
					designation: (
						<>
							y<sub>п</sub>
						</>
					),
					value: formulas?.yp,
				}}
				result={formatNumber(data.yp)}
				units='мм/Н'
			/>
			<ResLine
				title='Площадь поперечного сечения болта/шпильки по внутреннему диаметру резьбы или наружному сечению наименьшего диаметра'
				imgText={
					<>
						f<sub>б</sub>
					</>
				}
				result={formatNumber(bolt.area)}
				units='мм&#178;'
			/>
			<ResLine
				title='Податливость болтов/шпилек'
				imgUrl={'/image/moment/formulas/flange/yb.svg'}
				formula={{
					designation: (
						<>
							y<sub>б</sub>
						</>
					),
					value: formulas?.yb,
				}}
				result={formatNumber(data.yb)}
				units='мм/Н'
			/>
			<ResLine
				title='где'
				imgUrl={
					basis.type === 'Шпилька'
						? '/image/moment/formulas/flange/Lb1.svg'
						: '/image/moment/formulas/flange/Lb2.svg'
				}
				formula={{
					designation: (
						<>
							L<sub>б</sub>
						</>
					),
					value: formulas && formulas?.Lb,
				}}
				result={formatNumber(data.Lb)}
				units='мм'
			/>
			<ResLine
				title='Суммарная площадь сечения болтов/шпилек по внутреннему диаметру резьбы или нагруженному сечению наименьшего диаметра'
				imgUrl='/image/moment/formulas/flange/a.svg'
				formula={{
					designation: (
						<>
							A<sub>в</sub>
						</>
					),
					value: formulas?.A,
				}}
				result={formatNumber(data.A)}
				units='мм&#178;'
			/>

			<FlangeData title='- для фланца' data={data.flange} formulas={formulas?.flange} type={flange.type} />
			<CapData data={data.cap} formulas={formulas?.cap} type={cap.type} />

			<ResLine
				title='Жесткость фланцевого соединения'
				imgUrl={GammaLinks[typeGamma]}
				formula={{
					designation: <>&gamma;</>,
					value: formulas?.gamma,
				}}
				result={formatNumber(data.gamma)}
				units='H/мм'
			/>

			<ResLine
				title='Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой'
				imgUrl='/image/moment/formulas/flange/alpha1.svg'
				formula={{
					designation: <>&alpha;</>,
					value: formulas?.alpha,
				}}
				result={formatNumber(data.alpha)}
			/>
		</Container>
	)
}
