import React from 'react';
import styled from '@emotion/styled';

import ExchangeWidget from '../ExchangeWidget/ExchangeWidget';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  max-width: 450px;
  width: 100%;
`;

const stateMock = {
  RUB: 1000500.34,
  USD: 800.7,
  EUR: 600,
  GBP: 70.5
};

const App: React.FC = () => {
  return (
    <Container>
      <Content>
        <ExchangeWidget pockets={stateMock} />
      </Content>
    </Container>
  );
};

export default App;
