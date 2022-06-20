import styled, { css } from 'styled-components';

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

  ${(props) =>
    !props.active &&
    css`
      &:hover {
        color: #0060d4;
        background-color: rgba(0, 105, 255, 0.15);
      }
    `}
`;

type TimeScheduleButtonProps = {
  active: boolean;
};

type ConfirmButtonProps = {
  active: boolean;
};

export const TimeScheduleButton = styled.button<TimeScheduleButtonProps>`
  width: 100%;
  height: 52px;
  color: rgb(0, 105, 255);
  border: 1px solid rgba(0, 105, 255, 0.5);
  position: relative;
  padding: 13px 10px;
  font-weight: 700;
  vertical-align: top;
  border-radius: 4px;
  transition: all 0.3s ease;
  transition-property: width, transform;
  background: white;
  line-height: 10px;

  ${(props) =>
    props.active
      ? css`
          width: 48.5%;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.6);
          border-color: transparent;
        `
      : css`
          &:hover {
            border-color: rgb(0, 105, 255);
            border-width: 2px;
            cursor: pointer;
          }
        `}

  > div {
    position: relative;
    margin-right: auto;
    margin-left: auto;
  }
`;

export const ConfirmButton = styled.button<ConfirmButtonProps>`
  transform: translateX(0);
  width: 48.5%;
  height: 52px;
  margin-right: -50%;
  overflow: hidden;
  color: var(--primary-text-color, #ffffff);
  background-color: var(--primary-color, rgb(0, 105, 255));
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 10%);
  position: relative;
  padding: 13px 10px;
  font-weight: 700;
  vertical-align: top;
  border-radius: 4px;
  transition: all 0.3s ease;
  transition-property: width, transform;
  display: relative;
  border: none;
  cursor: pointer;

  &:after {
    position: absolute;
    top: -7px;
    bottom: -7px;
    left: 0;
    width: 100%;
    content: '';
  }

  ${(props) =>
    props.active &&
    css`
      margin-right: 0;
      margin-left: 3%;
    `}
`;
