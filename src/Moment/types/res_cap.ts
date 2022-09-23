import {
    IBasis,
    IBoltResult,
    IDataResult,
    IEmbedResult,
    IFlangeResult,
    IFormulas,
    IGasketResult,
    IStrength,
    IWasherResult,
} from "./res_flange"

export interface IResCap {
    data: IDataResult
    flange: IFlangeResult
    cap: ICapResult
    bolt: IBoltResult
    gasket: IGasketResult
    embed: IEmbedResult
    washers: IWasherResult[]
    calc: ICalculateCap
    formulas?: IFormulas
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
}

export interface ICalculateCap {
    b0: number
    Dsp: number
    Po: number
    Rp: number
    A: number
    Qd: number
    Qfm: number
    Qt: number
    alpha: number
    strength: IStrength
    basis: IBasis
}
