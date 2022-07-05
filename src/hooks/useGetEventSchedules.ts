import { useQuery } from 'react-query';
import { IEventSchedules } from '../types';
import { getEventSchedules } from '../api';

export const useGetEventSchedules = (): {
  data: IEventSchedules[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useQuery<IEventSchedules[]>(
    'event-schedules',
    getEventSchedules
  );

  return { data, isLoading, isError };
};
