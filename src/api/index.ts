import { apiRequest } from "../utils/request";
import { IEventSchedules } from "../types";

export const getUser = () =>
  apiRequest("/user").then((res: Response) => res.json());

export const getEventTypes = () =>
  apiRequest("/events/types").then((res: Response) => res.json());

export const getEventSchedules = (): IEventSchedules[] =>
  apiRequest("/events/schedules").then((res: Response) => res.json());
