import React from 'react';

export type Currency = 'RUB' | 'USD' | 'EUR' | 'GBP';

export type Pockets = {
  [id in Currency]: number;
};

export type InputCallback = (
  e: React.SyntheticEvent<HTMLElement> | null,
  obj: {
    value: string;
    name?: string;
  }
) => void;
