import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import { InputCallback } from '../../types';

const Input = styled.input`
  background: none;
  border: none;
  color: inherit;
  font-size: inherit;
  text-align: right;
  outline: none;
`;

type InputProps = {
  prefix: '+' | '-';
  name?: string;
  value?: number;
  onChange: InputCallback;
};

const filterValue = (value: string, prefix: string) => {
  if (value.length === 1 || !prefix.length) {
    return value;
  }

  return value.slice(prefix.length);
};

class CurrencyInput extends PureComponent<InputProps> {
  static defaultProps = {
    onChange: () => {}
  };

  handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { prefix } = this.props;

    const { value, name } = e.nativeEvent.target as HTMLInputElement;

    this.props.onChange(e, { value: filterValue(value, prefix), name });
  };

  render() {
    const { prefix, name, value } = this.props;

    return (
      <Input
        name={name}
        pattern="[.0-9]*"
        inputMode="numeric"
        value={(value ? prefix : '') + (value || '')}
        onChange={this.handleChange}
      />
    );
  }
}

export default CurrencyInput;
