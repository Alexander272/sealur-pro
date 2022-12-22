import { IDetail, IPersonData, TypeGasket } from "./flange"

export type MountingMethod = "AllThickness" | "PartThickness" | "SteelSheet"
export type Mounting = "flaring" | "welding" | "rolling"
export type TypeMounting = "flat" | "groove"
export type CameraDiagram = "schema1" | "schema2" | "schema3" | "schema4" | "schema5"
export type Layout = "lSchema1" | "lSchema2"

export interface IFormDevCooling {
    // Расчетное давление
    pressure: string
    // Расчетная температура
    temp: string
    // Способ крепления труб
    method: MountingMethod
    // Тип соединения
    type: "bolt" | "pin"
    // Способ крепления труб в трубной решетке
    mounting: Mounting
    // Тип крепления труб в трубной решетке
    typeMounting: TypeMounting
    // Схема камеры аппарата воздушного охлаждения
    cameraDiagram: CameraDiagram
    // Схема размещения отверстий
    layout: Layout

    cap: ICapData
    tubeSheet: ITubeSheetData
    tube: ITubeData
    bolts: IBoltData
    gasket: IGasketFullData

    isNeedFormulas: boolean

    personData?: IPersonData
    detailData?: IDetail
}

export interface IMaterialData {
    title: string
    epsilon: string
    sigmaAt20: string
    sigma: string
}

export interface ICapData {
    // s4 - Толщина донышка крышки
    bottomThick: string
    // s5 - Толщина стенки крышки в месте присоединения к фланцу
    wallThick: string
    // s6 - Толщина фланца крышки
    flangeThick: string
    // s7 - Толщина боковой стенки
    sideWallThick: string
    // B0 - Внутренний размер камеры в поперечном направлении
    innerSize: string
    // B4 - Наружный размер камеры в поперечном направлении
    outerSize: string
    // H - Глубина камеры (крышки)
    depth: string
    // L0 - Внутренний размер камеры в продольном направлении
    L: string
    // φ - Коэффициент прочности сварного шва
    strength: string
    // cк - Прибавка на коррозию
    corrosion: string
    // R - Радиус гиба в углу крышки камеры
    radius: string
    // Id Материала крышки
    markId: string
    material: IMaterialData
}

export interface ITubeSheetData {
    // s1 - Толщина трубной решетки в пределах зоны перфорации
    zoneThick: string
    // s2 - Толщина трубной решетки в месте уплотнения
    placeThick: string
    // s3 - Толщина трубной решетки вне зоны уплотнения
    outZoneThick: string
    // B1 - Ширина зоны решетки толщиной s1
    width: string
    // t1 - Шаг отверстий под трубы в продольном направлении
    stepLong: string
    // t2 - Шаг отверстий под трубы в поперечном направлении
    stepTrans: string
    // z - Число рядов труб в поперечном направлении
    count: string
    // d0 - Диаметр трубных отверстий в решетках
    diameter: string
    // ср - Прибавка на коррозию
    corrosion: string
    // Id Материала трубной решетки
    markId: string
    material: IMaterialData
}

export interface ITubeData {
    // L - Длина труб
    length: string
    // Lк - Приведенная длина труб при продольном изгибе
    reducedLength: string
    // dТ - Наружный диаметр трубы
    diameter: string
    // sT - Толщина стенки трубы
    thickness: string
    // сT - Прибавка на коррозию
    corrosion: string
    // l0 - Глубина развальцовки
    depth: string
    // aT - Размер сварного шва приварки труб
    size: string
    // Id Материала труб
    markId: string
    material: IMaterialData
}

export interface IBoltData {
    // B3 - Расстояние между осями болтов/шпилек в поперечном направлении
    distance: string
    // n - Количество болтов/шпилек
    count: string
    // Id болта
    boltId: string
    // lб - Длина болта/шпильки между опорными поверхностями
    lenght: string
    // Id Материала болтов
    markId: string
    material: IMaterialData
    // d - Наружный диаметр болта/шпильки
    diameter: string
    // fб - Площадь болта/шпильки
    area: string
}

export interface IGasketFullData {
    // Id прокладки
    gasketId: string
    // Id среды
    envId: string
    // Толщина прокладки
    thickness: string
    // bp - Ширина прокладки
    width: string
    // L2 - Размер прокладки в продольном направлении
    sizeLong: string
    // B2 - Размер прокладки в поперечном направление
    sizeTrans: string
    data: IGasketData
}

export interface IGasketData {
    title: string
    type: TypeGasket
    qo: string
    m: string
    compression: string
    epsilon: string
    permissiblePres: string
}
