import { IOrderItem } from "../IOrderItem";
export interface IOrder {
    id: string;
    items: IOrderItem[];
    totalAmount: number;
    totalPrice: number;
    store: string;
    address: string;
    customerEmail: string;
}
