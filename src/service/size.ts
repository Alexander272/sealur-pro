import { ISize, ISizeReq } from "../types/size"
import s from "../mock/size_12815.json"

export default class SizeService {
    // Promise<{ data: ISize[]; dn: Set<string> }>
    static async get(req: ISizeReq): Promise<{ data: ISize[]; dn: string[] }> {
        try {
            //TODO исправить запрос
            // const res = await api.get(
            //     `/sealur-pro/size?`
            // )

            //TODO фильтрация по типу того что будет в базе
            const arr = (s.data as ISize[]).filter(s =>
                s.typePr.toLowerCase().includes(req.typePr.toLowerCase())
            )

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
}
