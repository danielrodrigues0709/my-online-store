import { Product } from "./product";

export interface Cart {
    id: number;
    userId: number;
    date: Date,
    products: any[]
}