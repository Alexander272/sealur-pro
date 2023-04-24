import api from '../../service/api'

export default class AdminService {
	static async create(url: string, data: any) {
		const res = await api.post(url, data)
		return res.data
	}

	static async update(url: string, data: any) {
		const res = await api.put(url, data)
		return res.data
	}

	static async delete(url: string) {
		const res = await api.delete(url)
		return res.data
	}
}
