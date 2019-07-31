import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IStoreState } from '../store';

export const mockStore = configureMockStore<IStoreState, any>([thunk]);
