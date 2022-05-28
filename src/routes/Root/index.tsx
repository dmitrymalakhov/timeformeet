import React from "react";
import { Outlet } from "react-router-dom";
import { useGetUser } from "../../hooks";

export const Root: React.FC = ({ children }) => {
  const { data } = useGetUser();

  return (
    <div>
      {data && <div>User: {data.login}</div>}
      <div>
        <Outlet />
      </div>
    </div>
  );
};
