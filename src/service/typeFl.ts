import api from "./api"
import { ITypeFl } from "../types/typeFl"
import * as typeFl from "../mock/type-fl.json"

export default class TypeFlService {
    static async get(): Promise<{ data: ITypeFl[] }> {
        try {
            //TODO исправить запрос
            // const res = await api.get("/sealur-pro/type-fl/")
            const res = { data: typeFl }
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
