import { apiRequest } from "../utils/request";

export const getUser = () =>
  apiRequest("/user").then((res: Response) => res.json());

export const getEventTypes = () =>
  apiRequest("/events/types").then((res: Response) => res.json());

export const getEventSchedules = () =>
  apiRequest("/events/schedules").then((res: Response) => res.json());
