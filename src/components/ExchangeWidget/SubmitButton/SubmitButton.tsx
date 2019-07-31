import React, { PureComponent } from 'react';
import { Button, CheckIcon, Text } from './SubmitButton.style';

interface IExchangeButtonProps {
  disabled?: boolean;
  onClick: (e: React.SyntheticEvent) => void;
}

interface IExchangeButtonState {
  success: boolean;
}

class ExchnageButton extends PureComponent<
  IExchangeButtonProps,
  IExchangeButtonState
> {
  state = {
    success: false
  };

  private timer?: number;

  handleClick = (e: React.SyntheticEvent) => {
    clearTimeout(this.timer);

    this.setState({
      success: true
    });

    this.timer = window.setTimeout(() => {
      this.setState({
        success: false
      });
    }, 800);

    this.props.onClick(e);
  };

  render() {
    const { disabled, children } = this.props;
    const { success } = this.state;

    return (
      <Button success={success} disabled={disabled} onClick={this.handleClick}>
        <Text success={success}>{children}</Text>
        <CheckIcon success={success} viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </CheckIcon>
      </Button>
    );
  }
}

export default ExchnageButton;
