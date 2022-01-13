import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, retry, tap} from 'rxjs/operators';
import * as actions from './app.action';
import { Service } from './app.service';
import { ILoginCustomerRequest } from '../models/interfaces/requests/ILoginCustomerRequest';
@Injectable()
export class Effects {
  constructor(private actions$: Actions, private service: Service) {}
  // order effects
  public loadAllOrders$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getAllOrders.type),
    mergeMap(() => {
      return this.service.getAllOrders().pipe(
        retry(1),
        map((response) => actions.onGetAllOrdersSucceed({ payload: response })),
        catchError((error) => of(actions.onGetAllOrdersFailed({ payload: error }))),
      );
    }),
  ));
  public errorOnLoadAllOrders$ = createEffect(() => this.actions$.pipe(
    ofType(actions.onGetAllOrdersFailed.type),
    tap((action: actions.ActionWithPayload<any>) => console.log(action.payload))),
    { dispatch: false },
  );
  // customer effects
  public onLogin$ = createEffect(() => this.actions$.pipe(
    ofType(actions.onLogin.type),
    mergeMap((action: actions.ActionWithPayload<ILoginCustomerRequest>) => {
      return this.service.signin(action.payload).pipe(
        retry(1),
        map((response) => actions.onLoginSucceed({ payload: response })),
        catchError((error) => of(actions.onLoginFailed({ payload: error }))),
      );
    }),
  ));
  public erroronLogin$ = createEffect(() => this.actions$.pipe(
    ofType(actions.onLoginFailed.type),
    tap((action: actions.ActionWithPayload<any>) => console.log(action.payload))),
    { dispatch: false },
  );
  public loadAllCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getAllCustomers.type),
    mergeMap(() => {
      return this.service.getAllCustomers().pipe(
        retry(1),
        map((response) => actions.onGetAllCustomersSucceed({ payload: response })),
        catchError((error) => of(actions.onGetAllCustomersFailed({ payload: error }))),
      );
    }),
  ));
  public errorOnLoadAllCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(actions.onGetAllCustomersFailed.type),
    tap((action: actions.ActionWithPayload<any>) => console.log(action.payload))),
    { dispatch: false },
  );
}
