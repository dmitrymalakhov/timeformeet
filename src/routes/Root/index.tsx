import React from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { getUser } from "../../api/";

export const Root: React.FC = ({ children }) => {
  const { data, error } = useQuery("user", getUser, {
    cacheTime: 60 * 60 * 1000
  });

  return (
    <div>
      {data && <div>User: {data.login}</div>}
      <div>
        <Outlet />
      </div>
    </div>
  );
};
