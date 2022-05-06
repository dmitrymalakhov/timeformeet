import { apiRequest } from "./request";

interface RefreshTokenResponse {
  accessToken?: string;
  refreshToken?: string;
}

export const refreshToken = () =>
  apiRequest("/refresh")
    .then((res: Response) => {
      if ([401, 403].includes(res.status)) {
        window.location.replace("/signin");
      }

      return res.json();
    })
    .then((res: RefreshTokenResponse) => {
      if (res && res.accessToken)
        localStorage.setItem("token", res.accessToken);

      return res;
    });
