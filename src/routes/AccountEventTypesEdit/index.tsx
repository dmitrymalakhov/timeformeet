import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Input, Form, Button, TimePicker } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { Moment } from 'moment';
import { Content, Box } from '../../components';
import { useGetEventSchedules } from '../../hooks';
import { getSchedulesBuEventTypeID } from '../../utils';
import { IEventSchedules, Days } from '../../types';

const AccountEventTypesEditSection = styled.div`
  box-shadow: inset 0 0 0 1px #666a73;
  margin-bottom: 4px;
  border-color: #666a73;
  border-right-width: 1px;
  border-left-width: 1px;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 0 1px;
  border-style: solid;
  border-top-width: 1px;
  border-bottom-width: 1px;
  background-color: #ffffff;
  font-size: 16px;
  border-bottom: 1px solid rgb(218 218 218/50%);
`;

const AccountEventTypesEditItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin: 0 24px;
  padding: 20px 0;

  &:first-child {
    border-top: none;
  }

  border-top: 1px solid rgba(26, 26, 26, 0.1);
`;

const TimeContainer = styled.div`
  display: flex;
  padding-left: 10px;
`;

interface TimeRangeProps {
  id: number;
  day: string;
  startTime: Date;
  endTime: Date;
  onChange: () => void;
}

interface IScheduleEventsForm {}

const days = Object.values(Days);

const TimeRange = ({ startTime, endTime, id, day }: TimeRangeProps) => {
  const format = 'HH:mm';

  const handleChange = (range: any) => {
    console.log(range);
  };

  return (
    <TimeContainer>
      <Form.Item name={`${day}_${id}`}>
        <TimePicker.RangePicker
          defaultValue={[moment(startTime, format), moment(endTime, format)]}
          format={format}
          onChange={handleChange}
        />
      </Form.Item>
    </TimeContainer>
  );
};

const DayControlsWrapper = styled.div`
  width: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface DayControlProps {
  item: Days;
  onClick: (day: Days) => void;
}

const DayControl = ({ item, onClick }: DayControlProps) => {
  const handleClick = () => {
    onClick(item);
  };

  return (
    <DayControlsWrapper>
      {item.slice(0, 3).toUpperCase()}{' '}
      <Button shape="circle" icon={<PlusOutlined />} onClick={handleClick} />
    </DayControlsWrapper>
  );
};

export const AccountEventTypesEdit: React.FC = () => {
  const { eventTypeId } = useParams<Record<string, string | undefined>>();
  const eventSchedules = useGetEventSchedules();

  const [currentSchedules, setCurrentSchedules] = useState<IEventSchedules[]>(
    []
  );

  useEffect(() => {
    console.log('data fetching done');
  }, [eventSchedules]);

  const schedules = eventTypeId
    ? getSchedulesBuEventTypeID(eventSchedules, eventTypeId)
    : [];

  const renderItems = () =>
    days.map((item) => {
      const ranges = schedules
        .concat(currentSchedules)
        .filter((el) => el.day === item);

      const renderRange = () => {
        if (!ranges) return null;

        return ranges.map((range) => (
          <>
            <TimeRange
              id={range.id}
              day={item}
              startTime={range.start_time}
              endTime={range.end_time}
              onChange={() => {}}
            />
          </>
        ));
      };

      const handleClick = (day: Days) => {
        const newCurrentSchedules = currentSchedules.slice();

        if (eventTypeId) {
          newCurrentSchedules.push({
            id: 0,
            event_type_id: parseInt(eventTypeId, 10),
            day: day,
            start_time: new Date(),
            end_time: new Date(),
            schedule_type: 'repeat'
          });

          setCurrentSchedules(newCurrentSchedules);
        }

        console.log(newCurrentSchedules);
      };

      return (
        <AccountEventTypesEditItem>
          <DayControl item={item} onClick={handleClick} />
          <div>{renderRange()}</div>
        </AccountEventTypesEditItem>
      );
    });

  const handleFinish = (values: IScheduleEventsForm) => {
    console.log(values);
  };

  return (
    <Content>
      <AccountEventTypesEditSection>
        <Form layout="horizontal" onFinish={handleFinish}>
          {renderItems()}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </AccountEventTypesEditSection>
    </Content>
  );
};
