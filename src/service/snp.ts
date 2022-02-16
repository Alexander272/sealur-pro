import { ISNPReq } from "../types/snp"
import { ISNPCopy } from "../types/snp"
import * as snp from "../mock/snp copy.json"

export default class SNPService {
    static async get(req: ISNPReq): Promise<{ data: ISNPCopy[] }> {
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
}
