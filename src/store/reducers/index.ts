import { combineReducers } from 'redux';
import rates from './rates';
import pockets from './pockets';
import alerts from './alerts';
import { IStoreState } from '../index';
import { IAction } from '../../types';

const rootReducer = combineReducers<IStoreState, IAction>({
  rates,
  pockets,
  alerts
});

export default rootReducer;
