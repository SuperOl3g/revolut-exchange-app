import React, { PureComponent } from 'react';
import { IFieldCallback } from '../../types';
import NumberFormat from 'react-number-format';
import { ClassNames } from '@emotion/core';
import { generateClassName } from './CurrencyInput.style';
import noop from '../../utils/noop';

interface IInputProps {
  prefix: '+' | '-';
  name: string;
  value?: number | null;
  onChange: IFieldCallback;
  getRef: React.Ref<HTMLElement>;
}

class CurrencyInput extends PureComponent<IInputProps> {
  static defaultProps = {
    onChange: noop
  };

  handleChange = ({ value }: { value: string }) => {
    const { name, prefix } = this.props;

    const newVal = prefix === '-' ? value.slice(prefix.length) : value;

    if (+newVal !== this.props.value) {
      this.props.onChange(null, { value: newVal, name });
    }
  };

  render() {
    const { prefix, name, value, getRef } = this.props;

    return (
      <ClassNames>
        {({ css }) => (
          <NumberFormat
            getInputRef={getRef}
            className={generateClassName(css)}
            decimalScale={2}
            allowNegative={false}
            maxLength={14}
            name={name}
            thousandSeparator={true}
            prefix={prefix}
            value={value || ''}
            onValueChange={this.handleChange}
          />
        )}
      </ClassNames>
    );
  }
}

export default CurrencyInput;
