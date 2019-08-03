import React from 'react';
import styled from '@emotion/styled';

import ExchangeWidget from '../ExchangeWidget/ExchangeWidgetContainer';
import { Provider } from 'react-redux';
import store from '../../store';
import AlertsStack from '../AlertsStack/AlertsStackContainer';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

const Content = styled.div`
  max-width: 440px;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <Content>
          <AlertsStack />
          <ExchangeWidget />
        </Content>
      </Container>
    </Provider>
  );
};

export default App;
