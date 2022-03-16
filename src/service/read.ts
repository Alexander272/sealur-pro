import stFl from "../mock/st-fl.json"
import addit from "../mock/addit.json"
import snp from "../mock/snp copy.json"
import size_12815 from "../mock/size_12815.json"
import typeFl from "../mock/type-fl.json"
import flange from "../mock/flange.json"
import stand from "../mock/stand.json"
import { IStFl } from "../types/stFl"
import { IAddit } from "../types/addit"
import { ISNP, ISNPReq } from "../types/snp"
import { ISize, ISizeReq } from "../types/size"
import { ITypeFl } from "../types/typeFl"
import { IFlange } from "../types/flange"
import { IStand } from "../types/stand"
import api from "./api"

export default class ReadService {
    static async getStFl(): Promise<{ data: IStFl[] }> {
        try {
            const res = await api.get("/sealur-pro/st-fl/")
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getFlange(): Promise<{ data: IFlange[] }> {
        try {
            //TODO исправить запрос
            // const res = { data: flange }
            const res = await api.get("/sealur-pro/flanges/")
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getStand(): Promise<{ data: IStand[] }> {
        try {
            //TODO исправить запрос
            // const res = { data: stand }
            const res = await api.get("sealur-pro/standards")
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getAddit(): Promise<{ data: IAddit[] }> {
        try {
            const res = await api.get<{ data: IAddit[] }>("/sealur-pro/additionals/")
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getSnp(req: ISNPReq): Promise<{ data: ISNP[] }> {
        try {
            const res = await api.get(
                `/sealur-pro/snp/?standId=${req.standId}&flangeId=${req.flangeId}`
            )
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getSize(req: ISizeReq): Promise<{ data: ISize[]; dn: string[] }> {
        try {
            const res = await api.get(
                `/sealur-pro/sizes/?flange=${req.flShort}&typeFlId=${req.typeFlId}&standId=${req.standId}&typePr=${req.typePr}`
            )
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getDefault(): Promise<{
        data: { typeFl: ITypeFl[]; snp: ISNP[]; size: { data: ISize[]; dn: string[] } }
    }> {
        try {
            //TODO исправить запрос
            // const res = await api.get("/sealur-pro/snp/")

            const arr = size_12815.data.filter(s => s.typePr.toLowerCase().includes(`снп-д`))
            const dn = new Set<string>()
            for (let i = 0; i < arr.length; i++) {
                dn.add(arr[i].dn)
            }
            const size = { data: arr, dn: Array.from(dn) }

            const res = {
                data: {
                    typeFl: typeFl.data,
                    snp: snp.data,
                    size: size,
                },
            }

            return res
        } catch (error: any) {
            throw error.response.data
        }
    }
}
