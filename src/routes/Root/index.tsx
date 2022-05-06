import { useQuery } from "react-query";
import { getUser } from "../../api/";

export const Root = () => {
  const { data, error } = useQuery("user", getUser, {
    cacheTime: 60 * 60 * 1000
  });

  return <div>{data && <div>User: {data.login}</div>}</div>;
};
