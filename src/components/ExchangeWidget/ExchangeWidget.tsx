import React from 'react';
import styled from '@emotion/styled';
import colors from '../../constants/colors';
import ExchangeBlock, { BlockType } from './Block';
import { InputCallback, Pockets } from '../../types';

const Content = styled.div`
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 24px 32px ${colors.shadow};
`;

const Button = styled.button(`
    margin: 20px auto 0;
    display: block;
    border-radius: 40px;
    height: 46px;
    width: 160px;
    font-size: 18px;
    border: none;
    text-align: center;
    background-color: ${colors.pink1};
    color: white;
    transition: all 0.25s ease;
    cursor: pointer;
    outline: none;
    
    :disabled {
      opacity: .25;
      pointer-events: none;     
    }
    
    :hover {
      background-color: ${colors.pink2}
    }
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
