export interface IUser {
  id: number;
  login: string;
}

export interface IEventType {
  id: number;
  owner: number;
  start_date: string;
  end_date: string;
  duration: number;
  repeat: string;
  name: string;
  location: string;
  description: string;
  link: string;
  color: string;
  active: boolean;
  team_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum Days {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday'
}

export enum ScheduleType {
  Everyday = 'everyday',
  Single = 'single'
}

export interface IEventSchedules {
  id: number;
  event_type_id: number;
  day: Days;
  start_time: Date;
  end_time: Date;
  schedule_type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEventSchedulesResponse {
  data: IEventSchedules[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export interface IEventScheduled {
  id: number;
  eventSchedulesId: number;
  name: string;
  email: string;
  comment: string;
  date: Date;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TMarkerProps = {
  color?: string;
};
