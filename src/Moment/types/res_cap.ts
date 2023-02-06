import { TypeCap } from './cap'
import {
	IBasisFormulas,
	IBoltResult,
	IDataResult,
	IEmbedResult,
	IGasketResult,
	IWasherResult,
	IDeformation,
	IBoltStrength,
	IMoment,
	ITightness,
	IStaticResistance,
	IConditionsForStrength,
	ITightnessLoad,
	IAux_Flange,
	ITightnessFormulas,
	IBoltStrengthFormulas,
	IMomentFormulas,
	IStaticResistanceFormulas,
	IConditionsForStrengthFormulas,
	ITightnessLoadFormulas,
	IDeformationFormulas,
	IForcesInBoltsFormulas,
	IAux_FlangeFormulas,
} from './res_flange'

export interface IResCap {
	data: IDataResult
	flange: IFlangeResult
	cap: ICapResult
	bolt: IBoltResult
	gasket: IGasketResult
	embed: IEmbedResult
	washers: IWasherResult[]
	calc: ICalculate
	formulas?: IFormulas
}

export interface IFlangeResult {
	// Наружный диаметр фланца
	dOut: number
	// Внутренний диаметр фланца
	d: number
	// Толщина тарелки фланца
	h: number
	// Расстояние от наружной поверхности обечайки до внутренней окружности контакта бурта
	h0: number
	// Толщина втулки приварного встык фланца в месте приварки к обечайке (трубе)
	s0: number
	// Толщина втулки приварного встык фланца в месте присоединения к тарелке
	s1: number
	// Длина конической втулки приварного встык фланца
	l: number
	// Диаметр окружности расположения болтов (шпилек)
	d6: number
	// Прибавка на коррозию
	c: number
	// Расчетная температура фланца
	t: number
	alpha: number
	epsilonAt20: number
	epsilon: number
	sigmaAt20: number
	sigma: number
	// Допускаемое значение общих мембранных и изгибных напряжений во фланце в рабочих условиях
	sigmaM: number
	// Допускаемое значение общих мембранных и изгибных напряжений во фланце при затяжке
	sigmaMAt20: number
	// Допускаемое значение суммарных общих и местных условных упругих мембранных и изгибных напряжений во фланце в рабочих условиях
	sigmaR: number
	// Допускаемое значение суммарных общих и местных условных упругих мембранных и изгибных напряжений во фланце при затяжке
	sigmaRAt20: number
	material: string
	ring?: IFlangeRing
	// Тип фланца
	type: string
}

interface IFlangeRing {
	// Расчетная температура свободного кольца
	t: number
	alpha: number
	epsilonAt20: number
	epsilon: number
	sigmaAt20: number
	sigma: number
	material: string
	// Внутренний диаметр кольца свободного фланца
	dk: number
	// Наружный диаметр кольца свободного фланца
	dnk: number
	// Наружный диаметр контакта бурта и кольца свободного фланца
	ds: number
	// Толщина кольца свободного фланца
	hk: number
}

export interface ICapResult {
	h: number
	radius: number
	delta: number
	t: number
	alpha: number
	epsilonAt20: number
	epsilon: number
	material: string
	y: number
	k: number
	x: number
	lambda: number
	omega: number
	type: TypeCap
}

export interface ICalculate {
	basis: IBasis
	strength: IStrength
}

export interface IBasis {
	deformation: IDeformation
	forcesInBolts: IForcesInBolts
	boltStrength: IBoltStrength
	moment: IMoment
}

export interface IForcesInBolts {
	// Суммарная площадь сечения болтов/шпилек
	A: number
	// Равнодействующая нагрузка от давления
	Qd: number
	// Приведенная нагрузка, вызванная воздействием внешней силы и изгибающего момента
	Qfm: number
	// Нагрузка вызванная стесненностью температурных деформаций
	Qt: number
	// Расчетная нагрузка на болты/шпильки фланцевых соединений
	Pb: number
	// Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой
	alpha: number
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления
	Pb1: number
	// Минимальное начальное натяжение болтов (шпилек)
	minB: number
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки
	Pb2: number
	// Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях
	Pbr: number
}

export interface IStrength {
	auxiliary: IAuxiliary
	tightness: ITightness
	boltStrength1: IBoltStrength
	moment1: IMoment
	staticResistance1: IStaticResistance
	conditionsForStrength1: IConditionsForStrength
	tightnessLoad: ITightnessLoad
	boltStrength2: IBoltStrength
	moment2: IMoment
	staticResistance2: IStaticResistance
	conditionsForStrength2: IConditionsForStrength
	deformation: IDeformation
	forcesInBolts: IForcesInBolts
	finalMoment: IMoment
}

export interface IAuxiliary {
	// Эффективная ширина прокладки
	b0: number
	// Расчетный диаметр прокладки
	Dcp: number
	// Податливость прокладки
	yp: number
	// Податливость болтов/шпилек
	yb: number
	Lb: number
	// Суммарная площадь сечения болтов/шпилек
	A: number
	// для фланца
	flange: IAux_Flange
	// для крышки
	cap: IAux_Cap
	// Жесткость фланцевого соединения
	gamma: number
	// Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой
	alpha: number
}

export interface IAux_Cap {
	y: number
	k: number
	x: number
	lambda: number
	omega: number
}

export interface IFormulas {
	basis: IBasisFormulas
	strength: IStrengthFormulas
}

export interface IStrengthFormulas {
	auxiliary: IAuxiliaryFormulas
	tightness: ITightnessFormulas
	boltStrength1: IBoltStrengthFormulas
	moment1: IMomentFormulas
	staticResistance1: IStaticResistanceFormulas
	conditionsForStrength1: IConditionsForStrengthFormulas
	tightnessLoad: ITightnessLoadFormulas
	boltStrength2: IBoltStrengthFormulas
	moment2: IMomentFormulas
	staticResistance2: IStaticResistanceFormulas
	conditionsForStrength2: IConditionsForStrengthFormulas
	deformation: IDeformationFormulas
	forcesInBolts: IForcesInBoltsFormulas
	finalMoment: IMomentFormulas
}

export interface IAuxiliaryFormulas {
	// Эффективная ширина прокладки
	b0: string
	// Расчетный диаметр прокладки
	Dcp: string
	// Податливость прокладки
	yp: string
	// Податливость болтов/шпилек
	yb: string
	Lb: string
	// Суммарная площадь сечения болтов/шпилек
	A: string
	// для фланца
	flange: IAux_FlangeFormulas
	// для крышки
	cap: IAux_CapFormulas
	// Жесткость фланцевого соединения
	gamma: string
	// Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой
	alpha: string
}

export interface IAux_CapFormulas {
	x: string
	y: string
	k: string
	lambda: string
	omega: string
}
