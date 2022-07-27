import api from "../../service/api"

export default class ReadService {
    static async getFlangeData(url: string) {
        const res = await api.get(url)
        return res.data
    }

    static async getStandarts(url: string) {
        const res = await api.get(url)
        return res.data
    }
}
