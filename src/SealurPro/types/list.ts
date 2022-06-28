import { IDrawing } from "./drawing"

export interface IResult {
    id: string
    designation: string
    count: string
    sizes: string
    drawing: (IDrawing | null) | string
    description: string
}

// interface Drawing {
//     name: string
//     url: string
// }
