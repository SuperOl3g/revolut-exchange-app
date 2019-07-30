import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface StoreState {}

const store = createStore<StoreState, any, any, any>(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
