import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { IStoreState } from './store';
import { ActionType } from './actions';

export type TCurrency = 'RUB' | 'USD' | 'EUR' | 'GBP';

export type TDispatch = ThunkDispatch<IStoreState, undefined, IAction>;

export interface IAction {
  type: ActionType;
  payload: {
    [key: string]: any;
  };
}

export interface IFieldCallback {
  (
    e: React.SyntheticEvent<HTMLElement> | null,
    obj: {
      value: string;
      name?: string;
    }
  ): void;
}

export enum FieldType {
  Source,
  Target
}

export interface IAlert {
  id: string;
  message: string;
  repeatable?: boolean;
}

export type TAnyObject = {
  [id in string | number]?: any;
};
