import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { TPockets } from './reducers/pockets';
import { TRates } from './reducers/rates';
import { TAlerts } from './reducers/alerts';
import { TExchange } from './reducers/exchange';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IStoreState {
  pockets: TPockets;
  exchange: TExchange;
  rates: TRates;
  alerts: TAlerts;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
