import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const BookingPageWrapper = styled.div`
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

const BookingContainer = styled.div`
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

export const BookingPage: React.FC | null = () => {
  const { owner } = useParams();
  return (
    <BookingPageWrapper>
      <BookingContainer>BookingPage {owner}</BookingContainer>
    </BookingPageWrapper>
  );
};
