import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { IOrder } from '../models/interfaces/responses/IOrder';
import * as actions from '../actions/app.action';
export const orderFeatureKey = 'orderModule';
export const orderAdapter: EntityAdapter<IOrder> = createEntityAdapter<IOrder>({ selectId: selectOrderId });
export function selectOrderId(a: IOrder): string { return a.id; }
export interface OrderFeatureState extends EntityState<IOrder> {}
export interface AppState { orderModule: OrderFeatureState; }
export const { selectAll, selectEntities, selectIds, selectTotal } = orderAdapter.getSelectors();
export const selectOrderFeature = (state: AppState) => state.orderModule;
export const selectFeatureOrders = createSelector(selectOrderFeature, (state: OrderFeatureState) => state);
export const selectAllOrders = createSelector(selectFeatureOrders, selectEntities);
export const selectAllOrdersEntities = createSelector(selectFeatureOrders, selectAll);
export const initialOrderState: OrderFeatureState = orderAdapter.getInitialState();
const orderReducerControl = createReducer(
  initialOrderState,
  on(actions.getAllOrders, (state) => orderAdapter.removeAll(state)),
  on(actions.onGetAllOrdersFailed, (state) => ({ ...state })),
  on(actions.onGetAllOrdersSucceed, (state, action) => orderAdapter.addMany(action.payload, state)),
);
export function orderReducer(state: OrderFeatureState, action: Action) { return orderReducerControl(state, action); }
