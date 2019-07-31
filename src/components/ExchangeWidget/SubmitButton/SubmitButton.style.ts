import styled from '@emotion/styled';
import colors from '../../../constants/colors';

export const Button = styled.button<{ success: boolean }>`
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
  position: relative;

  :disabled {
    opacity: ${({ success }) => (success ? 1 : 0.25)};
    pointer-events: none;
  }

  :hover {
    background-color: ${colors.pink2};
  }

  :active {
    background-color: ${colors.pink3};
  }
`;

export const CheckIcon = styled.svg<{ success: boolean }>`
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transition: all 0.225s ease-in-out;
  transform: translate(-50%, -50%) scale(${({ success }) => (success ? 1 : 0)});
  transition-delay: ${({ success }) => (success ? '0.1s' : 0)};
  opacity: ${({ success }) => (success ? 1 : 0)};
`;

export const Text = styled.span<{ success: boolean }>`
  transition: opacity ${({ success }) => (success ? '.15s' : '0.3s')}
    ease-in-out;
  transition-delay: ${({ success }) => (success ? 0 : '0.28s')};
  opacity: ${({ success }) => (success ? 0 : 1)};
`;
