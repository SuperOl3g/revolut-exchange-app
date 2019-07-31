import styled from '@emotion/styled';
import colors from '../../../constants/colors';
import { BlockType } from './Block';

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ExchangeBlock = styled.div<{ type: BlockType }>(
  `
    box-sizing: border-box;
    padding: 20px 32px 24px;
    display: flex;
    flex-wrap: wrap; 
    font-size: 26px;
    color: white;
  `,
  props =>
    props.type === BlockType.Source
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
