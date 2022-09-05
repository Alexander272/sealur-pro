import api from "../../service/api"
import { IFormCapCalc } from "../types/cap"
import { IFormFlangeCalc } from "../types/flange"
import { IResFlange } from "../types/res_flange"

export default class CalcService {
    static async CalculateFlange(
        url: string,
        data: IFormFlangeCalc
    ): Promise<{ data: IResFlange }> {
        const res = await api.post(url, data)
        return res.data
    }

    static async CalculateCap(data: IFormCapCalc): Promise<{ data: IResFlange }> {
        const res = await api.post("/sealur-moment/calc/cap", data)
        return res.data
    }
}
