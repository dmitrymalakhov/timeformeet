import React from 'react';
import { useGetUser, useGetEventTypes } from '../../hooks';
import {
  EventTypeCard,
  EventTypeCardCap,
  EventTypeCardBody,
  EventTypeCardTitle,
  EventTypeCardExtra,
  EventTypeBookingLink,
  Wrapper,
  EventTypeCardList,
  ListHeader
} from './styled';

export const AccountEventTypes: React.FC | null = () => {
  const user = useGetUser();
  const eventTypes = useGetEventTypes();

  const renderCards = () => {
    if (!eventTypes.data) return null;

    return eventTypes.data.map((item) => (
      <EventTypeCard key={item.id}>
        <EventTypeCardCap color={item.color}></EventTypeCardCap>
        <EventTypeCardBody>
          <EventTypeCardTitle>{item.name}</EventTypeCardTitle>
          <EventTypeCardExtra>{item.duration} min</EventTypeCardExtra>
          <EventTypeBookingLink
            target="_blank"
            href={`/booking-page/${item.id}/${item.link}`}
          >
            View booking page
          </EventTypeBookingLink>
        </EventTypeCardBody>
      </EventTypeCard>
    ));
  };

  const renderBookingLink = () => {
    if (user.isLoading) return null;

    const url = `${window.origin}/booking-page/${user.data.id}`;

    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    );
  };

  return (
    <div>
      <Wrapper>
        <ListHeader>{renderBookingLink()}</ListHeader>
        <EventTypeCardList>{renderCards()}</EventTypeCardList>
      </Wrapper>
    </div>
  );
};
