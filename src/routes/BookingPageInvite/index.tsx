import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { apiRequest } from '../../utils/request';
import { Box, TypeMarker } from '../../components';
import { IEventScheduled, IEventSchedules, IEventType } from '../../types';

interface IInviteScheduled extends IEventScheduled {
  eventSchedules: IEventSchedules;
}

interface IInviteResponse {
  eventScheduled: IInviteScheduled;
  eventType: IEventType;
}

const InviteInfoWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  margin-right: auto;
  margin-left: auto;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const InviteHeader = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  text-align: center;
  border-bottom: 1px solid var(--text-color-level3, rgba(26, 26, 26, 0.1));
  text-align: center;
`;

export const BookingPageInvite: React.FC | null = () => {
  const params = useParams<Record<string, string | undefined>>();
  const [invite, setInvite] = useState<IInviteResponse | null>(null);

  useEffect(() => {
    apiRequest(`/invitees/${params.hash}`)
      .then((res: Response) => res.json())
      .then((res: IInviteResponse) => setInvite(res));
  }, [params.hash]);

  return (
    <InviteInfoWrapper>
      <InviteHeader>
        <h1>Confirmed</h1>
      </InviteHeader>
      <Box fontWeight="700">
        <Box display="flex" fontSize="20px" mb="12px">
          <TypeMarker color={invite?.eventType.color} />
          <span>{invite?.eventType.name}</span>
        </Box>
        <Box color="gray">
          {invite?.eventScheduled.date}{' '}
          {invite?.eventScheduled.eventSchedules.start_time} -{' '}
          {invite?.eventScheduled.eventSchedules.end_time}
        </Box>
        <Box color="gray">{invite?.eventType.location}</Box>
      </Box>
    </InviteInfoWrapper>
  );
};
