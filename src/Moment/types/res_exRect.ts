import { ICondition } from "./res_devCooling"
import { IBoltResult, ICalcMoment, IMomentFormulas } from "./res_exCircle"

export interface IResExRect {
    data: IDataResult
    bolts: IBoltResult
    gasket: IGasketResult
    calc: ICalculated
    formulas?: IFormulas
}

export interface IDataResult {
    // Расчетное давление
    pressure: number
    // Пробное давление
    testPressure: number
    // Тип соединения
    type: string
    // Условие затяжки
    condition: string
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
    // L2 - Размер прокладки в продольном направлении
    sizeLong: number
    // B2 - Размер прокладки в поперечном направление
    sizeTrans: number
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
    auxiliary: ICalcAuxiliary
    forcesInBolts: ICalcForcesInBolts
    bolt: ICalcBolts
    moment: ICalcMoment
}

export interface ICalcAuxiliary {
    // b pR - Расчетная ширина плоской прокладки
    estimatedGasketWidth: number
    // Lp - Расчетный размер решетки в продольном направлении
    sizeLong: number
    // Bp - Расчетный размер решетки в поперечном направлении
    sizeTrans: number
}

export interface ICalcForcesInBolts {
    // Ab - Суммарная площадь сечения болтов/шпилек
    area: number
    // Fв - Расчетное усилие в болтах (шпильках) в условиях эксплуатации
    workEffort: number
    // F0 - Расчетное усилие в болтах (шпильках) в условиях испытаний или монтажа
    effort: number
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

export interface IFormulas {
    auxiliary: IAuxiliaryFormulas
    forcesInBolts: IForcesInBoltsFormulas
    bolt: IBoltsFormulas
    moment: IMomentFormulas
}

export interface IAuxiliaryFormulas {
    // b pR - Расчетная ширина плоской прокладки
    estimatedGasketWidth: string
    // Lp - Расчетный размер решетки в продольном направлении
    sizeLong: string
    // Bp - Расчетный размер решетки в поперечном направлении
    sizeTrans: string
}

export interface IForcesInBoltsFormulas {
    // Ab - Суммарная площадь сечения болтов/шпилек
    area: string
    // Fв - Расчетное усилие в болтах (шпильках) в условиях эксплуатации
    workEffort: string
    // F0 - Расчетное усилие в болтах (шпильках) в условиях испытаний или монтажа
    effort: string
}

export interface IBoltsFormulas {
    // sigmaB1 - Расчетное напряжение в болтах/шпильках - при затяжке
    ratedStress: string
    // [sigma]бм - Допускаемое напряжение для болтов шпилек - при затяжке
    allowableVoltage: string
    // Условие прочности прокладки
    strengthGasket: string
}
