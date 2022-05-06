import { apiRequest } from "../utils/request";

export const getUser = () =>
  apiRequest("/user").then((res: Response) => res.json());
