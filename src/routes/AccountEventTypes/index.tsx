import React from 'react';
import styled from 'styled-components';
import { useGetUser, useGetEventTypes } from '../../hooks';
import { Button } from '../../components';

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

const BookingLink = styled.a`
  color: #0069ff;
  text-decoration: none;
  cursor: pointer;
`;
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
            href={`/booking-page/${user.data.id}/${item.id}/${item.link}`}
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
      <BookingLink href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </BookingLink>
    );
  };

  return (
    <div>
      <Wrapper>
        <ListHeader>
          {renderBookingLink()}
          <Button transparent>New Event Type</Button>
        </ListHeader>
        <EventTypeCardList>{renderCards()}</EventTypeCardList>
      </Wrapper>
    </div>
  );
};
