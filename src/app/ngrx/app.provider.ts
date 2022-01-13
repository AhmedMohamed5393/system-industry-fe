import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILoginCustomerRequest } from '../models/interfaces/requests/ILoginCustomerRequest';
import { ICustomer } from '../models/interfaces/responses/ICustomer';
import { IOrder } from '../models/interfaces/responses/IOrder';
import * as fromActions from './app.action';
import * as fromFeature from './app.reducer';
@Injectable({ providedIn: 'root' })
export class storeProvider {
  constructor(public store: Store<fromFeature.AppState>) {}
  public getAllOrders$(): Observable<IOrder[]> {
    this.store.dispatch(fromActions.getAllOrders());
    return this.store.pipe(select(fromFeature.selectAllOrdersEntities), map((orders: IOrder[]) => orders));
  }
  public login$(customerData: ILoginCustomerRequest): Observable<any> {
    this.store.dispatch(fromActions.onLogin({ payload: customerData }));
    return this.store.pipe(select(fromFeature.selectCustomer));
  }
  public getAllCustomers$(): Observable<ICustomer[]> {
    this.store.dispatch(fromActions.getAllCustomers());
    return this.store.pipe(select(fromFeature.selectAllCustomersEntities), map((customers: ICustomer[]) => customers));
  }
}
