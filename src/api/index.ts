import { apiRequest } from '../utils/request';
import { IEventSchedules, IEventScheduled } from '../types';

export const getUser = () =>
  apiRequest('/user').then((res: Response) => res.json());

export const getEventTypes = () =>
  apiRequest('/events/types').then((res: Response) => res.json());

export const getEventSchedules = (): IEventSchedules[] =>
  apiRequest(`/events/schedules`).then((res: Response) => res.json());

export const getEventScheduleById = (id: number): IEventSchedules =>
  apiRequest(`/events/schedules/${id}`).then((res: Response) => res.json());

export const getEventScheduled = (): IEventScheduled[] =>
  apiRequest('/events/scheduled').then((res: Response) => res.json());
