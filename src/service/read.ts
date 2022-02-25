import stFl from "../mock/st-fl.json"
import addit from "../mock/addit.json"
import snp from "../mock/snp copy.json"
import size_12815 from "../mock/size_12815.json"
import typeFl from "../mock/type-fl.json"
import { IStFl } from "../types/stFl"
import { IAddit } from "../types/addit"
import { ISNP, ISNPReq } from "../types/snp"
import { ISize, ISizeReq } from "../types/size"
import { ITypeFl } from "../types/typeFl"

export default class ReadService {
    static async getStFl(): Promise<{ data: IStFl[] }> {
        try {
            //TODO исправить запрос
            // const res = await api.get("/sealur-pro/st-fl/")
            const res = { data: stFl }
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getFlange() {}

    static async getAddit(): Promise<{ data: IAddit }> {
        try {
            //TODO исправить запрос
            // const res = await api.get("/sealur-pro/additionals")
            const res = { data: addit }
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getSnp(req: ISNPReq): Promise<{ data: ISNP[] }> {
        try {
            //TODO исправить запрос
            // const res = await api.get(
            //     `/sealur-pro/snp?standId=${req.standId}&flangeId=${req.flangeId}`
            // )
            const res = { data: snp }
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getSize(req: ISizeReq): Promise<{ data: ISize[]; dn: string[] }> {
        try {
            //TODO исправить запрос
            // const res = await api.get(
            //     `/sealur-pro/size?`
            // )

            //TODO фильтрация по типу того что будет в базе
            let arr: ISize[] = []
            if (req.flShort === "12815") {
                arr = (size_12815.data as ISize[]).filter(s =>
                    s.typePr.toLowerCase().includes(req.typePr.toLowerCase())
                )
            }

            const dn = new Set<string>()
            for (let i = 0; i < arr.length; i++) {
                dn.add(arr[i].dn)
            }

            const size = { data: arr, dn: Array.from(dn) }

            const res = { data: size }
            // const res = { data: s }
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
