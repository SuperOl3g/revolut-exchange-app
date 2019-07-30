import { Action, combineReducers } from 'redux';
import { StoreState } from '../store';

const rootReducer = combineReducers<StoreState, Action>({});

export default rootReducer;
