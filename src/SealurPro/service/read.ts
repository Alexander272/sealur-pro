import snp from "../mock/snp copy.json"
import size_12815 from "../mock/size_12815.json"
import typeFl from "../mock/type-fl.json"
import { IStFl } from "../types/stFl"
import { IAddit } from "../types/addit"
import { ISNP, ISNPReq } from "../types/snp"
import { IDn, ISize, ISizeReq } from "../types/size"
import { ITypeFl } from "../types/typeFl"
import { IFlange } from "../types/flange"
import { IStand } from "../types/stand"
import api from "./api"

type StFlResponse = { data: IStFl[] }
type FlangeResponse = { data: IFlange[] }
type TypeFlResponse = { data: ITypeFl[] }
type StandResponse = { data: IStand[] }
type AdditResponse = { data: IAddit[] }
type SnpResponse = { data: ISNP[] }
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

    static async getDefault(type: string): Promise<DefResponseSnp | undefined> {
        if (type === "snp") {
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

        return

        // try {
        //     const arr = size_12815.data.filter(s => s.typePr.toLowerCase().includes(`снп-д`))
        //     const dn = new Set<string>()
        //     for (let i = 0; i < arr.length; i++) {
        //         dn.add(arr[i].dn)
        //     }
        //     const size = { data: arr, dn: Array.from(dn) }

        //     const res = {
        //         data: {
        //             typeFl: typeFl.data,
        //             snp: snp.data,
        //             size: size,
        //         },
        //     }
        //     return res
        // } catch (error: any) {
        //     throw error.response.data
        // }
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