import { useQuery } from "react-query";
import { IUser } from "../types";
import { getUser } from "../api";

export const useGetUsers = (): {
  data: IUser;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useQuery("user", getUser, {
    cacheTime: 60 * 60 * 1000
  });

  return { data, isLoading, isError };
};
