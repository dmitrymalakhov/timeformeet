import { useQuery } from 'react-query';
import { IEventScheduled } from '../types';
import { getEventScheduled } from '../api';

export const useGetEventScheduled = (): {
  data: IEventScheduled[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useQuery<IEventScheduled[]>(
    'event-scheduled',
    getEventScheduled
  );

  return { data, isLoading, isError };
};
