import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Content, Box, Button } from '../../components';

const EventTypesItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 30px 0;
`;

export const AccountEventTypesNew: React.FC = () => {
  return (
    <Content>
      <EventTypesItem>
        <Box flexGrow="1">
          <h2>One-on-One</h2>
          <p>Let an invitee pick a time to meet with you.</p>
        </Box>
        <Link to="solo">
          <Button>Create</Button>
        </Link>
      </EventTypesItem>
    </Content>
  );
};
