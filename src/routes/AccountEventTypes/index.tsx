import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Space } from 'antd';
import { useGetUser, useGetEventTypes } from '../../hooks';
import { Button, Content, Box } from '../../components';

import {
  EventTypeCard,
  EventTypeCardCap,
  EventTypeCardBody,
  EventTypeCardTitle,
  EventTypeCardExtra,
  EventTypeBookingLink,
  EventTypeCardList,
  ListHeader
} from './styled';

interface MenuItemProps {
  id: number;
  children: React.ReactNode;
  onClick: () => void;
}

const BookingLink = styled.a`
  color: #0069ff;
  text-decoration: none;
  cursor: pointer;
`;

const SettingLink = styled.span`
  cursor: pointer;
`;

const СonfigurationMenu = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const MenuItem = ({ id, onClick }: MenuItemProps) => {
  const handleClick = () => {
    console.log(id);
  };

  return <div onClick={handleClick}>Remove</div>;
};

export const AccountEventTypes: React.FC | null = () => {
  const user = useGetUser();
  const eventTypes = useGetEventTypes();

  const handleClickRemoveItem = () => {};
  const renderCards = () => {
    if (!eventTypes.data) return null;

    return eventTypes.data.map((item) => {
      const menu = (
        <Menu
          items={[
            {
              label: (
                <MenuItem id={item.id} onClick={handleClickRemoveItem}>
                  Remove
                </MenuItem>
              ),
              key: '0'
            }
          ]}
        />
      );

      return (
        <EventTypeCard key={item.id}>
          <EventTypeCardCap color={item.color}></EventTypeCardCap>
          <EventTypeCardBody>
            <СonfigurationMenu>
              <Dropdown overlay={menu} trigger={['click']}>
                <Space>
                  <SettingLink>
                    <span role="img" aria-label="setting">
                      ⚙️
                    </span>
                  </SettingLink>
                </Space>
              </Dropdown>
            </СonfigurationMenu>
            <EventTypeCardTitle>{item.name}</EventTypeCardTitle>
            <EventTypeCardExtra>{item.duration} min</EventTypeCardExtra>
            <EventTypeBookingLink
              target="_blank"
              href={`/booking-page/${user.data.id}/${item.id}/${item.link}`}
            >
              View booking page
            </EventTypeBookingLink>
          </EventTypeCardBody>
        </EventTypeCard>
      );
    });
  };

  const renderBookingLink = () => {
    if (user.isLoading) return null;

    const url = `${window.origin}/booking-page/${user.data.id}`;

    return (
      <BookingLink href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </BookingLink>
    );
  };

  return (
    <div>
      <Content>
        <ListHeader>
          {renderBookingLink()}
          <Button transparent>
            <Link to="/account/event_types/new">New Event Type</Link>
          </Button>
        </ListHeader>

        <EventTypeCardList>{renderCards()}</EventTypeCardList>
      </Content>
    </div>
  );
};
