import React from "react";
import { useQuery } from "react-query";
import { useGetUsers } from "../../hooks/useGetUser";
import { IEventType } from "../../types";
import { getEventTypes, getEventSchedules } from "../../api";

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
} from "./styled";

export const Calendar: React.FC | null = () => {
  const user = useGetUsers();

  const eventTypes = useQuery<IEventType[]>("event-types", getEventTypes);
  // const eventSchedules = useQuery("event-schedules", getEventSchedules);

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
