import { Address } from "./address";

export interface User {
    id: number,
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    gender: string,
    phone: number,
    birthDate: string,
    role: boolean,
    address: Address[],
    policiesOptions: []
}