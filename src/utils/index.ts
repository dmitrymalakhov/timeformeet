export const getSchedulesBuEventTypeID = (eventSchedules, eventTypeId) =>
  eventSchedules.data && eventTypeId
    ? eventSchedules.data.filter(
        (item) => item.event_type_id === parseInt(eventTypeId, 10)
      )
    : [];
