import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { ICustomer } from '../models/interfaces/responses/ICustomer';
import { IOrder } from '../models/interfaces/responses/IOrder';
import * as actions from './app.action';
export const featureKey = 'module';
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({ selectId });
export function selectId(a: any): string { return a.id; }
export interface FeatureState  extends EntityState<any> { token: any; customers: ICustomer[]; orders: IOrder[]; }
export interface AppState { module: FeatureState; }
export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
export const selectFeature = (state: AppState) => state.module;
export const selectFeatureCustomers = createSelector(selectFeature, (state: FeatureState) => state);
export const selectFeatureOrders = createSelector(selectFeature, (state: FeatureState) => state);
export const selectAllOrders = createSelector(selectFeatureOrders, selectEntities);
export const selectAllOrdersEntities = createSelector(selectFeatureOrders, selectAll);
export const selectCustomer = createSelector(selectFeatureCustomers, (state: FeatureState) => state.token);
export const selectAllCustomers = createSelector(selectFeatureCustomers, selectEntities);
export const selectAllCustomersEntities = createSelector(selectFeatureCustomers, selectAll);
export const initialState: FeatureState = adapter.getInitialState({ token: null, customers: [], orders: [] });
const appReducer = createReducer(
  initialState,
  // order reducers
  on(actions.getAllOrders, (state: any) => adapter.removeAll(state)),
  on(actions.onGetAllOrdersFailed, (state: any) => ({ ...state })),
  on(actions.onGetAllOrdersSucceed, (state: any, action: { payload: IOrder[]; }) => adapter.addMany(action.payload, state)),
  // customer reducers
  on(actions.getAllCustomers, (state: any) => adapter.removeAll(state)),
  on(actions.onGetAllCustomersFailed, (state: any) => ({ ...state })),
  on(actions.onGetAllCustomersSucceed, (state: any, action: { payload: ICustomer[]; }) => adapter.addMany(action.payload, state)),
  on(actions.onLogin, (state: any) => ({ ...state, token: null })),
  on(actions.onLoginFailed, (state: any) => ({ ...state })),
  on(actions.onLoginSucceed, (state: any, action: any) => { return { ...state, token: action.payload } }),
);
export function reducer(state: FeatureState, action: Action) { return appReducer(state, action); }
