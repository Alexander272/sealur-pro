import { ICondition } from './res_devCooling'

export interface IResFlange {
	isSameFlange: boolean
	data: IDataResult
	flanges: IFlangeResult[]
	bolt: IBoltResult
	gasket: IGasketResult
	embed: IEmbedResult
	washers: IWasherResult[]
	calc: ICalculate
	formulas?: IFormulas
}

export interface IDataResult {
	pressure: number
	axialForce: number
	bendingMoment: number
	temp: number
	work: string
	flanges: string
	sameFlange: string
	embedded: string
	type: string
	condition: string
}

interface IFlangeRing {
	// Расчетная температура свободного кольца
	tk: number
	alphaK: number
	epsilonKAt20: number
	epsilonK: number
	sigmaKAt20: number
	sigmaK: number
	Material: string
}

export interface IFlangeResult {
	// Наружный диаметр фланца
	dOut: number
	// Внутренний диаметр фланца
	d: number
	// Внутренний диаметр кольца свободного фланца
	dk: number
	// Наружный диаметр кольца свободного фланца
	dnk: number
	// Наружный диаметр контакта бурта и кольца свободного фланца
	ds: number
	// Толщина тарелки фланца
	h: number
	// Расстояние от наружной поверхности обечайки до внутренней окружности контакта бурта
	h0: number
	// Толщина кольца свободного фланца
	hk: number
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
	tf: number
	alphaF: number
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

export interface IBoltResult {
	diameter: number
	area: number
	count: number
	length: number
	temp: number
	alpha: number
	epsilonAt20: number
	epsilon: number
	sigmaAt20: number
	sigma: number
	material: string
}

export interface IGasketResult {
	gasket: string
	env: string
	type: 'Soft' | 'Oval' | 'Metal'
	thickness: number
	d_out: number
	width: number
	m: number
	pres: number
	compression: number
	epsilon: number
	permissiblePres: number
}

export interface IEmbedResult {
	material: string
	thickness: number
	alpfa: number
	temp: number
}

export interface IWasherResult {
	material: string
	thickness: number
	alpfa: number
	temp: number
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

export interface IDeformation {
	// Эффективная ширина прокладки
	b0: number
	// Расчетный диаметр прокладки
	Dcp: number
	// Усилие необходимое для смятия прокладки при затяжке
	Po: number
	// Усилие на прокладке в рабочих условиях необходимое для обеспечения герметичности фланцевого соединения
	Rp: number
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
	// Коэффициент жесткости фланцевого соединения нагруженного внешним изгибающим моментом
	alphaM: number
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления
	Pb1: number
	// Минимальное начальное натяжение болтов (шпилек)
	minB: number
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки
	Pb2: number
	// Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях
	Pbr: number
}

export interface IBoltStrength {
	// Расчетное напряжение в болтах/шпильках - при затяжке
	sigmaB1: number
	// Расчетное напряжение в болтах/шпильках - в рабочих условиях
	sigmaB2: number
	// Допускаемое напряжение для болтов шпилек - при затяжке
	dSigmaM: number
	// Допускаемое напряжение для болтов шпилек в рабочих условиях и при расчете на условия испытания
	dSigmaR: number
	// Условие прочности прокладки (проверяется для мягких прокладок)
	q: number
	// Условия прочности болтов шпилек - при затяжке
	vSigmaB1: boolean
	// Условия прочности болтов шпилек - в рабочих условиях
	vSigmaB2: boolean
}

export interface IMoment {
	// Крутящий момент при затяжке болтов/шпилек
	Mkp: number
	// Крутящий момент при затяжке болтов/шпилек со смазкой
	Mkp1: number
	// Момент затяжки при применении уплотнения на старых (изношенных) фланцах, имеющих перекосы
	Mrek: number
	// Напряжение на прокладке
	Qrek: number
	// Максимальный крутящий момент при затяжке болтов/шпилек
	Mmax: number
	// Максимальное напряжение на прокладке
	Qmax: number
}

export interface IStrength {
	auxiliary: IAuxiliary
	tightness: ITightness
	boltStrength1: IBoltStrength
	moment1: IMoment
	staticResistance1: IStaticResistance[]
	conditionsForStrength1: IConditionsForStrength[]
	tightnessLoad: ITightnessLoad
	boltStrength2: IBoltStrength
	moment2: IMoment
	staticResistance2: IStaticResistance[]
	conditionsForStrength2: IConditionsForStrength[]
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
	// для первого фланца
	flange1: IAux_Flange
	// для второго фланца
	flange2: IAux_Flange
	// Жесткость фланцевого соединения
	gamma: number
	// Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой
	alpha: number
	// Коэффициент жесткости фланцевого соединения нагруженного внешним изгибающим моментом
	alphaM: number
}

export interface IAux_Flange {
	// Плечи действия усилий в болтах/шпильках
	a: number
	// Плечи действия усилий в болтах/шпильках
	b: number
	// Плечо усилия от действия давления на фланец
	e: number
	// Эквивалентная толщина втулки
	Se: number
	// Коэффициент зависящий от соотношения размеров конической втулки фланца
	xi: number
	x: number
	// Параметр длины обечайки
	l0: number
	lymda: number
	// Угловая податливость фланца при затяжке
	yf: number
	psik: number
	// Угловая податливость кольца свободного фланца при затяжке
	yk: number
	// Угловая податливость фланца нагруженного внешним изгибающим моментом для фланцев приварных встык и плоских
	yfn: number
	// Угловая податливость фланца нагруженного внешним изгибающим моментом для свободного фланца
	yfc: number
	// Отношение наружного диаметра тарелки фланца к внутреннему диаметру
	k: number
	beta: number
	// Расчетные коэффициенты
	betaT: number
	betaU: number
	betaY: number
	betaZ: number
	betaF: number
	betaV: number
	f: number
}

export interface ITightness {
	// Усилие необходимое для смятия прокладки при затяжке
	Po: number
	// Усилие на прокладке в рабочих условиях необходимое для обеспечения герметичности фланцевого соединения
	Rp: number
	// Равнодействующая нагрузка от давления
	Qd: number
	// Приведенная нагрузка, вызванная воздействием внешней силы и изгибающего момента
	Qfm: number
	// Расчетная нагрузка на болты/шпильки фланцевых соединений
	Pb: number
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления
	Pb1: number
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки
	Pb2: number
	// Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях
	Pbr: number
}

export interface IStaticResistance {
	// Коэффициент учитывающий изгиб тарелки фланца между болтами шпильками
	Cf: number
	// Приведенный диаметр
	Dzv: number
	// Расчетный изгибающий момент действующий на фланец при затяжке - для приварного встык фланца плоского и бурта свободного фланца
	MM: number
	// Расчетный изгибающий момент действующий на фланец при затяжке - для кольца свободного фланца
	MMk: number
	// Расчетный изгибающий момент действующий на фланец в рабочих условиях - для кольца свободного фланца
	Mpk: number
	// Расчетный изгибающий момент действующий на фланец в рабочих условиях - для приварного встык фланца плоского и бурта свободного фланца
	Mp: number
	// Меридиональное изгибное напряжение - для приварных встык фланцев с конической втулкой в сечении S1
	sigmaM1: number
	// Меридиональное изгибное напряжение - для приварных встык фланцев с конической втулкой в сечении S0
	sigmaM0: number
	// Окружное напряжение в тарелке
	sigmaT: number
	// Радиальное напряжение в тарелке
	sigmaR: number
	// Напряжения в тарелке - окружное напряжения
	sigmaTp: number
	// Напряжения в тарелке - радиальные напряжения
	sigmaRp: number
	// Окружное напряжение в кольце свободного фланца в условиях затяжки
	sigmaK: number
	// Меридиональные изгибные напряжения во втулке - для приварных встык фланцев с конической втулкой в сечении S1
	sigmaP1: number
	// Меридиональные изгибные напряжения во втулке - для приварных встык фланцев с конической втулкой в сечении S0
	sigmaP0: number
	// Меридиональные мембранные напряжения во втулке - для приварных встык фланцев с конической втулкой в сечении S1
	sigmaMp: number
	// Меридиональные мембранные напряжения во втулке - для приварных встык фланцев с конической втулкой в сечении S0
	sigmaMp0: number
	// Окружные мембранные напряжения от действия давления во втулке
	sigmaMop: number
	// Окружное напряжение в кольце свободного фланца в рабочих условиях
	sigmaKp: number
	// одинаковые сигмы
	isEqualSigma: boolean
}

export interface IConditionsForStrength {
	// Для приварных встык фланцев с конической втулкой в сечении S1 - при затяжке
	Max1: ICondition
	// Для приварных встык фланцев с конической втулкой в сечении S1 - в рабочих условиях
	Max2: ICondition
	// Для приварных встык фланцев с конической втулкой в сечении S0 - при затяжке
	Max3: ICondition
	// Для приварных встык фланцев с конической втулкой в сечении S0 - в рабочих условиях
	Max4: ICondition
	// Для приварных встык фланцев с прямой втулкой - при затяжке
	Max5: ICondition
	// Для приварных встык фланцев с прямой втулкой - в рабочих условиях
	Max6: ICondition
	// Для фланцев всех типов в сечении S0 должно выполняться условие
	Max7: ICondition
	// Для тарелок приварных встык фланцев, плоских фланцев - при затяжке
	Max8: ICondition
	// Для тарелок приварных встык фланцев, плоских фланцев - в рабочих условиях
	Max9: ICondition
	// Для колец свободных фланцев - при затяжке
	Max10: ICondition
	// Для колец свободных фланцев - в рабочих условиях
	Max11: ICondition
	// Угол поворота приварного встык фланца и бурта свободного фланца в рабочих условия
	teta: number
	// Условие
	condTeta: ICondition
	// Условие
	condTetaK: ICondition
	// Угол поворота кольца свободного фланца в рабочих условиях
	tetaK: number
}

export interface ITightnessLoad {
	// Нагрузка вызванная стесненностью температурных деформаций
	Qt: number
	// Расчетная нагрузка на болты/шпильки фланцевых соединений
	Pb: number
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления
	Pb1: number
	// Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях
	Pbr: number
}

export interface IFormulas {
	basis: IBasisFormulas
	strength: IStrengthFormulas
}

export interface IBasisFormulas {
	deformation: IDeformationFormulas
	forcesInBolts: IForcesInBoltsFormulas
	boltStrength: IBoltStrengthFormulas
	moment: IMomentFormulas
}

export interface IDeformationFormulas {
	// Эффективная ширина прокладки
	b0: string
	// Расчетный диаметр прокладки
	Dcp: string
	// Усилие необходимое для смятия прокладки при затяжке
	Po: string
	// Усилие на прокладке в рабочих условиях необходимое для обеспечения герметичности фланцевого соединения
	Rp: string
}

// Усилия в болтах (шпильках) фланцевого соединения при затяжке и в рабочих условиях
export interface IForcesInBoltsFormulas {
	// Суммарная площадь сечения болтов/шпилек
	A: string
	// Равнодействующая нагрузка от давления
	Qd: string
	// Приведенная нагрузка, вызванная воздействием внешней силы и изгибающего момента
	Qfm: string
	// Нагрузка вызванная стесненностью температурных деформаций
	Qt: string
	// Расчетная нагрузка на болты/шпильки фланцевых соединений
	Pb: string
	// Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой
	alpha: string
	// Коэффициент жесткости фланцевого соединения нагруженного внешним изгибающим моментом
	alphaM: string
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления
	Pb1: string
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки
	Pb2: string
	// Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях
	Pbr: string
}

// Проверка прочности болтов (шпилек) и прокладки
export interface IBoltStrengthFormulas {
	// Расчетное напряжение в болтах/шпильках - при затяжке
	sigmaB1: string
	// Расчетное напряжение в болтах/шпильках - в рабочих условиях
	sigmaB2: string
	// Допускаемое напряжение для болтов шпилек - при затяжке
	dSigmaM: string
	// Допускаемое напряжение для болтов шпилек в рабочих условиях и при расчете на условия испытания
	dSigmaR: string
	// Условие прочности прокладки (проверяется для мягких прокладок)
	q: string
}

// Расчет момента затяжки
export interface IMomentFormulas {
	// Крутящий момент при затяжке болтов/шпилек
	Mkp: string
	// Крутящий момент при затяжке болтов/шпилек со смазкой
	Mkp1: string
	// Момент затяжки при применении уплотнения на старых (изношенных) фланцах, имеющих перекосы
	Mrek: string
	// Напряжение на прокладке
	Qrek: string
	// Максимальный крутящий момент при затяжке болтов/шпилек
	Mmax: string
	// Максимальное напряжение на прокладке
	Qmax: string
}

export interface IStrengthFormulas {
	auxiliary: IAuxiliaryFormulas
	tightness: ITightnessFormulas
	boltStrength1: IBoltStrengthFormulas
	moment1: IMomentFormulas
	staticResistance1: IStaticResistanceFormulas[]
	conditionsForStrength1: IConditionsForStrengthFormulas[]
	tightnessLoad: ITightnessLoadFormulas
	boltStrength2: IBoltStrengthFormulas
	moment2: IMomentFormulas
	staticResistance2: IStaticResistanceFormulas[]
	conditionsForStrength2: IConditionsForStrengthFormulas[]
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
	// для первого фланца
	flange1: IAux_FlangeFormulas
	// для второго фланца
	flange2: IAux_FlangeFormulas
	// Жесткость фланцевого соединения
	gamma: string
	// Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой
	alpha: string
	// Коэффициент жесткости фланцевого соединения нагруженного внешним изгибающим моментом
	alphaM: string
}

export interface IAux_FlangeFormulas {
	// Плечи действия усилий в болтах/шпильках
	a: string
	// Плечи действия усилий в болтах/шпильках
	b: string
	// Плечо усилия от действия давления на фланец
	e: string
	// Эквивалентная толщина втулки
	Se: string
	// Коэффициент зависящий от соотношения размеров конической втулки фланца
	xi: string
	x: string
	// Параметр длины обечайки
	l0: string
	lymda: string
	// Угловая податливость фланца при затяжке
	yf: string
	psik: string
	// Угловая податливость кольца свободного фланца при затяжке
	yk: string
	// Угловая податливость фланца нагруженного внешним изгибающим моментом для фланцев приварных встык и плоских
	yfn: string
	// Угловая податливость фланца нагруженного внешним изгибающим моментом для свободного фланца
	yfc: string
	// Отношение наружного диаметра тарелки фланца к внутреннему диаметру
	k: string
	beta: string
}

// Расчет фланцевого соединения на прочность и герметичность без учета нагрузки вызванной стесненностью температурных деформаций
export interface ITightnessFormulas {
	// Усилие необходимое для смятия прокладки при затяжке
	Po: string
	// Усилие на прокладке в рабочих условиях необходимое для обеспечения герметичности фланцевого соединения
	Rp: string
	// Равнодействующая нагрузка от давления
	Qd: string
	// Приведенная нагрузка, вызванная воздействием внешней силы и изгибающего момента
	Qfm: string
	// Расчетная нагрузка на болты/шпильки фланцевых соединений
	Pb: string
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления
	Pb1: string
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки
	Pb2: string
	// Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях
	Pbr: string
}

// Расчет фланца на статическую прочность
export interface IStaticResistanceFormulas {
	// Коэффициент учитывающий изгиб тарелки фланца между болтами шпильками
	Cf: string
	// Приведенный диаметр
	Dzv: string
	// Расчетный изгибающий момент действующий на фланец при затяжке - для приварного встык фланца плоского и бурта свободного фланца
	MM: string
	// Расчетный изгибающий момент действующий на фланец при затяжке - для кольца свободного фланца
	MMk: string
	// Расчетный изгибающий момент действующий на фланец в рабочих условиях - для кольца свободного фланца
	Mpk: string
	// Расчетный изгибающий момент действующий на фланец в рабочих условиях - для приварного встык фланца плоского и бурта свободного фланца
	Mp: string
	// Меридиональное изгибное напряжение - для приварных встык фланцев с конической втулкой в сечении S1
	sigmaM1: string
	// Меридиональное изгибное напряжение - для приварных встык фланцев с конической втулкой в сечении S0
	sigmaM0: string
	// Окружное напряжение в тарелке
	sigmaT: string
	// Радиальное напряжение в тарелке
	sigmaR: string
	// Напряжения в тарелке - окружное напряжения
	sigmaTp: string
	// Напряжения в тарелке - радиальные напряжения
	sigmaRp: string
	// Окружное напряжение в кольце свободного фланца в условиях затяжки
	sigmaK: string
	// Меридиональные изгибные напряжения во втулке - для приварных встык фланцев с конической втулкой в сечении S1
	sigmaP1: string
	// Меридиональные изгибные напряжения во втулке - для приварных встык фланцев с конической втулкой в сечении S0
	sigmaP0: string
	// Меридиональные мембранные напряжения во втулке - для приварных встык фланцев с конической втулкой в сечении S1
	sigmaMp: string
	// Меридиональные мембранные напряжения во втулке - для приварных встык фланцев с конической втулкой в сечении S0
	sigmaMp0: string
	// Окружные мембранные напряжения от действия давления во втулке
	sigmaMop: string
	// Окружное напряжение в кольце свободного фланца в рабочих условиях
	sigmaKp: string
}

export interface IConditionFormulas {
	x: string
	y: string
}

// Условия статической прочности фланцев
export interface IConditionsForStrengthFormulas {
	// Для приварных встык фланцев с конической втулкой в сечении S1 - при затяжке
	Max1: IConditionFormulas
	// Для приварных встык фланцев с конической втулкой в сечении S1 - в рабочих условиях
	Max2: IConditionFormulas
	// Для приварных встык фланцев с конической втулкой в сечении S0 - при затяжке
	Max3: IConditionFormulas
	// Для приварных встык фланцев с конической втулкой в сечении S0 - в рабочих условиях
	Max4: IConditionFormulas
	// Для приварных встык фланцев с прямой втулкой - при затяжке
	Max5: IConditionFormulas
	// Для приварных встык фланцев с прямой втулкой - в рабочих условиях
	Max6: IConditionFormulas
	// Для фланцев всех типов в сечении S0 должно выполняться условие
	Max7: IConditionFormulas
	// Для тарелок приварных встык фланцев, плоских фланцев - при затяжке
	Max8: IConditionFormulas
	// Для тарелок приварных встык фланцев, плоских фланцев - в рабочих условиях
	Max9: IConditionFormulas
	// Для колец свободных фланцев - при затяжке
	Max10: IConditionFormulas
	// Для колец свободных фланцев - в рабочих условиях
	Max11: IConditionFormulas
	// Угол поворота приварного встык фланца и бурта свободного фланца в рабочих условия
	teta: string
	// Условие
	condTeta: IConditionFormulas
	// Условие
	condTetaK: IConditionFormulas
	// Угол поворота кольца свободного фланца в рабочих условиях
	tetaK: string
}

export interface ITightnessLoadFormulas {
	// Нагрузка вызванная стесненностью температурных деформаций
	Qt: string
	// Расчетная нагрузка на болты/шпильки фланцевых соединений
	Pb: string
	// Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления
	Pb1: string
	// Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях
	Pbr: string
}
