import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useGetUser } from '../../hooks';
import { Button } from '../../components';

export const Root: React.FC = () => {
  const { data } = useGetUser();

  return (
    <div>
      {data && (
        <Link to="/account/event_types">
          <Button>My Account</Button>
        </Link>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
};
