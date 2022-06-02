import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from 'antd';
import type { Moment } from 'moment';
import { DayAvailableForSelect } from './styled';
import { useGetEventSchedules } from '../../hooks';

export const BookingPageEvent: React.FC | null = () => {
  const { eventTypeId, link } = useParams<Record<string, string | undefined>>();
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const eventSchedules = useGetEventSchedules(); // TODO: need add eventTypeId to request

  const renderCell = (date: Moment) => {
    if (eventSchedules.data && eventTypeId) {
      const schedules = eventSchedules.data.filter(
        (item) => item.event_type_id === parseInt(eventTypeId, 10)
      );

      const setAvailableSelect = !!schedules.find(
        (item) => item.day === date.format('dddd').toLowerCase()
      );

      if (setAvailableSelect) {
        const handleClickSelect = () => setSelectedDate(date);

        return (
          <DayAvailableForSelect
            active={selectedDate === date}
            onClick={handleClickSelect}
          >
            {date.date()}
          </DayAvailableForSelect>
        );
      }
    }

    return date.date();
  };
  return (
    <div>
      <Calendar fullscreen={false} dateFullCellRender={renderCell} />
    </div>
  );
};
