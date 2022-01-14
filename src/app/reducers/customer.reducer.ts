import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { ICustomer } from '../models/interfaces/responses/ICustomer';
import * as actions from '../actions/app.action';
export const customerFeatureKey = 'customerModule';
export const customerAdapter: EntityAdapter<ICustomer> = createEntityAdapter<ICustomer>({ selectId: selectCustomerId });
export function selectCustomerId(a: ICustomer): string { return a._id; }
export interface CustomerFeatureState extends EntityState<ICustomer> { token: any; }
export interface AppState { customerModule: CustomerFeatureState; }
export const { selectAll, selectEntities, selectIds, selectTotal } = customerAdapter.getSelectors();
export const selectCustomerFeature = (state: AppState) => state.customerModule;
export const selectFeatureCustomers = createSelector(selectCustomerFeature, (state: CustomerFeatureState) => state);
export const selectCustomer = createSelector(selectFeatureCustomers, (state: CustomerFeatureState) => state.token);
export const selectAllCustomers = createSelector(selectFeatureCustomers, selectEntities);
export const selectAllCustomersEntities = createSelector(selectFeatureCustomers, selectAll);
export const initialCustomerState: CustomerFeatureState = customerAdapter.getInitialState({ token: null });
const customerReducerControl = createReducer(
  initialCustomerState,
  on(actions.getAllCustomers, (state) => customerAdapter.removeAll(state)),
  on(actions.onGetAllCustomersFailed, (state) => ({ ...state })),
  on(actions.onGetAllCustomersSucceed, (state, action) => customerAdapter.addMany(action.payload, state)),
  on(actions.onLogin, (state) => ({ ...state, token: null })),
  on(actions.onLoginFailed, (state) => ({ ...state })),
  on(actions.onLoginSucceed, (state, action) => { return { ...state, token: action.payload } }),
);
export function customerReducer(state: CustomerFeatureState, action: Action) { return customerReducerControl(state, action); }
