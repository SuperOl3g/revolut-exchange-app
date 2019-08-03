import formStateHOC from './formStateHOC';
import React from 'react';
import { FieldType } from '../../../types';
import noop from '../../../utils/noop';
import { mount } from 'enzyme';

const defaultPockets = {
  RUB: 1000500.34,
  USD: 800.7,
  EUR: 600,
  GBP: 70.5
};

const defaultRates = {
  RUB: {
    RUB: 1,
    EUR: 0.0137920572,
    USD: 0.0153174587,
    GBP: 0.0126204219
  },
  USD: {
    RUB: 65.2849810913,
    EUR: 0.9004141905,
    USD: 1,
    GBP: 0.823924005
  },
  EUR: {
    RUB: 72.5055,
    USD: 1.1106,
    EUR: 1,
    GBP: 0.91505
  },
  GBP: {
    RUB: 79.2366537348,
    EUR: 1.092836457,
    USD: 1.2137041692,
    GBP: 1
  }
};

const createDummy = (initState?: any, initProps: any = {}) => {
  const resultProps: any = {};

  const Component = formStateHOC(initState)(props => {
    for (var k in props) {
      resultProps[k] = props[k];
    }

    return <div />;
  });

  const elem = mount(
    <Component
      pockets={initProps.pockets || defaultPockets}
      rates={initProps.rates || defaultRates}
      onExchange={initProps.onExchange || noop}
      updateRates={initProps.updateRates || noop}
    />
  );

  return {
    resultProps,
    elem
  };
};

describe('formStateHOC', () => {
  describe('on mount', () => {
    it('should request new rates', () => {
      const handleUpdateRates = jest.fn();

      const initProps = {
        updateRates: handleUpdateRates
      };

      createDummy(undefined, initProps);

      expect(handleUpdateRates).toBeCalled();
    });
  });

  describe('on amount change', () => {
    it('should render value from callback (sourceAmount)', () => {
      const { resultProps } = createDummy();

      resultProps.onAmountChange(undefined, {
        value: '500.5',
        name: 'sourceAmount'
      });
      expect(resultProps.sourceAmount).toBe(500.5);
    });

    it('should render value from callback (targetAmount)', () => {
      const { resultProps } = createDummy();

      resultProps.onAmountChange(undefined, {
        value: '100500.34',
        name: 'targetAmount'
      });
      expect(resultProps.targetAmount).toBe(100500.34);
    });

    it('should calc value of the opposite field', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB'
      };

      const initProps = {
        rates: {
          USD: {
            RUB: 45.5
          }
        }
      };

      const { resultProps } = createDummy(initState, initProps);

      resultProps.onAmountChange(undefined, {
        value: '11',
        name: 'sourceAmount'
      });

      expect(resultProps.targetAmount).toBe(500.5);
    });

    it('should calc value of the opposite field (2)', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB'
      };

      const initProps = {
        rates: {
          USD: {
            RUB: 45.5
          }
        }
      };

      const { resultProps } = createDummy(initState, initProps);

      resultProps.onAmountChange(undefined, {
        value: '11',
        name: 'targetAmount'
      });

      expect(resultProps.sourceAmount).toBe(0.24);
    });

    it('should clear opposite field after changing if there is no rates', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB',
        sourceAmount: 1234
      };

      const initProps = {
        rates: {}
      };

      const { resultProps } = createDummy(initState, initProps);

      expect(resultProps.sourceAmount).toBe(1234);

      resultProps.onAmountChange(undefined, {
        value: '11',
        name: 'targetAmount'
      });

      expect(resultProps.sourceAmount).toBe(null);
    });

    it('should clear second field if the first was also cleared', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB',
        sourceAmount: 1234
      };

      const initProps = {
        rates: {
          USD: {
            RUB: 45.5
          }
        }
      };

      const { resultProps } = createDummy(initState, initProps);

      expect(resultProps.sourceAmount).toBe(1234);

      resultProps.onAmountChange(undefined, {
        value: '',
        name: 'targetAmount'
      });

      expect(resultProps.sourceAmount).toBe(null);
    });

    it('should reCalc output amount value after rates update', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB'
      };

      const initProps = {
        rates: {
          USD: {
            RUB: 45.5
          }
        }
      };

      const { elem, resultProps } = createDummy(initState, initProps);

      resultProps.onAmountChange(undefined, {
        value: '11',
        name: 'sourceAmount'
      });

      expect(resultProps.targetAmount).toBe(500.5);

      elem.setProps({
        rates: {
          USD: {
            RUB: 52
          }
        }
      });

      expect(resultProps.targetAmount).toBe(572);
    });
  });

  describe('on submit', () => {
    it('should calls onExchange fn', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB',
        sourceAmount: 1234,
        targetAmount: 100500
      };

      const handleExchange = jest.fn();

      const initProps = {
        onExchange: handleExchange
      };

      const { resultProps } = createDummy(initState, initProps);

      resultProps.onSubmit();

      expect(handleExchange).toBeCalledWith('USD', 1234, 'RUB', 100500);
    });

    it('should clean both fields', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB',
        sourceAmount: 1234,
        targetAmount: 100500
      };

      const { resultProps } = createDummy(initState);

      expect(resultProps.sourceAmount).toBe(1234);
      expect(resultProps.targetAmount).toBe(100500);

      resultProps.onSubmit();

      expect(resultProps.sourceAmount).toBe(null);
      expect(resultProps.targetAmount).toBe(null);
    });
  });

  describe('on validate', () => {
    it('should be OK if all conditions are complied', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB',
        sourceAmount: 1234,
        targetAmount: 100500
      };

      const initProps = {
        pockets: {
          USD: 5000,
          RUB: 20
        }
      };

      const { resultProps } = createDummy(initState, initProps);

      expect(resultProps.valid).toBe(true);
      expect(resultProps.errorMsg).toBe(undefined);
    });

    it('should be failed if there is no sourceAmount', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB',
        sourceAmount: null,
        targetAmount: 100500
      };

      const { resultProps } = createDummy(initState);

      expect(resultProps.valid).toBe(false);
    });

    it('should be failed if there is no targetAmount', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB',
        targetAmount: null,
        sourceAmount: 100500
      };

      const { resultProps } = createDummy(initState);

      expect(resultProps.valid).toBe(false);
    });

    it('should be failed if all conditions are complied', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'RUB',
        sourceAmount: 1234,
        targetAmount: 100500
      };

      const initProps = {
        pockets: {
          USD: 500,
          RUB: 20
        }
      };

      const { resultProps } = createDummy(initState, initProps);

      resultProps.onSubmit();

      expect(resultProps.valid).toBe(false);
      expect(resultProps.errorMsg).toBe('Not enough money');
    });
  });

  describe('on currency change', () => {
    it('should update output val', () => {
      const initState = {
        sourceCurrency: 'RUB',
        targetCurrency: 'USD'
      };

      const { resultProps } = createDummy(initState);

      resultProps.onCurrencyChange(FieldType.Source, 'USD');

      expect(resultProps.sourceCurrency).toBe('USD');
    });

    it('should request new rates', () => {
      const initState = {
        sourceCurrency: 'RUB',
        targetCurrency: 'USD'
      };

      const handleUpdateRates = jest.fn();

      const initProps = {
        updateRates: handleUpdateRates
      };

      const { resultProps } = createDummy(initState, initProps);

      handleUpdateRates.mockClear();

      resultProps.onCurrencyChange(FieldType.Source, 'USD');

      expect(handleUpdateRates).toBeCalled();
    });

    it('should change opposite field currency if values are the same', () => {
      const initState = {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR'
      };

      const { resultProps } = createDummy(initState);

      resultProps.onCurrencyChange(FieldType.Source, 'EUR');

      expect(resultProps.targetCurrency).toBe('USD');
    });

    it('should change opposite field currency if values are the same (2)', async () => {
      const initState = {
        sourceCurrency: 'GBP',
        targetCurrency: 'EUR'
      };

      const { resultProps } = createDummy(initState);

      resultProps.onCurrencyChange(FieldType.Source, 'EUR');

      expect(resultProps.targetCurrency).toBe('GBP');
    });
  });
});
