import styled from '@emotion/styled';
import colors from '../../../constants/colors';
import { FieldType } from '../../../types';

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ExchangeBlock = styled.div`
  box-sizing: border-box;
  padding: 40px 50px 46px;
  display: flex;
  flex-wrap: wrap;
  font-size: 26px;
  color: white;
`;

export const Wrapper = styled.div<{ type: FieldType }>(props =>
  props.type === FieldType.Source
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

export const SecondaryText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: white;
  opacity: 0.7;
`;
