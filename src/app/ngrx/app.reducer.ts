import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as actions from './app.action';
export const featureKey = 'module';
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({ selectId });
export function selectId(a: any): string { return a.id; }
export interface FeatureState  extends EntityState<any> { token: any; }
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
export const initialState: FeatureState = adapter.getInitialState({ token: null });
const appReducer = createReducer(
  initialState,
  // order reducers
  on(actions.getAllOrders, (state) => adapter.removeAll(state)),
  on(actions.onGetAllOrdersFailed, (state) => ({ ...state })),
  on(actions.onGetAllOrdersSucceed, (state, action) => adapter.addMany(action.payload, state)),
  // customer reducers
  on(actions.getAllCustomers, (state) => adapter.removeAll(state)),
  on(actions.onGetAllCustomersFailed, (state) => ({ ...state })),
  on(actions.onGetAllCustomersSucceed, (state, action) => adapter.addMany(action.payload, state)),
  on(actions.onLogin, (state) => ({ ...state, token: null })),
  on(actions.onLoginFailed, (state) => ({ ...state })),
  on(actions.onLoginSucceed, (state, action) => { return { ...state, token: action.payload } }),
);
export function reducer(state: FeatureState, action: Action) { return appReducer(state, action); }
