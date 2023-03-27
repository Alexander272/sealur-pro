import { IGasket as IGasketData } from './cap'
import { IEnv, IGasket, IMaterial } from './flange'
import { IDetail, IMaterialData, IPersonData } from './flange'

export interface IFormFloatingHead {
	pressure: string
	isWork: boolean
	hasThorn: boolean
	type: 'bolt' | 'pin'
	condition: 'uncontrollable' | 'controllable' | 'controllablePin'
	flangeData: IFlange
	capData: ICap
	gasket: IGasketData
	bolts: IBolt

	isNeedFormulas: boolean

	personData?: IPersonData
	detailData?: IDetail
}

export interface IFlange {
	dOut: string
	d: string
	d6: string
	t: string
	markId: string
	material?: IMaterialData
	width?: string
	dIn?: string
}

export interface ICap {
	h: string
	radius: string
	s: string
	t: string
	markId: string
	material?: IMaterialData
}

export interface IBolt {
	boltId: string
	count: string
	distance: string
	temp: string
	markId: string
	material?: IMaterialData
	title: string
	diameter: string
	area: string
}

export interface IFloatData {
	gaskets: IGasket[]
	boltMaterials: IMaterial[]
	flangeMaterials: IMaterial[]
	env: IEnv[]
}
