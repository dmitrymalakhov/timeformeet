import { useQuery } from 'react-query';
import { IEventSchedules } from '../types';
import { getEventScheduleById } from '../api';

export const useGetEventScheduleById = (
  id: number
): {
  data: IEventSchedules | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useQuery<IEventSchedules>(
    'event-schedules',
    () => getEventScheduleById(id)
  );

  return { data, isLoading, isError };
};
