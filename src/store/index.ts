import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import rootReducer from './reducers';
import { IAction, TCurrency } from '../types';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type Dispatch = ThunkDispatch<IStoreState, any, IAction>;

export type TPockets = {
  [id in TCurrency]: number;
};

export type TRates = {
  [key in TCurrency]?: {
    [key in TCurrency]: number;
  };
};

export interface IStoreState {
  pockets: TPockets;
  exchange: {
    sourceCurrency: TCurrency;
    targetCurrency: TCurrency;
  };
  rates: TRates;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
