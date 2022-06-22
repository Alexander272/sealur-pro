export interface ISignIn {
    login: string
    password: string
}

export interface ISignUp {
    organization: string
    name: string
    email: string
    city: string
    position: string
    phone: string
}

export interface IRole {
    id: string
    service: string
    role: string
}
