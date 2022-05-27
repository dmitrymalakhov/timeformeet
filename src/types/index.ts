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
