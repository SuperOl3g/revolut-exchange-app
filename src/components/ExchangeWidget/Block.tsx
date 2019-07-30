import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import colors from '../../constants/colors';
import { Currency, InputCallback, Pockets } from '../../types';
import formatMoney from '../../utils/formatMoney';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import Select from '../Select/Select';

export enum BlockType {
  From,
  To
}

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

type BlockProps = {
  type: BlockType;
  currency: Currency;
  pockets: Pockets;
  inputValue?: number;
  onInputChange?: InputCallback;
};

const Block = styled.div<{ type: BlockType }>(
  `
        box-sizing: border-box;
        padding: 20px 32px 24px;
        display: flex;
        flex-wrap: wrap; 
        font-size: 26px;
        color: white;
    `,
  props =>
    props.type === BlockType.From
      ? `
            background-color: ${colors.blue1};
            position: relative;
            
            &:after {
                content: '';
                display: block;
                position: absolute;
                left: 50%;
                top: 100%;
                transform: translate(-50%, -50%) rotate(45deg);
                width: 20px;
                height: 20px;
                background-color: inherit;
            }
        `
      : `
            background-color: ${colors.blue2};
        `
);

const SecondaryText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: white;
  opacity: 0.7;
`;

type BlockState = {
  currency: Currency;
};

class ExchangeBlock extends PureComponent<BlockProps, BlockState> {
  constructor(props: BlockProps) {
    super(props);

    this.state = {
      currency: props.currency
    };
  }

  getDerivedStateFromProps(nextProps: BlockProps) {
    if (this.props.currency !== nextProps.currency) {
      this.setState({
        currency: nextProps.currency
      });
    }
  }

  onPocketChange: InputCallback = (_, { value }) => {
    this.setState({
      currency: value as Currency
    });
  };

  render() {
    const { pockets, type, inputValue, onInputChange } = this.props;
    const { currency } = this.state;

    return (
      <Block type={type}>
        <Row>
          <Select
            onChange={this.onPocketChange}
            options={Object.keys(pockets)}
            value={currency}
          />
          <CurrencyInput
            autoFocus={type === BlockType.From}
            prefix={type === BlockType.From ? '-' : '+'}
            name={type === BlockType.From ? 'from' : 'to'}
            value={inputValue}
            onChange={onInputChange}
          />
        </Row>
        <Row>
          <SecondaryText>
            You have{' '}
            {formatMoney(pockets[currency], currency, { fractions: 'always' })}
          </SecondaryText>
        </Row>
      </Block>
    );
  }
}

export default ExchangeBlock;
