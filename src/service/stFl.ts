import { IStFl } from "../types/stFl"
import api from "./api"
import * as stFl from "../mock/st-fl.json"

export default class StFlService {
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
}
