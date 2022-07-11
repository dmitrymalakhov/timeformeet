import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Box, Content } from '../../components';

const HomeBar = styled.div`
  padding-top: 20px;
  background-color: #fff;
  box-shadow: 0 20px 20px -20px rgb(0 0 0 / 15%);
  min-height: 100px;
  min-height: 44px;
`;

const Nav = styled.nav`
  height: 49px;
  overflow: hidden;
`;

const Tabs = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  font-size: 16px;
  height: 100%;
  -webkit-overflow-scrolling: touch;
`;

const Tab = styled.li`
  /* padding: 7px 15px 0; */
  list-style: none;
  padding-left: 15px;
  justify-content: space-between;
  flex-direction: column;
  display: flex;

  &:first-child {
    padding-left: 0;
  }
`;

interface LinkStyledProps {
  active?: boolean;
}

const LinkStyled = styled(Link)<LinkStyledProps>`
  padding-bottom: 22px;

  &:hover {
    border-bottom: 3px solid #a8a8a8;
  }

  ${({ active }) =>
    active &&
    css`
      border-bottom: 3px solid rgb(0, 105, 255) !important;
    `}
`;

export const AccountRoot: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div>
      <HomeBar>
        <Content>
          <Box fontSize="26px" mb="14px">
            My meetings
          </Box>
          <Box mt="5px">
            <Nav>
              <Tabs>
                <Tab>
                  <LinkStyled
                    to="/account/event_types"
                    active={location.pathname.includes('event_types')}
                  >
                    Event Types
                  </LinkStyled>
                </Tab>
                <Tab>
                  <LinkStyled
                    to="/account/scheduled_events"
                    active={location.pathname.includes('scheduled_events')}
                  >
                    Scheduled Events
                  </LinkStyled>
                </Tab>
              </Tabs>
            </Nav>
          </Box>
        </Content>
      </HomeBar>
      <Outlet />
    </div>
  );
};
