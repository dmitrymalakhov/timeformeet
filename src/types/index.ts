export interface IUser {
  id: number;
  login: string;
}

export interface IEventType {
  id: number;
  owner: number;
  start_date: Date;
  end_date: Date;
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

enum Days {
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
  Sunday = "sunday"
}

export interface IEventSchedules {
  id: number;
  event_type_id: number;
  day: Days;
  start_time: Date;
  end_time: Date;
  createdAt: Date;
  updatedAt: Date;
}
