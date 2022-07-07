import styled, { css } from 'styled-components';

interface IButtonProps {
  size?: 'large' | 'default';
  transparent?: boolean;
}

export const Button = styled.button<IButtonProps>`
  position: relative;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s linear 0s;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 105, 255);
  background: rgb(0, 107, 255);
  opacity: 1;
  height: 48px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 40px;
  font-family: Gilroy;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1;

  ${({ transparent }) =>
    transparent &&
    css`
      background: none;
      color: rgb(0, 105, 255);
    `}
`;
