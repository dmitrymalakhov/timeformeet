import styled from 'styled-components';

interface IDayAvailableForSelectProps {
  active: boolean;
}

export const DayAvailableForSelect = styled.span<IDayAvailableForSelectProps>`
  font-weight: 700;
  background-color: ${(props) =>
    props.active ? 'rgb(0,105,255)' : 'rgba(0,105,255,0.065)'};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-right: auto;
  margin-left: auto;
  padding: 1px 0 0;
  color: ${(props) => (props.active ? 'white' : 'rgba(26,26,26,0.6)')};
  font-size: 16px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 50%;
  outline-color: #5593ff;
  outline-offset: 4px;

  &:hover {
    color: #0060d4;
    background-color: rgba(0, 105, 255, 0.15);
  }
`;
