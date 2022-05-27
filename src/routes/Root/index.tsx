import React from "react";
import { Outlet } from "react-router-dom";
import { useGetUsers } from "../../hooks/useGetUser";

export const Root: React.FC = ({ children }) => {
  const { data } = useGetUsers();

  return (
    <div>
      {data && <div>User: {data.login}</div>}
      <div>
        <Outlet />
      </div>
    </div>
  );
};
