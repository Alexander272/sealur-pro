import { TypeCap } from "./cap"
import {
    IBasis,
    IBasisFormulas,
    IBoltResult,
    IDataResult,
    IEmbedResult,
    IFlangeResult,
    IGasketResult,
    IStrength,
    IStrengthFormulas_Flange,
    IStrengthFormulas_St,
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
    formulas?: IFormulasCap
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

export interface IFormulasCap {
    b0: string
    Dcp: string
    Po: string
    Rp: string
    A: string
    Qd: string
    Qfm: string
    Qt: string
    alpha: string
    alphaM: string
    basis: IBasisFormulas
    strength: IStrengthFormulas
}

export interface IStrengthFormulas {
    fPb: string
    fPb1: string
    fPb2: string
    fPbr: string
    fSigmaB1: string
    fSigmaB2: string
    fDSigmaM: string
    fDSigmaR: string
    fQ: string
    fMkp: string
    fMkp1: string
    sPb: string
    sPb1: string
    sPb2: string
    sPbr: string
    sSigmaB1: string
    sSigmaB2: string
    sDSigmaM: string
    sDSigmaR: string
    sQ: string
    qP: string
    sMkp: string
    sMkp1: string
    Mrek: string
    Qrek: string
    Mmax: string
    Qmax: string
    yp: string
    yb: string
    Lb: string
    gamma: string
    flange: IStrengthFormulas_Flange
    cap: IStrengthFormulas_Cap
    strength: IStrengthFormulas_St[]
}

export interface IStrengthFormulas_Cap {
    x: string
    y: string
    k: string
    lambda: string
    omega: string
}
