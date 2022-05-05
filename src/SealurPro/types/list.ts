export interface IResult {
    id: string
    designation: string
    count: string
    sizes: string
    drawing?: Drawing
    description: string
}

interface Drawing {
    name: string
    url: string
}
