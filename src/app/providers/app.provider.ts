import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILoginCustomerRequest } from '../models/interfaces/requests/ILoginCustomerRequest';
import { ICustomer } from '../models/interfaces/responses/ICustomer';
import { IOrder } from '../models/interfaces/responses/IOrder';
import * as fromActions from '../actions/app.action';
import * as fromCustomerFeature from '../reducers/customer.reducer';
import * as fromOrderFeature from '../reducers/order.reducer';
@Injectable({ providedIn: 'root' })
export class storeProvider {
  constructor(public customerStore: Store<fromCustomerFeature.AppState>, public orderStore: Store<fromOrderFeature.AppState>) {}
  public getAllOrders$(): Observable<IOrder[]> {
    this.orderStore.dispatch(fromActions.getAllOrders());
    return this.orderStore.pipe(select(fromOrderFeature.selectAllOrdersEntities), map((orders: IOrder[]) => orders));
  }
  public login$(customerData: ILoginCustomerRequest): Observable<any> {
    this.customerStore.dispatch(fromActions.onLogin({ payload: customerData }));
    return this.customerStore.pipe(select(fromCustomerFeature.selectCustomer));
  }
  public getAllCustomers$(): Observable<ICustomer[]> {
    this.customerStore.dispatch(fromActions.getAllCustomers());
    return this.customerStore.pipe(select(fromCustomerFeature.selectAllCustomersEntities), map((customers: ICustomer[]) => customers));
  }
}
