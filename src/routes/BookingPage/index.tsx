import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetEventTypes } from "../../hooks";
import { TEventTypeMarkerProps } from "./types";
import {
  BookingPageWrapper,
  BookingContainer,
  BookingListWrapper,
  EventLink,
  TitleContainer,
  EventTypeMarker,
  EventTypeHeaderTitle,
  EventTypeArrow,
  EventTypeDescription
} from "./styled";

export const BookingPage: React.FC | null = () => {
  const { owner } = useParams();
  const eventTypes = useGetEventTypes();

  const renderItems = () => {
    if (eventTypes.isLoading) return null;

    return eventTypes.data.map((item) => (
      <EventLink key={item.id} href={`/booking-page/${item.id}/${item.link}`}>
        <TitleContainer>
          <EventTypeMarker color={item.color} />
          <EventTypeHeaderTitle>{item.name}</EventTypeHeaderTitle>
          <EventTypeArrow />
        </TitleContainer>
        <EventTypeDescription>{item.description}</EventTypeDescription>
      </EventLink>
    ));
  };

  return (
    <BookingPageWrapper>
      <BookingContainer>
        <BookingListWrapper>{renderItems()}</BookingListWrapper>
      </BookingContainer>
    </BookingPageWrapper>
  );
};
