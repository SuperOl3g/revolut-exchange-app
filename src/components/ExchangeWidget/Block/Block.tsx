import React from 'react';
import { TCurrency, IFieldCallback } from '../../../types';
import formatMoney from '../../../utils/formatMoney';
import CurrencyInput from '../../CurrencyInput/CurrencyInput';
import Select from '../../Select/Select';
import { ExchangeBlock, Row, SecondaryText } from './Block.style';
import { TPockets } from '../../../store';

export enum BlockType {
  Source,
  Target
}

interface IBlockProps {
  type: BlockType;
  currency: TCurrency;
  pockets: TPockets;
  inputValue?: number;
  onCurrencyChange?: IFieldCallback;
  onAmountChange?: IFieldCallback;
  currencyFieldName: string;
  valueFieldName: string;
  extraContent?: React.ReactNode;
}

const WigdetBlock: React.FC<IBlockProps> = ({
  currency,
  pockets,
  type,
  inputValue,
  onCurrencyChange,
  onAmountChange,
  currencyFieldName,
  valueFieldName,
  extraContent
}) => (
  <ExchangeBlock type={type}>
    <Row>
      <Select
        name={currencyFieldName}
        onChange={onCurrencyChange}
        options={Object.keys(pockets)}
        value={currency}
      />
      <CurrencyInput
        autoFocus={type === BlockType.Source}
        prefix={type === BlockType.Source ? '-' : '+'}
        name={valueFieldName}
        value={inputValue}
        onChange={onAmountChange}
      />
    </Row>
    <Row>
      <SecondaryText>
        You have&nbsp;
        {formatMoney(pockets[currency], currency, { fractions: 'always' })}
      </SecondaryText>

      <SecondaryText>{extraContent}</SecondaryText>
    </Row>
  </ExchangeBlock>
);

export default WigdetBlock;
