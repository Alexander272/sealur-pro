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

export interface IFlangeResult {
    dOut: number
    d: number
    dk: number
    dnk: number
    ds: number
    h: number
    h0: number
    hk: number
    s0: number
    s1: number
    l: number
    d6: number
    c: number
    tf: number
    tk: number
    alphaK: number
    epsilonKAt20: number
    epsilonK: number
    sigmaKAt20: number
    sigmaK: number
    alphaF: number
    epsilonAt20: number
    epsilon: number
    sigmaAt20: number
    sigma: number
    sigmaM: number
    sigmaMAt20: number
    sigmaR: number
    sigmaRAt20: number
    material: string
    ringMaterial: string
    type: string
}

export interface IBoltResult {
    diameter: number
    area: number
    count: number
    lenght: number
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
    type: "Мягкая" | "Восьмигранная" | "Металлическая"
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
    b0: number
    Dsp: number
    Po: number
    Rp: number
    A: number
    Qd: number
    Qfm: number
    Qt: number
    alpha: number
    alphaM: number
    strength: {
        fPb: number
        fPb1: number
        fPb2: number
        fPbr: number
        fSigmaB1: number
        fSigmaB2: number
        fDSigmaM: number
        fDSigmaR: number
        fQ: number
        sPb: number
        sPb1: number
        sPb2: number
        sPbr: number
        sSigmaB1: number
        sSigmaB2: number
        sDSigmaM: number
        sDSigmaR: number
        sQ: number
        qP: number
        minB: number
        Mkp: number
        Mkp1: number
        Mrek: number
        Qrek: number
        Mmax: number
        Qmax: number
        strength: IStrengthResult[]
        vSigmaB1: boolean
        vSigmaB2: boolean
        vQmax: boolean
        vTeta1: boolean
        vTetaK1: boolean
        vTeta2: boolean
        vTetaK2: boolean
    }
    basis: {
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
        qP: number
        Mkp: number
        Mkp1: number
        Mrek: number
        Qrek: number
        Mmax: number
        Qmax: number
        vSigmaB1: boolean
        vSigmaB2: boolean
    }
}

interface IStrengthResult {
    Mkp: number
    Mkp1: number
    Cf: number
    Dzv: number
    MM: number
    MMk: number
    Mpk: number
    Mp: number
    sigmaM1: number
    sigmaM0: number
    sigmaT: number
    sigmaR: number
    sigmaTp: number
    sigmaRp: number
    sigmaK: number
    sigmaP1: number
    sigmaP0: number
    sigmaMp: number
    sigmaMpm: number
    sigmaMp0: number
    sigmaMpm0: number
    sigmaMop: number
    sigmaKp: number
    teta: number
    dTeta: number
    dTetaK: number
    tetaK: number
    Max1: number
    Max2: number
    Max3: number
    Max4: number
    Max5: number
    Max6: number
    Max7: number
    Max8: number
    Max9: number
    Max10: number
    Max11: number
}

export interface IFormulas {
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
    basis: {
        Pb: string
        Pb1: string
        Pb2: string
        Pbr: string
        sigmaB1: string
        sigmaB2: string
        dSigmaM: string
        dSigmaR: string
        q: string
        qP: string
        Mkp: string
        Mkp1: string
        Mrek: string
        Qrek: string
        Mmax: string
        Qmax: string
    }
    strength: {
        fPb: string
        fPb1: string
        fPb2: string
        fPbr: string
        fSigmaB1: string
        fSigmaB2: string
        fDSigmaM: string
        fDSigmaR: string
        fQ: string
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
        Mkp: string
        Mkp1: string
        Mrek: string
        Qrek: string
        Mmax: string
        Qmax: string
        strength: {
            Mkp: string
            Mkp1: string
            Cf: string
            Dzv: string
            MM: string
            MMk: string
            Mpk: string
            Mp: string
            sigmaM1: string
            sigmaM0: string
            sigmaT: string
            sigmaR: string
            sigmaTp: string
            sigmaRp: string
            sigmaK: string
            sigmaP1: string
            sigmaP0: string
            sigmaMp: string
            sigmaMpm: string
            sigmaMp0: string
            sigmaMpm0: string
            sigmaMop: string
            sigmaKp: string
            teta: string
            dTeta: string
            dTetaK: string
            tetaK: string
            Max1: string
            Max2: string
            Max3: string
            Max4: string
            Max5: string
            Max6: string
            Max7: string
            Max8: string
            Max9: string
            Max10: string
            Max11: string
        }[]
    }
}
