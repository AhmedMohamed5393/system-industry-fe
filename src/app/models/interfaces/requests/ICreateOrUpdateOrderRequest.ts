import { IOrderItem } from "../IOrderItem";
export interface ICreateOrUpdateOrder{
    id?: string;
    customerId: string;
    items: IOrderItem[];
    store: string;
    address: string;
}
