import React from 'react';
import { useGetEventTypes } from '../../hooks';

import {
  BookingListWrapper,
  EventLink,
  TitleContainer,
  EventTypeMarker,
  EventTypeHeaderTitle,
  EventTypeArrow,
  EventTypeDescription
} from './styled';

export const BookingPage: React.FC | null = () => {
  const eventTypes = useGetEventTypes();

  const renderItems = () => {
    if (eventTypes.isLoading) return null;

    return eventTypes.data.map((item) => (
      <EventLink
        key={item.id}
        href={`/booking-page/${item.owner}/${item.id}/${item.link}`}
      >
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
    <>
      <BookingListWrapper>{renderItems()}</BookingListWrapper>
    </>
  );
};
