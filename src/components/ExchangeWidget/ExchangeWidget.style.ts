import styled from '@emotion/styled';
import colors from '../../constants/colors';

export const Content = styled.div`
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 24px 32px ${colors.shadow};
`;

export const ErrorString = styled.div`
  margin-top: 8px;
  min-height: 14px;
  font-size: 14px;
  text-align: center;
  color: ${colors.red1};
`;
