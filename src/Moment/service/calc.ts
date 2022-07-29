import api from "../../service/api"
import { IFormFlangeCalc } from "../types/flange"

export default class CalcService {
    static async CalculateFlange(url: string, data: IFormFlangeCalc): Promise<{ data: any }> {
        const res = await api.post(url, data)
        return res.data
    }
}
