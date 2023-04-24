import {
	IDeviceMod,
	IFinningFactor,
	INameGasket,
	INumberOfMoves,
	IPressure,
	ISectionExecution,
	ITubeCount,
	ITubeLength,
} from './device'
import { IBoltData } from './exCircle'
import { IDetail, IPersonData } from './flange'

export interface IGasCoolingForm {
	devId: string
	device: IDeviceMod
	factorId: string
	factor: IFinningFactor
	pressureId: string
	pressure: IPressure
	sectionId: string
	section: ISectionExecution
	tubeCountId: string
	tubeCount: ITubeCount
	numberOfMovesId: string
	numberOfMoves: INumberOfMoves
	tubeLengthId: string
	tubeLength: ITubeLength
	hasTestPressure: boolean
	testPressure: string
	hasFriction: boolean
	friction: string
	type: 'bolt' | 'pin'
	condition: 'uncontrollable' | 'controllable' | 'controllablePin'
	bolts: IBoltData
	gasket: IGasketFullData

	isNeedFormulas: boolean

	personData?: IPersonData
	detailData?: IDetail
}

export interface IGasketFullData {
	gasketId: string
	envId: string
	thickness: string
	// bp - Ширина прокладки
	width: string
	// L2 - Размер прокладки в продольном направлении
	sizeLong: string
	// B2 - Размер прокладки в поперечном направление
	sizeTrans: string
	nameId: string
	name: INameGasket
}
