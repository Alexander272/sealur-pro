import api from "../../service/api"

export default class ReadService {
    static async getData(url: string) {
        const res = await api.get(url)
        return res.data
    }
}
