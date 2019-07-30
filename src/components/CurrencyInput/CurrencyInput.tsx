import React, { PureComponent } from 'react';
import { InputCallback } from '../../types';
import { noop } from '../../utils';
import NumberFormat from 'react-number-format';
import { ClassNames } from '@emotion/core';

const generateClassName = (css: (t: string) => string) =>
  css(`
  background: none;
  border: none;
  color: inherit;
  font-size: inherit;
  text-align: right;
  outline: none;
`);

type InputProps = {
  prefix: '+' | '-';
  name?: string;
  value?: number;
  onChange: InputCallback;
  autoFocus?: boolean;
};

class CurrencyInput extends PureComponent<InputProps> {
  static defaultProps = {
    onChange: noop
  };

  handleChange = ({ value }: { value: string }) => {
    const { name } = this.props;

    this.props.onChange(null, { value: Math.abs(+value).toString(), name });
  };

  render() {
    const { prefix, name, value, autoFocus } = this.props;

    return (
      <ClassNames>
        {({ css }) => (
          <NumberFormat
            className={generateClassName(css)}
            decimalScale={2}
            autoFocus={autoFocus}
            allowNegative={false}
            maxLength={20}
            name={name}
            thousandSeparator={true}
            prefix={prefix}
            value={value}
            onValueChange={this.handleChange}
          />
        )}
      </ClassNames>
    );
  }
}

export default CurrencyInput;
