import api from "../../service/api"

export default class CalcService {
    static async Calculate<TReq, TRes>(url: string, data: TReq): Promise<{ data: TRes }> {
        const res = await api.post(url, data)
        return res.data
    }
}
