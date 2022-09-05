import { useQuery } from 'react-query';
import { IEventSchedules, IEventSchedulesResponse } from '../types';
import { getEventSchedules } from '../api';

export const useGetEventSchedules = (): IEventSchedulesResponse => {
  const { data, isLoading, isError } = useQuery<IEventSchedules[]>(
    'event-schedules',
    getEventSchedules
  );

  return { data, isLoading, isError };
};
