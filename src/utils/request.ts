import { refreshToken } from './authentication';
import { baseAPILink } from '../constants';

type TOptions = {
  [key: string]: any;
};

export const apiRequest = (url: string, options: TOptions = {}): any => {
  const newOptions: TOptions = options;

  newOptions.credentials = 'include';

  if (!newOptions.headers) {
    newOptions.headers = new Headers();
  }

  newOptions.headers.append(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );

  const newUrl = `${baseAPILink}${url}`;

  return fetch(newUrl, newOptions).then((response) => {
    if ([401, 403].includes(response.status)) {
      refreshToken().then(() => {
        document.location.reload();
      });
    }

    return response;
  });
};
