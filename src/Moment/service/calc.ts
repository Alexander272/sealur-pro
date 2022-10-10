import api from "../../service/api"
// import { IFormCapCalc } from "../types/cap"
// import { IFormFlangeCalc } from "../types/flange"
// import { IFormFloatingHead } from "../types/floatingHead"
// import { IResCap } from "../types/res_cap"
// import { IResFlange } from "../types/res_flange"
// import { IResFloat } from "../types/res_float"

export default class CalcService {
    // static async CalculateFlange(
    //     url: string,
    //     data: IFormFlangeCalc
    // ): Promise<{ data: IResFlange }> {
    //     const res = await api.post(url, data)
    //     return res.data
    // }

    // static async CalculateCap(data: IFormCapCalc): Promise<{ data: IResCap }> {
    //     const res = await api.post("/sealur-moment/calc/cap", data)
    //     return res.data
    // }

    // static async CalculateFloat(data: IFormFloatingHead): Promise<{ data: IResFloat }> {
    //     const res = await api.post("/sealur-moment/calc/float", data)
    //     return res.data
    // }

    static async Calculate<TReq, TRes>(url: string, data: TReq): Promise<{ data: TRes }> {
        const res = await api.post(url, data)
        return res.data
    }
}
