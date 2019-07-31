import { combineReducers } from 'redux';
import rates from './rates';
import pockets from './pockets';
import exchange from './exchange';

const rootReducer = combineReducers({
  rates,
  pockets,
  exchange
});

export default rootReducer;
