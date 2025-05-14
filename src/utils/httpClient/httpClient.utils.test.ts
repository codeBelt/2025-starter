import {type Mock, beforeEach, describe, expect, it, vi} from 'bun:test';
import {buildServiceResponseSuccess} from '@/utils/response/response';
import {StatusCodes} from 'http-status-codes';
import type {HttpClientOptionsType} from './httpClient.types';
import {loadWithFetch} from './httpClient.utils';

// Mocking fetch
global.fetch = vi.fn();

describe('loadWithFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock console.error to suppress expected error logs
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  const mockResponseData = {message: 'Success'};
  const methods: ('get' | 'post' | 'put' | 'delete')[] = ['get', 'post', 'put', 'delete'];

  methods.forEach((method) => {
    it(`should handle ${method.toUpperCase()} requests correctly`, async () => {
      const mockResponse = {
        status: 200,
        json: vi.fn().mockResolvedValue(mockResponseData),
      };

      (fetch as Mock).mockResolvedValue(mockResponse);

      const config: HttpClientOptionsType = {
        headers: {'Content-Type': 'application/json'},
        params: {search: 'query', page: '1'},
        body: method !== 'get' ? {name: 'John Doe'} : undefined,
      };
      const url = '/some-url';
      const result = await loadWithFetch(method, url, config);

      if (method === 'get') {
        expect(fetch).toHaveBeenCalledWith(
          `${url}?search=query&page=1`,
          expect.objectContaining({
            method: 'GET',
            headers: config.headers,
            body: undefined,
          })
        );
      } else {
        expect(fetch).toHaveBeenCalledWith(
          `${url}?search=query&page=1`,
          expect.objectContaining({
            method: method.toUpperCase(),
            headers: config.headers,
            body: JSON.stringify(config.body),
          })
        );
      }

      expect(result).toEqual(buildServiceResponseSuccess(mockResponseData, StatusCodes.OK));

      const mockErrorResponse = {
        status: 500,
        statusText: 'Internal Server Error',
      };

      (fetch as Mock).mockResolvedValue(mockErrorResponse);

      const errorResult = await loadWithFetch(method, url, config);

      expect(errorResult).toEqual(buildServiceResponseFailure(mockErrorResponse.statusText, 500));
    });

    it(`should handle ${method.toUpperCase()} request with network error`, async () => {
      const mockError = new Error('Network Error');

      (fetch as Mock).mockRejectedValue(mockError);

      const config = {
        headers: {'Content-Type': 'application/json'},
      };
      const url = '/some-url';
      const result = await loadWithFetch(method, url, config);

      expect(result).toEqual(buildServiceResponseFailure(mockError, StatusCodes.INTERNAL_SERVER_ERROR));
    });
  });
});
