import React from 'react';
import styled from '@emotion/styled';
import colors from '../../constants/colors';
import ExchangeBlock, { BlockType } from './Block';
import { InputCallback, Pockets } from '../../types';

const Content = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 24px 32px ${colors.shadow};
`;

const Button = styled.button(`
        display: block;
        border-radius: 40px;
        height: 40px;
        width: 200px;
        font-size: 18px;
        border: none;
        text-align: center;
        margin: 26px auto 0;
    `);

type WidgetProps = {
  pockets: Pockets;
};

type WidgetState = {
  fromInputVal?: number;
  toInputVal?: number;
};

class ExchangeWidget extends React.PureComponent<WidgetProps, WidgetState> {
  state = {
    fromInputVal: undefined,
    toInputVal: undefined
  };

  handleInputChange: InputCallback = (_, { value, name }) => {
    const stateKey = name === 'from' ? 'fromInputVal' : 'toInputVal';

    this.setState({
      [stateKey]: value
    });
  };

  render() {
    const { pockets } = this.props;
    const { fromInputVal, toInputVal } = this.state;

    return (
      <div>
        <Content>
          <ExchangeBlock
            type={BlockType.From}
            pockets={pockets}
            currency={'RUB'}
            inputValue={fromInputVal}
            onInputChange={this.handleInputChange}
          />
          <ExchangeBlock
            type={BlockType.To}
            pockets={pockets}
            currency={'EUR'}
            inputValue={toInputVal}
            onInputChange={this.handleInputChange}
          />
        </Content>

        <Button disabled={!toInputVal}>Exchange</Button>
      </div>
    );
  }
}

export default ExchangeWidget;
