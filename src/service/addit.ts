import { IAddit } from "../types/addit"
import * as addit from "../mock/addit.json"

export default class AdditService {
    static async get(): Promise<{ data: IAddit }> {
        try {
            //TODO исправить запрос
            // const res = await api.get("/sealur-pro/additionals")
            const res = { data: addit }
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
