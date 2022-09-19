import { IEventSchedules } from '../types';

export const getSchedulesByEventTypeID = (
  eventSchedules: IEventSchedules[],
  eventTypeId: string
) =>
  eventSchedules && eventTypeId
    ? eventSchedules.filter(
        (item) => item.event_type_id === parseInt(eventTypeId, 10)
      )
    : [];

export const getRandomArbitrary = (min: number, max: number) =>
  Math.random() * (max - min) + min;
