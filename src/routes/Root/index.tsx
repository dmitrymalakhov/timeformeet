import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useGetUser } from '../../hooks';
import { Button } from '../../components';

export const Root: React.FC = () => {
  const { data } = useGetUser();

  return (
    <div>
      {data ? (
        <Link to="/me">
          <Button>My Account</Button>
        </Link>
      ) : (
        <Link to="/signin">Sign in</Link>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
};
