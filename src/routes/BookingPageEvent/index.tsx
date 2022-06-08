import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from 'antd';
import moment from 'moment';
import type { Moment } from 'moment';
import { DayAvailableForSelect } from './styled';
import { useGetEventSchedules } from '../../hooks';
import { ScheduleType } from '../../types';

export const BookingPageEvent: React.FC | null = () => {
  const { eventTypeId, link } = useParams<Record<string, string | undefined>>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const eventSchedules = useGetEventSchedules(); // TODO: need add eventTypeId to request

  const schedules =
    eventSchedules.data && eventTypeId
      ? eventSchedules.data.filter(
          (item) => item.event_type_id === parseInt(eventTypeId, 10)
        )
      : [];

  const renderCell = (date: Moment) => {
    const setAvailableSelect = !!schedules.find((item) => {
      if (item.schedule_type === ScheduleType.Everyday)
        return item.day === date.format('dddd').toLowerCase();

      if (item.schedule_type === ScheduleType.Single)
        return item.day === date.format('YYYY-MM-DD');

      return false;
    });

    if (setAvailableSelect) {
      const handleClickSelect = () => setSelectedDate(date.format());

      return (
        <DayAvailableForSelect
          active={selectedDate === date.format()}
          onClick={handleClickSelect}
        >
          {date.date()}
        </DayAvailableForSelect>
      );
    }

    return date.date();
  };

  const renderEventSchedules = () => {
    return schedules.map((item) => {
      if (
        (item.schedule_type === ScheduleType.Everyday &&
          item.day === moment(selectedDate).format('dddd').toLowerCase()) ||
        (item.schedule_type === ScheduleType.Single &&
          item.day === moment(selectedDate).format('YYYY-MM-DD'))
      )
        return <p key={item.id}>{`${item.start_time} - ${item.end_time}`}</p>;

      return null;
    });
  };

  return (
    <div>
      <Calendar fullscreen={false} dateFullCellRender={renderCell} />
      {renderEventSchedules()}
    </div>
  );
};
