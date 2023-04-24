export interface IFullMaterial {
	id: string
	title: string
	type?: 'bolt' | 'flange' | 1
	IsEmptyElasticity?: boolean
	IsEmptyAlpha?: boolean
	IsEmptyVoltage?: boolean
}

export interface IAlpha {
	id: string
	temperature: number
	alpha: number
}

export interface IElasticity {
	id: string
	temperature: number
	elasticity: number
}

export interface IVoltage {
	id: string
	temperature: number
	voltage: number
}
