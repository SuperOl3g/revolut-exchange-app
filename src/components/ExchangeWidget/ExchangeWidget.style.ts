import styled from '@emotion/styled';
import colors from '../../constants/colors';

export const Content = styled.div`
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 24px 32px ${colors.shadow};
`;

export const Button = styled.button(`
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
