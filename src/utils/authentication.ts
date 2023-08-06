import { apiRequest } from './request';

export enum HttpStatus {
  Unauthorized = 401,
  Forbidden = 403
}

export interface RefreshTokenResponse {
  accessToken?: string;
  refreshToken?: string;
}

export const refreshToken = (): Promise<RefreshTokenResponse> =>
  apiRequest('/refresh')
    .then((res: Response) => {
      if (
        [HttpStatus.Unauthorized, HttpStatus.Forbidden].includes(res.status)
      ) {
        window.location.replace('/signin');
      }
      return res.json();
    })
    .then((res: RefreshTokenResponse) => {
      if (res.accessToken) {
        localStorage.setItem('token', res.accessToken);
      }

      return res;
    })
    .catch((error: Error) => {
      console.error('An error occurred while refreshing the token:', error);
      throw error; // Re-throw the error if you want to handle it further up the chain
    });
