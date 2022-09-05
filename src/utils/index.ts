import { IEventSchedulesResponse } from '../types';

export const getSchedulesBuEventTypeID = (eventSchedules: IEventSchedulesResponse, eventTypeId: string) =>
  eventSchedules.data && eventTypeId
    ? eventSchedules.data.filter(
        (item) => item.event_type_id === parseInt(eventTypeId, 10)
      )
    : [];
