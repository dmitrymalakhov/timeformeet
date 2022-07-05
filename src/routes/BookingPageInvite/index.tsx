import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../../utils/request';
import styled from 'styled-components';
import { Box } from '../../components';
import { IEventScheduled, IEventSchedules } from '../../types';

interface IInvite extends IEventScheduled {
  eventSchedules: IEventSchedules;
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
  const [invite, setInvite] = useState<IInvite | null>(null);

  useEffect(() => {
    apiRequest(`/invites/${params.hash}`)
      .then((res: Response) => res.json())
      .then((res: IInvite) => setInvite(res));
  }, [params.hash]);

  console.log(invite);
  return (
    <InviteInfoWrapper>
      <InviteHeader>
        <h1>Confirmed</h1>
      </InviteHeader>
      <Box fontWeight="700">
        <Box>{invite.date}</Box>
      </Box>
    </InviteInfoWrapper>
  );
};
