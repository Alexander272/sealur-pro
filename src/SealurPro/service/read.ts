import api from "./api"
import { IStFl } from "../types/stFl"
import { IAddit } from "../types/addit"
import { ISNP, ISNPReq } from "../types/snp"
import { IDn, ISize, ISizeReq } from "../types/size"
import { ITypeFl } from "../types/typeFl"
import { IFlange } from "../types/flange"
import { IStand } from "../types/stand"
import { IPUTG, IPutgImage, IPutgReq } from "../types/putg"

type StFlResponse = { data: IStFl[] }
type FlangeResponse = { data: IFlange[] }
type TypeFlResponse = { data: ITypeFl[] }
type StandResponse = { data: IStand[] }
type PutgImageResponse = { data: IPutgImage[] }
type AdditResponse = { data: IAddit[] }
type SnpResponse = { data: ISNP[] }
type PutgResponse = { data: IPUTG[] }
type SizesResponse = { data: { sizes: ISize[]; dn: IDn[] } }
type DefSnpResponse = {
    data: { typeFl: ITypeFl[]; snp: ISNP[]; sizes: { sizes: ISize[]; dn: IDn[] } }
}

type DefResponseSnp = {
    stfl: IStFl[]
    addit: IAddit
    typeFl: ITypeFl[]
    snp: ISNP[]
    sizes: { sizes: ISize[]; dn: IDn[] }
}

type DefResponsePutg = {
    fl: IFlange[]
    addit: IAddit
    typeFl: ITypeFl[]
    putg: IPUTG[]
    sizes: { sizes: ISize[]; dn: IDn[] }
}

export default class ReadService {
    static async getStFl(): Promise<StFlResponse> {
        try {
            const res = await api.get("/sealur-pro/st-fl/")
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getFlange(): Promise<FlangeResponse> {
        try {
            const res = await api.get("/sealur-pro/flanges/")
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getTypeFl(): Promise<TypeFlResponse> {
        try {
            const res = await api.get("/sealur-pro/flange-types/")
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getStand(): Promise<StandResponse> {
        try {
            const res = await api.get("sealur-pro/standards/")
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getPutgImage(form: string): Promise<PutgImageResponse> {
        try {
            const res = await api.get(`sealur-pro/putg-image/?form=${form}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getAddit(): Promise<AdditResponse> {
        try {
            const res = await api.get<AdditResponse>("/sealur-pro/additionals/")
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getSnp(req: ISNPReq): Promise<SnpResponse> {
        try {
            const res = await api.get(
                `/sealur-pro/snp/?standId=${req.standId}&flangeId=${req.flangeId}`
            )
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getPutg(req: IPutgReq): Promise<PutgResponse> {
        try {
            const res = await api.get(`/sealur-pro/putg/?form=${req.form}&flangeId=${req.flangeId}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getSize(req: ISizeReq): Promise<SizesResponse> {
        try {
            const res = await api.get(
                `/sealur-pro/sizes/?flange=${req.flShort}&typeFlId=${req.typeFlId}&standId=${req.standId}&typePr=${req.typePr}`
            )
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
    static async getAllSize(req: ISizeReq): Promise<SizesResponse> {
        try {
            const res = await api.get(
                `/sealur-pro/sizes/all?flange=${req.flShort}&typeFlId=${req.typeFlId}&standId=${req.standId}&typePr=${req.typePr}`
            )
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getDefaultSnp(): Promise<DefResponseSnp> {
        const [stfl, addit, def] = await Promise.all([
            this.getStFl(),
            this.getAddit(),
            this.getSnpDefault(),
        ])

        return {
            stfl: stfl.data,
            addit: addit.data[0],
            typeFl: def.data.typeFl,
            snp: def.data.snp,
            sizes: def.data.sizes,
        }
    }

    static async getDefaultPutg(): Promise<DefResponsePutg> {
        const [fl, addit, typeFl, putg, sizes] = await Promise.all([
            this.getFlange(),
            this.getAddit(),
            this.getTypeFl(),
            this.getPutg({ form: "Round", flangeId: "1" }),
            this.getSize({ flShort: "33259", typeFlId: "1", standId: "0", typePr: "ПУТГ-А" }),
        ])

        return {
            fl: fl.data,
            addit: addit.data[0],
            typeFl: typeFl.data,
            putg: putg.data,
            sizes: sizes.data,
        }
    }

    static async getSnpDefault(): Promise<DefSnpResponse> {
        try {
            const res = await api.get("/sealur-pro/snp/default")
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
