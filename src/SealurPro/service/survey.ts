import api from "../../service/api"
import { IResponse } from "../types/response"
import { ISurveyDTO } from "../types/survey"

export default class SurveyService {
    static async send(data: ISurveyDTO): Promise<IResponse> {
        try {
            const res = await api.post<IResponse>("/sealur-pro/interview/", data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
