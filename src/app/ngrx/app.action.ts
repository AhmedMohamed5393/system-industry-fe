import { Action, createAction, props } from '@ngrx/store';
import { ILoginCustomerRequest } from '../models/interfaces/requests/ILoginCustomerRequest';
import { ICustomer } from '../models/interfaces/responses/ICustomer';
import { IOrder } from '../models/interfaces/responses/IOrder';
// order actions
export const getAllOrders = createAction('[Orders List] getAllOrders');
export const onGetAllOrdersSucceed = createAction('[Orders List] getAllOrders success', props<{ payload: Array<IOrder> }>());
export const onGetAllOrdersFailed = createAction('[Orders List] getAllOrders fail', props<{ payload: any }>());
// customer actions
export const onLogin = createAction('[Customers Login] onLogin', props<{ payload: ILoginCustomerRequest }>());
export const onLoginSucceed = createAction('[Customers Login] onLogin success',  props<{ payload: { token: string } }>());
export const onLoginFailed = createAction('[Customers Login] onLogin fail', props<{ payload: any }>());
export const getAllCustomers = createAction('[Customers List] getAllCustomers');
export const onGetAllCustomersSucceed = createAction('[Customers List] getAllCustomers success', props<{ payload: Array<ICustomer> }>());
export const onGetAllCustomersFailed = createAction('[Customers List] getAllCustomers fail', props<{ payload: any }>());
export interface ActionWithPayload<T> extends Action { payload: T; }
