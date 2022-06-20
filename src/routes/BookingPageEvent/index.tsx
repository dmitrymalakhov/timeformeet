import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from 'antd';
import moment from 'moment';
import type { Moment } from 'moment';
import { Box } from '../../components';
import {
  DayAvailableForSelect,
  TimeScheduleButton,
  ConfirmButton
} from './styled';
import { useGetEventSchedules } from '../../hooks';
import { ScheduleType } from '../../types';

type TimeScheduleProps = {
  id: number;
  startTime: Date;
  endTime?: Date;
  active: boolean;
  onClick: (id: number) => void;
};

const TimeSchedule = ({
  id,
  startTime,
  endTime,
  onClick,
  active
}: TimeScheduleProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <Box overflow="hidden" display="flex">
      <TimeScheduleButton key={id} active={active} onClick={handleClick}>
        <div>{`${moment(startTime, 'hh:mm:ss').format('HH:mm')}`}</div>
      </TimeScheduleButton>

      <ConfirmButton active={active}>Confirm</ConfirmButton>
    </Box>
  );
};

export const BookingPageEvent: React.FC | null = () => {
  const { eventTypeId, link } = useParams<Record<string, string | undefined>>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeTimeSchedule, setActiveTimeSchedule] = useState<number>(-1);
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
      const handleClickSelect = () => {
        setSelectedDate(date.format());
        setActiveTimeSchedule(-1);
      };

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
        return (
          <TimeSchedule
            active={item.id === activeTimeSchedule}
            id={item.id}
            startTime={item.start_time}
            onClick={setActiveTimeSchedule}
          />
        );

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
