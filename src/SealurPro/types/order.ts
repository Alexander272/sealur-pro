export interface IOrder {
    id: string
    date: string
    count: number
}

export interface IOrderDTO {
    id?: string
    count: number
    userId: string
}

export interface IPosition {
    id: string
    designation: string
    count: string
    sizes: string
    drawing: string
    description: string
    orderId: string
}

export interface IPositionDTO {
    designation: string
    count: string
    sizes: string
    drawing: string
    description: string
    orderId: string
}
