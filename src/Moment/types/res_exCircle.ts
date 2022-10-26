import { ICondition } from "./res_devCooling"

export interface IResExCircle {
    data: IDataResult
    bolts: IBoltResult
    gasket: IGasketResult
    calc: ICalculated
    formulas?: IFormulas
}

export interface IDataResult {
    // Расчетное давление
    pressure: number
    // Тип соединения
    type: string
    // Условие затяжки
    condition: string
}

export interface IBoltResult {
    // n - Количество болтов/шпилек
    count: number
    // Материал болта/шпильки
    material: string
    // d - Наружный диаметр болта/шпильки
    diameter: number
    // fб - Площадь болта/шпильки
    area: number
    // Модуль продольной упругости болта/шпильки
    epsilonAt20: number
    // Допускаемое напряжение при 20 C
    sigmaAt20: number
}

export interface IGasketResult {
    // название прокладки
    gasket: string
    // название среды
    env: string
    // Толщина прокладки
    thickness: number
    // bp - Ширина прокладки
    width: number
    // Наружный диаметр прокладки
    dOut: number
    // Внутренний диаметр прокладки
    dIn: number
    // m - Прокладочный коэффициент
    m: number
    // qобж - Удельное давление обжатия прокладки
    pres: number
    // Kобж - Коэффициент обжатия
    compression: number
    // Ep - Условный модуль сжатия прокладки
    epsilon: number
    // [q] - Допускаемое удельное давление
    permissiblePres: number
    // Название типа прокладки
    type: string
}

export interface ICalculated {
    deformation: ICalcDeformation
    forsesInBolts: ICalcForcesInBolts
    bolt: ICalcBolts
    moment: ICalcMoment
}

export interface ICalcDeformation {
    // b0 - Эффективная ширина прокладки
    width: number
    // Dсп - Расчетный диаметр прокладки
    diameter: number
    // Pобж - Усилие необходимое для смятия прокладки при затяжке
    deformation: number
    // Rп - Усилие на прокладке в рабочих условиях необходимое для обеспечения герметичности фланцевого соединения
    effort: number
}

export interface ICalcForcesInBolts {
    // Ab - Суммарная площадь сечения болтов/шпилек
    area: number
    // Qd - Равнодействующая нагрузка от давления
    resultantLoad: number
    // Pбм - Расчетная нагрузка на болты/шпильки фланцевых соединений
    designLoad: number
    // Pб1 - Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях
    estimatedLoad1: number
    // Минимальное начальное натяжение болтов (шпилек)
    tension: number
    // Pб2 - Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки
    estimatedLoad2: number
    // Pбр - Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях
    workDesignLoad: number
}

export interface ICalcBolts {
    // sigmaB1 - Расчетное напряжение в болтах/шпильках - при затяжке
    ratedStress: number
    // [sigma]бм - Допускаемое напряжение для болтов шпилек - при затяжке
    allowableVoltage: number
    // Условия прочности болтов шпилек - при затяжке
    strengthBolt: ICondition
    // Условие прочности прокладки
    strengthGasket: ICondition
}

export interface ICalcMoment {
    // Крутящий момент при затяжке болтов/шпилек
    Mkp: number
    // Крутящий момент при затяжке болтов/шпилек со смазкой снижается на 25%
    Mkp1: number
    // Напряжение на прокладке
    Qrek: number
    // Момент затяжки при применении уплотнения на старых (изношенных) фланцах, имеющих перекосы
    Mrek: number
    // Максимальный крутящий момент при затяжке болтов/шпилек
    Mmax: number
    // Максимальное напряжение на прокладке
    Qmax: number
}

export interface IFormulas {
    deformation: IDeformationFormulas
    forsesInBolts: IForcesInBoltsFormulas
    bolt: IBoltsFormulas
    moment: IMomentFormulas
}

export interface IDeformationFormulas {
    // b0 - Эффективная ширина прокладки
    width: string
    // Dсп - Расчетный диаметр прокладки
    diameter: string
    // Pобж - Усилие необходимое для смятия прокладки при затяжке
    deformation: string
    // Rп - Усилие на прокладке в рабочих условиях необходимое для обеспечения герметичности фланцевого соединения
    effort: string
}

export interface IForcesInBoltsFormulas {
    // Ab - Суммарная площадь сечения болтов/шпилек
    area: string
    // Qd - Равнодействующая нагрузка от давления
    resultantLoad: string
    // Pбм - Расчетная нагрузка на болты/шпильки фланцевых соединений
    designLoad: string
    // Pб1 - Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях
    estimatedLoad1: string
    // Pб2 - Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки
    estimatedLoad2: string
    // Pбр - Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях
    workDesignLoad: string
}

export interface IBoltsFormulas {
    // sigmaB1 - Расчетное напряжение в болтах/шпильках - при затяжке
    ratedStress: string
    // [sigma]бм - Допускаемое напряжение для болтов шпилек - при затяжке
    allowableVoltage: string
    // Условие прочности прокладки
    strengthGasket: string
}

export interface IMomentFormulas {
    // Крутящий момент при затяжке болтов/шпилек
    Mkp: string
    // Крутящий момент при затяжке болтов/шпилек со смазкой снижается на 25%
    Mkp1: string
    // Напряжение на прокладке
    Qrek: string
    // Момент затяжки при применении уплотнения на старых (изношенных) фланцах, имеющих перекосы
    Mrek: string
    // Максимальный крутящий момент при затяжке болтов/шпилек
    Mmax: string
    // Максимальное напряжение на прокладке
    Qmax: string
}
