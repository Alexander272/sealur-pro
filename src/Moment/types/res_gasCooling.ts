import { IBoltResult } from "./res_exCircle"
import { ICalculated, IFormulas } from "./res_exRect"

export interface IGasCooling {
    data: IDataResult
    bolts: IBoltResult
    gasket: IGasketResult
    calc: ICalculated
    formulas?: IFormulas
}

export interface IDataResult {
    // Модификация аппарата
    device: string
    // Коэффициент оребрения
    factor: string
    // Условное давление
    pressure: string
    // Материальное исполнение секции
    section: string
    // Число рядов труб в секции
    tubeCount: string
    // Число ходов по трубному пространству
    numberOfMoves: string
    // Длина оребренных труб в секции
    tubeLength: string
    // Пробное давлени1е
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
    // bп Ширина прокладки
    width: number
    // L2 - Размер прокладки в продольном направлении
    sizeLong: number
    // B2 - Размер прокладки в поперечном направление
    sizeTrans: number
    // h1
    thick1: number
    // h2
    thick2: number
    // h3
    thick3: number
    // h4
    thick4: number
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
    // тип прокладки
    type: string
    // Тип прокладки (name_gasket)
    name: string
}
