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
import { useGetEventSchedules, useGetEventScheduled } from '../../hooks';
import { ScheduleType } from '../../types';

type TimeScheduleProps = {
  id: number;
  startTime: Date;
  endTime?: Date;
  active: boolean;
  eventTypeId?: string;
  owner?: string;
  link?: string;
  date: string;
  onClick: (id: number) => void;
};

const TimeSchedule = ({
  id,
  startTime,
  endTime,
  onClick,
  active,
  link,
  eventTypeId,
  owner,
  date
}: TimeScheduleProps) => {
  const handleClick = () => {
    onClick(id);
  };

  const url = `/booking-page/${owner}/${eventTypeId}/${link}/${id}?date=${date}`;

  return (
    <Box overflow="hidden" display="flex">
      <TimeScheduleButton key={id} active={active} onClick={handleClick}>
        <div>{`${moment(startTime, 'hh:mm:ss').format('HH:mm')}`}</div>
      </TimeScheduleButton>

      <ConfirmButton href={url} active={active}>
        Confirm
      </ConfirmButton>
    </Box>
  );
};

export const BookingPageEvent: React.FC | null = () => {
  const { eventTypeId, link, owner } = useParams<
    Record<string, string | undefined>
  >();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeTimeSchedule, setActiveTimeSchedule] = useState<number>(-1);
  const eventSchedules = useGetEventSchedules(); // TODO: need add eventTypeId to request
  const eventScheduled = useGetEventScheduled();

  const schedules =
    eventSchedules.data && eventTypeId
      ? eventSchedules.data.filter(
          (item) => item.event_type_id === parseInt(eventTypeId, 10)
        )
      : [];

  const renderCell = (date: Moment) => {
    const availableSchedulesForCurrentDay = schedules.filter((item) => {
      if (item.schedule_type === ScheduleType.Everyday)
        return item.day === date.format('dddd').toLowerCase();

      if (item.schedule_type === ScheduleType.Single)
        return item.day === date.format('YYYY-MM-DD');

      return false;
    });

    const scheduledEventsForCurrentDay = availableSchedulesForCurrentDay.filter(
      (item) => {
        return eventScheduled.data?.find(
          (scheduledEvent) =>
            moment(scheduledEvent.date).format('YYYY-MM-DD') ===
              date.format('YYYY-MM-DD') &&
            scheduledEvent.eventSchedulesId === item.id
        );
      }
    );

    const setAvailableSelect =
      availableSchedulesForCurrentDay.length -
      scheduledEventsForCurrentDay.length;

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
    return schedules.map((scheduleEvent) => {
      const selectedDayFormated = moment(selectedDate)
        .format('dddd')
        .toLowerCase();

      const selectedDateFormated = moment(selectedDate).format('YYYY-MM-DD');

      const bookedEvent = eventScheduled.data?.find(
        (scheduledEvent) =>
          moment(scheduledEvent.date).format('YYYY-MM-DD') ===
            selectedDateFormated &&
          scheduledEvent.eventSchedulesId === scheduleEvent.id
      );

      if (
        (!bookedEvent &&
          scheduleEvent.schedule_type === ScheduleType.Everyday &&
          scheduleEvent.day === selectedDayFormated) ||
        (scheduleEvent.schedule_type === ScheduleType.Single &&
          scheduleEvent.day === selectedDateFormated)
      ) {
        return (
          <TimeSchedule
            key={scheduleEvent.id}
            active={scheduleEvent.id === activeTimeSchedule}
            id={scheduleEvent.id}
            startTime={scheduleEvent.start_time}
            onClick={setActiveTimeSchedule}
            eventTypeId={eventTypeId}
            link={link}
            owner={owner}
            date={selectedDateFormated}
          />
        );
      }

      return null;
    });
  };

  return (
    <Box display="flex">
      <Box width="75%">
        <Calendar fullscreen={false} dateFullCellRender={renderCell} />
      </Box>
      <Box width="25%" p="10px">
        {renderEventSchedules()}
      </Box>
    </Box>
  );
};
