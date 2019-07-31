import React from 'react';
import { ActionType } from './actions/ActionTypes';

export type TCurrency = 'RUB' | 'USD' | 'EUR' | 'GBP';

export interface IFieldCallback {
  (
    e: React.SyntheticEvent<HTMLElement> | null,
    obj: {
      value: string;
      name: string;
    }
  ): void;
}

export interface IAction {
  type: ActionType;
  payload: {
    [key: string]: any;
  };
}
