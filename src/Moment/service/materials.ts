import api from "../../service/api"

export default class MaterialService {
    static async createMaterialData(url: string, data: any) {
        const res = await api.post(url, data)
        return res.data
    }

    static async updateMaterialData(url: string, data: any) {
        const res = await api.put(url, data)
        return res.data
    }

    static async deleteMaterialData(url: string) {
        const res = await api.delete(url)
        return res.data
    }
}
