import api from "../../service/api"

type Params = {
    name: string
    value: any
}

export default class ReadService {
    static async getData(url: string, params?: Params[]) {
        let p = undefined
        if (params) {
            p = new URLSearchParams(params.map(p => [`${p.name}`, p.value]))
        }

        const res = await api.get(url, { params: p })
        return res.data
    }
}
