import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import { InputCallback } from '../../types';
import { noop } from '../../utils';

const StyledSelect = styled.select`
  display: block;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  font-size: inherit;
  color: inherit;
  margin-left: -8px;
`;

type SelectProps = {
  value?: string;
  onChange: InputCallback;
  options: Array<string>;
};

class Select extends PureComponent<SelectProps> {
  static defaultProps = {
    onChange: noop
  };

  handleChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    const { value, name } = e.nativeEvent.target as HTMLInputElement;

    this.props.onChange(e, { value, name });
  };

  render() {
    const { options, value } = this.props;

    return (
      <StyledSelect onChange={this.handleChange}>
        {options.map(key => (
          <option key={key} value={key} selected={key === value}>
            {key}
          </option>
        ))}
      </StyledSelect>
    );
  }
}

export default Select;
