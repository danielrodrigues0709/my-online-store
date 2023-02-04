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
    admin: boolean,
    address: Address[],
    policiesOptions: [],
    image: string
}