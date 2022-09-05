import { useQuery } from "react-query";
import { IEventType } from "../types";
import { getEventTypes } from "../api";

export const useGetEventTypes = (): {
  data: IEventType[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useQuery<IEventType[]>(
    "event-types",
    getEventTypes
  );

  return { data, isLoading, isError };
};
