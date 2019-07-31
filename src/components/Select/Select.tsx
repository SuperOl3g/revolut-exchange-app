import React, { PureComponent } from 'react';
import { IFieldCallback } from '../../types';
import { StyledSelect } from './Select.style';
import noop from '../../utils/noop';

interface ISelectProps {
  name?: string;
  value?: string;
  onChange: IFieldCallback;
  options: Array<string>;
}

class Select extends PureComponent<ISelectProps> {
  static defaultProps = {
    onChange: noop
  };

  handleChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    const { value, name } = e.nativeEvent.target as HTMLInputElement;

    this.props.onChange(e, { value, name });
  };

  render() {
    const { options, value, name } = this.props;

    return (
      <StyledSelect onChange={this.handleChange} name={name}>
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
