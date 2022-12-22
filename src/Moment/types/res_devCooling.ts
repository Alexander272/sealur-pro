import { CameraDiagram, Layout } from "./devCooling"

export interface IResDevCooling {
    data: IDataResult
    cap: ICapResult
    tubeSheet: ITubeSheetResult
    tube: ITubeResult
    bolts: IBoltResult
    gasket: IGasketResult
    calc: ICalculated
    formulas?: IFormulas
}

export interface IDataResult {
    // Расчетное давление
    pressure: number
    // Расчетная температура
    temp: number
    // Способ крепления труб
    method: string
    // Тип соединения
    typeBolt: string
    // Способ крепления труб в трубной решетке
    mounting: string
    // Тип крепления труб в трубной решетке
    typeMounting: string
    // Схема камеры аппарата воздушного охлаждения
    cameraDiagram: CameraDiagram
    // Схема размещения отверстий
    layout: Layout
}

export interface ICapResult {
    // s4 - Толщина донышка крышки
    bottomThick: number
    // s5 - Толщина стенки крышки в месте присоединения к фланцу
    wallThick: number
    // s6 - Толщина фланца крышки
    flangeThick: number
    // s7 - Толщина боковой стенки
    sideWallThick: number
    // B0 - Внутренний размер камеры в поперечном направлении
    innerSize: number
    // B4 - Наружный размер камеры в поперечном направлении
    outerSize: number
    // H - Глубина камеры (крышки)
    depth: number
    // L0 - Внутренний размер камеры в продольном направлении
    L: number
    // φ - Коэффициент прочности сварного шва
    strength: number
    // cк - Прибавка на коррозию
    corrosion: number
    // R - Радиус гиба в углу крышки камеры
    radius: number
    // Материал крышки
    material: string
    // Модуль продольной упругости крышки
    epsilon: number
    // Допускаемое напряжение при 20 C
    sigmaAt20: number
    // Допускаемое напряжение при расчетной температуре
    sigma: number
}

export interface ITubeSheetResult {
    // s1 - Толщина трубной решетки в пределах зоны перфорации
    zoneThick: number
    // s2 - Толщина трубной решетки в месте уплотнения
    placeThick: number
    // s3 - Толщина трубной решетки вне зоны уплотнения
    outZoneThick: number
    // B1 - Ширина зоны решетки толщиной s1
    width: number
    // t1 - Шаг отверстий под трубы в продольном направлении
    stepLong: number
    // t2 - Шаг отверстий под трубы в поперечном направлении
    stepTrans: number
    // z - Число рядов труб в поперечном направлении
    count: number
    // d0 - Диаметр трубных отверстий в решетках
    diameter: number
    // ср - Прибавка на коррозию
    corrosion: number
    // Материал трубной решетки
    material: string
    // Модуль продольной упругости трубной решетки
    epsilon: number
    // Допускаемое напряжение при 20 C
    sigmaAt20: number
    // Допускаемое напряжение при расчетной температуре
    sigma: number
}

export interface ITubeResult {
    // L - Длина труб
    length: number
    // Lк - Приведенная длина труб при продольном изгибе
    reducedLength: number
    // dТ - Наружный диаметр трубы
    diameter: number
    // sT - Толщина стенки трубы
    thickness: number
    // сT - Прибавка на коррозию
    corrosion: number
    // l0 - Глубина развальцовки
    depth: number
    // aT - Размер сварного шва приварки труб
    size: number
    // Материал труб
    material: string
    // Модуль продольной упругости трубы
    epsilon: number
    // Допускаемое напряжение при 20 C
    sigmaAt20: number
    // Допускаемое напряжение при расчетной температуре
    sigma: number
}

export interface IBoltResult {
    // B3 - Расстояние между осями болтов/шпилек в поперечном направлении
    distance: number
    // n - Количество болтов/шпилек
    count: number
    // lб - Длина болта/шпильки между опорными поверхностями
    lenght: number
    // Материал болта/шпильки
    material: string
    // d - Наружный диаметр болта/шпильки
    diameter: number
    // fб - Площадь болта/шпильки
    area: number
    // Модуль продольной упругости болта/шпильки
    epsilon: number
    // Допускаемое напряжение при 20 C
    sigmaAt20: number
    // Допускаемое напряжение при расчетной температуре
    sigma: number
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

export interface ICondition {
    x: number
    y: number
}

export interface ICalculated {
    // Условия применения формул
    condition1: ICondition
    condition2: ICondition
    isConditionsMet: boolean
    // Pпр - Пробное давление
    pressure: number
    auxiliary: ICalcAuxiliary
    bolt: ICalcBolt
    gasketCond: ICondition
    tubeSheet: ICalcTubeSheet
    cap: ICalcCap
    moment: ICalcMoment
}

export interface ICalcAuxiliary {
    // Bт - Расчетная ширина перфорированной зоны решетки
    estimatedZoneWidth: number
    // lambda Относительная ширина беструбного края
    relativeWidth: number
    // Вспомогательные коэффициенты
    upsilon: number
    eta: number
    // Коэффициент ослабления решетки и задней стенки
    phi: number
    d: number
    // [q] Допускаемая нагрузка из условия прочности труб
    loadTube: number
    // [q]s Допускаемая нагрузка из условия прочности крепления трубы в решетке
    load: number
    mu: number
    // Коэффициент уменьшения допускаемых напряжений при продольном изгибе
    phiT: number
    // b pR - Расчетная ширина плоской прокладки
    estimatedGasketWidth: number
    // l1 - Плечи изгибающих моментов
    arm1: number
    // l2 - Плечи изгибающих моментов
    arm2: number
    // расчетный размер решетки в поперечном направлении
    Bp: number
}

export interface ICalcBolt {
    // Fв - Расчетное усилие в болтах (шпильках) в условиях эксплуатации
    workEffort: number
    Lp: number
    // F0 - Расчетное усилие в болтах (шпильках) в условиях испытаний или монтажа
    effort: number
    // Коэффициент податливости фланцевого соединения крышки и решетки
    eta: number
    // YkP Угловые податливости крышки
    capUpsilonP: number
    // YkM Угловые податливости крышки
    capUpsilonM: number
    // YpP Угловые податливости решетки
    sheetUpsilonP: number
    // YpM Угловые податливости решетки
    sheetUpsilonM: number
    // Yb Линейная податливость болта (шпильки)
    upsilonB: number
    // Yp Линейная податливость прокладки
    upsilonP: number
    // Условия прочности болтов/шпилек - в условиях испытания или монтажа
    testCond: ICondition
    // Условия прочности болтов/шпилек - в условиях эксплуатации
    workCond: ICondition
}

export interface ICalcTubeSheet {
    // s1 - Толщина трубной решетки в пределах зоны перфорации
    zoneThick: number
    // где коэффициенты:
    Lambda: number
    Psi: number
    OmegaP: number
    // Условия применения формул
    condition: ICondition
    // s2 - Толщина трубной решетки в месте уплотнения
    placeThick: number
    // s3 - Толщина трубной решетки вне зоны уплотнения
    outZoneThick: number
    // F1 - Расчетное усилие
    effort: number
    // Условие прочности крепления труб в решетке
    strength: ICondition
    // где коэффициенты:
    omega: number
    zF: number
    zM: number
}

export interface ICalcCap {
    // s4 - Толщина донышка крышки
    bottomThick: number
    // где коэффициенты:
    Lambda: number
    Psi: number
    f1: number
    f2: number
    chiK: number
    // s5 - Толщина стенки крышки в месте присоединения к фланцу
    wallThick: number
    // где коэффициенты:
    chi: number
    // s6 - Толщина фланца крышки
    flangeThick: number
    // s7 - Толщина боковой стенки
    sideWallThick: number
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
    // Условия применения формул
    condition1: string
    condition2: string
    // Pпр - Пробное давление
    pressure: string
    auxiliary: IAuxiliaryFormulas
    bolt: IBoltFormulas
    gasketCond: string
    tubeSheet: ITubeSheetFormulas
    cap: ICapFormulas
    moment: IMomentFormulas
}

export interface IAuxiliaryFormulas {
    // Bт - Расчетная ширина перфорированной зоны решетки
    estimatedZoneWidth: string
    // lambda Относительная ширина беструбного края
    relativeWidth: string
    // Вспомогательные коэффициенты
    upsilon: string
    eta: string
    // Коэффициент ослабления решетки и задней стенки
    phi: string
    d: string
    // [q] Допускаемая нагрузка из условия прочности труб
    loadTube: string
    // [q]s Допускаемая нагрузка из условия прочности крепления трубы в решетке
    load: string
    // Коэффициент уменьшения допускаемых напряжений при продольном изгибе
    phiT: string
    // b pR - Расчетная ширина плоской прокладки
    estimatedGasketWidth: string
    // l1 - Плечи изгибающих моментов
    arm1: string
    // l2 - Плечи изгибающих моментов
    arm2: string
    // расчетный размер решетки в поперечном направлении
    Bp: string
}

export interface IBoltFormulas {
    // Fв - Расчетное усилие в болтах (шпильках) в условиях эксплуатации
    workEffort: string
    Lp: string
    // F0 - Расчетное усилие в болтах (шпильках) в условиях испытаний или монтажа
    effort: string
    // Коэффициент податливости фланцевого соединения крышки и решетки
    eta: string
    // YkP Угловые податливости крышки
    capUpsilonP: string
    // YkM Угловые податливости крышки
    capUpsilonM: string
    // YpP Угловые податливости решетки
    sheetUpsilonP: string
    // YpM Угловые податливости решетки
    sheetUpsilonM: string
    // Yb Линейная податливость болта (шпильки)
    upsilonB: string
    // Yp Линейная податливость прокладки
    upsilonP: string
    // Условия прочности болтов/шпилек - в условиях испытания или монтажа
    testCond: string
    // Условия прочности болтов/шпилек - в условиях эксплуатации
    workCond: string
}

export interface ITubeSheetFormulas {
    // s1 - Толщина трубной решетки в пределах зоны перфорации
    zoneThick: string
    // где коэффициенты:
    Lambda: string
    Psi: string
    OmegaP: string
    // s2 - Толщина трубной решетки в месте уплотнения
    placeThick: string
    // s3 - Толщина трубной решетки вне зоны уплотнения
    outZoneThick: string
    // F1 - Расчетное усилие
    effort: string
    // Условие прочности крепления труб в решетке
    strength: string
    // где коэффициенты:
    omega: string
    zF: string
    zM: string
}

export interface ICapFormulas {
    // s4 - Толщина донышка крышки
    bottomThick: string
    // где коэффициенты:
    Lambda: string
    Psi: string
    f1: string
    f2: string
    chiK: string
    // s5 - Толщина стенки крышки в месте присоединения к фланцу
    wallThick: string
    // где коэффициенты:
    chi: string
    // s6 - Толщина фланца крышки
    flangeThick: string
    // s7 - Толщина боковой стенки
    sideWallThick: string
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
