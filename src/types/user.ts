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

export interface IRoleDTO {
    service: string
    role: string
    userId: string
}

export interface IUserDTO {
    name?: string
    email?: string
    position?: string
    phone?: string
    login?: string
    password?: string
}

export interface IUser {
    id: string
    organization: string
    name: string
    email: string
    city: string
    position: string
    phone: string
    login: string
    roles: IRole[]
}

export type ConfirmUser = {
    id: string
    login: string
    password: string
    roles: IRole[]
}
