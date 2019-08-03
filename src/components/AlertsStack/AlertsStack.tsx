import React from 'react';
import styled from '@emotion/styled';
import colors from '../../constants/colors';
import { IAlert } from '../../types';

const Container = styled.div`
  margin-bottom: 8px;
  font-size: 13px;
  height: 45px;
  color: ${colors.red1};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const ErrorMsg = styled.div`
  margin-top: 2px;
`;

interface IErorrNotificatonsProps {
  alerts?: Array<{ message: string }>;
}

const AlertsStack: React.FC<IErorrNotificatonsProps> = ({ alerts }) => (
  <Container>
    {!!alerts &&
      alerts
        .slice(-3)
        .map(({ message }, index) => (
          <ErrorMsg key={index}>⚠️ {message}</ErrorMsg>
        ))}
  </Container>
);

export default AlertsStack;
