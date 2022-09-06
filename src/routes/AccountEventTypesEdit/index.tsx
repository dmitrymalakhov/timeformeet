import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Input } from 'antd';
import moment from 'moment';
import type { Moment } from 'moment';
import { Button, Content, Box } from '../../components';
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
  align-items: flex-start;
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

const days = Object.values(Days);

export const AccountEventTypesEdit: React.FC = () => {
  const { eventTypeId } = useParams<Record<string, string | undefined>>();
  const eventSchedules = useGetEventSchedules();

  const schedules = eventTypeId
    ? getSchedulesBuEventTypeID(eventSchedules, eventTypeId)
    : [];

  const renderItems = () =>
    days.map((item) => {
      const range = schedules.find((el) => el.day === item);

      const renderRange = () => {
        if (!range) return null;

        return (
          <TimeContainer>
            <Input
              value={moment(range.start_time, 'hh:mm:ss').format('HH:mm')}
            />{' '}
            <Box width="40px" textAlign="center">
              -
            </Box>
            <Input value={moment(range.end_time, 'hh:mm:ss').format('HH:mm')} />
          </TimeContainer>
        );
      };

      return (
        <AccountEventTypesEditItem>
          <span>{item.slice(0, 3).toUpperCase()}</span>
          <span>{renderRange()}</span>
        </AccountEventTypesEditItem>
      );
    });

  return (
    <Content>
      <AccountEventTypesEditSection>
        {renderItems()}
      </AccountEventTypesEditSection>
    </Content>
  );
};
