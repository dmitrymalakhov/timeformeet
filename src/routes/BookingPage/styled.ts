import styled from "styled-components";
import { TEventTypeMarkerProps } from "./types";

export const BookingPageWrapper = styled.div`
  @media (max-height: 796px) {
    flex: 1 1 auto;
  }

  padding-right: 5%;
  padding-left: 5%;
  margin-top: 66px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

export const BookingContainer = styled.div`
  min-width: 900px;
  max-width: 1060px;
  min-width: 900px;
  max-width: 1060px;
  display: flex;
  flex: 1 1 auto;
  min-height: 550px;
  transition: all 0.22s ease-out;
  width: 95%;
  border: 1px solid var(--text-color-level3, rgba(26, 26, 26, 0.1));
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 8%);
  position: relative;
  background-color: var(--container-background-color, #ffffff);
`;

export const BookingListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
`;

export const EventLink = styled.a`
  flex: 0 calc(50% - 40px);
  min-height: 180px;
  margin: 20px;
  padding: 20px;
  display: block;
  max-width: 500px;
  color: var(--text-color, rgb(26, 26, 26));
  text-decoration: none;
  border: 1px solid transparent;
  border-top: 1px solid rgba(26, 26, 26, 0.1);
  transition: border-color 0.1s ease;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
`;

export const EventTypeMarker = styled.div<TEventTypeMarkerProps>`
  background: ${(props) => props.color || "#b2b2b2"};
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background-clip: padding-box;
  border: solid 2px #fff;
  border-radius: 50%;
`;

export const EventTypeHeaderTitle = styled.div`
  flex: 1 1 auto;
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.2;
`;

export const EventTypeArrow = styled.div`
  position: relative;
  right: -8px;
  border: 8px solid transparent;
  border-left-color: rgb(26, 26, 26);
`;

export const EventTypeDescription = styled.div`
  color: rgb(26, 26, 26);
  font-size: 14px;
`;
