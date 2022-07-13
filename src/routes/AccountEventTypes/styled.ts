import styled from 'styled-components';
import { TEventTypeCardCapProps } from './types';

export const EventTypeCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid rgba(26, 26, 26, 0.1);
  border-radius: 4px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 20px 10px 0 10px;
  width: 30%;
  box-sizing: border-box;

  @media screen and (min-width: 767px) and (max-width: 1023px) {
    width: 47%;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const EventTypeCardCap = styled.div<TEventTypeCardCapProps>`
  height: 6px;
  margin-top: -1px;
  margin-right: -1px;
  margin-left: -1px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: ${(props) => props.color || '#b2b2b2'};
`;

export const EventTypeCardBody = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 16px 20px;
  text-align: left;
`;

export const EventTypeCardTitle = styled.h1`
  font-size: 20px;
  box-sizing: inherit;
  color: rgb(26, 26, 26);
  font-weight: 400;
  line-height: 1.4;
`;

export const EventTypeCardExtra = styled.div`
  color: rgba(26, 26, 26, 0.6);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4;
`;

export const EventTypeBookingLink = styled.a`
  z-index: 1;
  margin-top: 8px;
  text-align: left;
  pointer-events: auto;
  color: rgb(0, 105, 255);
  text-decoration: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline-color: #5593ff;
  outline-offset: 4px;
  cursor: pointer;
`;

export const EventTypeCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const ListHeader = styled.div`
  border-top: none;
  border-bottom: 1px solid #dadada;
  vertical-align: middle;
  padding-bottom: 15px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;
