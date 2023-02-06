import { IDetail, IFlanges, IMaterialData, IPersonData } from './flange'

type TypeGasket = 'Soft' | 'Oval' | 'Metal'
export type TypeCap = 'flat' | 'sphere'

export interface IFormCapCalc {
	data: IMainData
	gasket: IGasket
	bolts: {
		markId: string
		title: string
		boltId: string
		diameter: string
		area: string
		count: string
		temp: string
		material: IMaterialData
	}
	embed: {
		markId: string
		thickness: string
		material: IMaterialData
	}
	flangeData: IFlanges
	capData: ICap
	isUseWasher: boolean
	washer: {
		first: {
			markId: string
			material: IMaterialData
		}
		second: {
			markId: string
			material: IMaterialData
		}
		thickness: string
	}

	isNeedFormulas: boolean

	personData: IPersonData
	detailData: IDetail
}

export interface IMainData {
	pressure: string
	axialForce: string
	temp: string
	isWork: boolean
	flanges: 'isolated' | 'nonIsolated' | 'manually'
	isEmbedded: boolean
	type: 'bolt' | 'pin'
	condition: 'uncontrollable' | 'controllable' | 'controllablePin'
	calculation: 'basis' | 'strength'
}

export interface IFormCapCalcOld {
	pressure: string
	axialForce: string
	temp: string
	isWork: boolean
	flanges: 'isolated' | 'nonIsolated' | 'manually'
	isEmbedded: boolean
	type: 'bolt' | 'pin'
	condition: 'uncontrollable' | 'controllable' | 'controllablePin'
	calculation: 'basis' | 'strength'
	gasket: IGasket
	bolts: {
		markId: string
		title: string
		boltId: string
		diameter: string
		area: string
		count: string
		temp: string
		material: IMaterialData
	}
	embed: {
		markId: string
		thickness: string
		material: IMaterialData
	}
	flangeData: IFlanges
	capData: ICap
	isUseWasher: boolean
	washer: {
		first: {
			markId: string
			material: IMaterialData
		}
		second: {
			markId: string
			material: IMaterialData
		}
		thickness: string
	}

	isNeedFormulas: boolean

	personData: IPersonData
	detailData: IDetail
}

export interface IGasket {
	gasketId: string
	envId: string
	thickness: string
	d_out: string
	d_in: string
	data: {
		title: string
		type: TypeGasket
		qo: string
		m: string
		compression: string
		epsilon: string
		permissiblePres: string
	}
}

export interface ICap {
	type: TypeCap
	h: string
	radius: string
	delta: string
	markId: string
	material: IMaterialData
}
