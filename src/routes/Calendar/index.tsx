import React from "react";
import { useQuery } from "react-query";
import { getEventTypes, getEventSchedules } from "../../api";

export const Calendar: React.FC = () => {
  const eventTypes = useQuery("event-types", getEventTypes);
  const eventSchedules = useQuery("event-schedules", getEventSchedules);

  console.log("!!!!", eventTypes, eventSchedules);
  return <div>Calendar</div>;
};
