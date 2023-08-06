import { apiRequest } from './request';
import {
  refreshToken,
  HttpStatus,
  RefreshTokenResponse
} from './authentication';

jest.mock('./request', () => ({
  apiRequest: jest.fn()
}));

const replaceMock = jest.fn();
const originalLocation = window.location;

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      ...window.location,
      replace: replaceMock
    },
    writable: true
  });

  Storage.prototype.setItem = jest.fn();
});

beforeEach(() => {
  (apiRequest as jest.Mock).mockReset();
  localStorage.clear();
  replaceMock.mockReset();
  (localStorage.setItem as jest.Mock).mockReset();
});

afterAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      ...originalLocation
    },
    writable: true
  });
});

describe('refreshToken', () => {
  it('должен перенаправить на страницу входа, если статус ответа 401 или 403', async () => {
    const statuses = [HttpStatus.Unauthorized, HttpStatus.Forbidden];
    for (const status of statuses) {
      (apiRequest as jest.Mock).mockResolvedValueOnce({
        status,
        json: jest.fn().mockResolvedValue({})
      });

      await refreshToken();

      expect(replaceMock).toHaveBeenCalledWith('/signin');
    }
  });

    it('должен сохранять accessToken в localStorage, если он есть в ответе', async () => {
      const fakeResponse: RefreshTokenResponse = { accessToken: 'test_token' };
      (apiRequest as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: () => Promise.resolve(fakeResponse)
      });

      const result = await refreshToken();

      expect(result).toEqual(fakeResponse);
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test_token');
    });

    it('не должен сохранять accessToken в localStorage, если его нет в ответе', async () => {
      const fakeResponse: RefreshTokenResponse = {};
      (apiRequest as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: () => Promise.resolve(fakeResponse)
      });

      const result = await refreshToken();

      expect(result).toEqual(fakeResponse);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('должен залогировать ошибку и повторно выбросить ее, если произошла ошибка при обновлении токена', async () => {
      const error = new Error('Test error');
      (apiRequest as jest.Mock).mockRejectedValueOnce(error);

      const consoleSpy = jest.spyOn(console, 'error');

      await expect(refreshToken()).rejects.toThrow(error);
      expect(consoleSpy).toHaveBeenCalledWith(
        'An error occurred while refreshing the token:',
        error
      );
      consoleSpy.mockRestore();
    });
});
