export interface IResFloat {
    data: IDataResult
    flange: IFlangeResult
    cap: ICapResult
    bolt: IBoltResult
    gasket: IGasketResult
    calc: ICalculate
    formulas?: IFormulas
}

export interface IDataResult {
    pressure: number
    work: string
    hasThorn: boolean
    type: string
    condition: string
}

export interface IFlangeResult {
    dOut: number
    d: number
    d6: number
    tf: number
    width?: number
    dIn?: number
    epsilonAt20: number
    epsilon: number
    sigmaAt20: number
    sigma: number
    material: string
    b: number
    l0: number
    y: number
}

export interface ICapResult {
    h: number
    radius: number
    s: number
    t: number
    epsilonAt20: number
    epsilon: number
    material: string
    y: number
    lambda: number
    omega: number
}

export interface IBoltResult {
    diameter: number
    area: number
    count: number
    lenght: number
    temp: number
    epsilonAt20: number
    epsilon: number
    sigmaAt20: number
    sigma: number
    material: string
}

export interface IGasketResult {
    gasket: string
    env: string
    thickness: number
    d_out: number
    width: number
    m: number
    pres: number
    compression: number
    epsilon: number
    permissiblePres: number
    type: "Мягкая" | "Восьмигранная" | "Металлическая"
}

export interface ICalculate {
    b0: number
    Dcp: number
    yp: number
    yb: number
    Lb: number
    Po: number
    Rp: number
    A: number
    Qd: number
    alpha: number
    Pb: number
    Pb1: number
    Pb2: number
    Pbr: number
    sigmaB1: number
    sigmaB2: number
    dSigmaM: number
    dSigmaR: number
    q: number
    minB: number
    Mkp: number
    Mkp1: number
    Mrek: number
    Qrek: number
    Mmax: number
    Qmax: number
    vSigmaB1: boolean
    vSigmaB2: boolean
}

export interface IFormulas {
    b0: string
    Dcp: string
    yp: string
    yb: string
    Lb: string
    Po: string
    Rp: string
    A: string
    Qd: string
    alpha: string
    Pb: string
    Pb1: string
    Pb2: string
    Pbr: string
    sigmaB1: string
    sigmaB2: string
    dSigmaM: string
    dSigmaR: string
    q: string
    Mkp: string
    Mkp1: string
    Mrek: string
    Qrek: string
    Mmax: string
    Qmax: string
    flange: IFlangeFormulas
    cap: ICapFormulas
}

export interface IFlangeFormulas {
    b: string
    l0: string
    y: string
}

export interface ICapFormulas {
    y: string
    lambda: string
    omega: string
}
